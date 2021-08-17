import _ from 'lodash';
import app from 'app';
import * as Sentry from '@sentry/node';
import { BigNumber, Contract, getDefaultProvider, utils, Wallet } from 'ethers';
import { Log } from '@ethersproject/abstract-provider';
import { StorageKey } from '../../domains/storage';
import {
  AllocatedOrderEvent,
  AllocatedOrderStruct,
  Chroma,
  DetailedAllocationStruct,
  Product,
} from '../../domains/solTypes';
import { AssetDocument, AssetDomain, getAssetCategory } from '../../domains/asset';
import { getRewardDistributions } from '../helpers/milestoneHelper';
import { TokenRewardDistribution } from '../../domains/allocatedOrder';
import healthService from './health.service';
import ethNetworkService from './ethNetworkService.service';
import { getMetadata } from '../../metadataProvider';
import resolveSync from '../helpers/resolveSync';

enum HealthKey {
  ClaimingMythic = 'allocatedOrderService.claimingMythic',
  CurrentConfirmedBlock = 'allocatedOrderService.currentConfirmedBlock',
  LastHandledBlock = 'allocatedOrderService.lastHandledBlock',
}

const {
  config: {
    isMigration,
    isTest,
    blockScanningMaxBatchSize,
    blockScanningStartingNumber,
    systemPrivateKey,
  },
  createLog,
  modelProvider: {
    AllocatedOrder,
    Asset,
    NftContract,
    NftContractRange,
    Stock,
    Storage,
  },
} = app;

const boxedProducts = [
  Product.RareHeroPack,
  Product.EpicHeroPack,
  Product.LegendaryHeroPack,
  Product.PetPack,
];

const blockDelta = 3;

const log = createLog(module);

class AllocateOrderService {
  private provider!: ReturnType<typeof getDefaultProvider>;

  private contract!: Contract;

  private contractBySystem!: Contract;

  private running: boolean = false;

  private shouldClaimMythic!: boolean;

  async init() {
    if (isMigration) {
      return;
    }
    log.debug('initializing allocateOrderService');
    this.shouldClaimMythic = systemPrivateKey !== '0';
    healthService.updateData(
      HealthKey.ClaimingMythic,
      true,
      this.shouldClaimMythic,
    );
    await this.initContract();
    if (this.shouldClaimMythic) {
      if (!systemPrivateKey) {
        throw new Error('No systemPrivateKey provided');
      }
      await this.initSystemWallet();
    }
    if (!isTest) {
      await this.start();
    }
  }

  public start() {
    if (this.running) {
      throw new Error('Already started');
    }
    this.running = true;
    this.subscribeBlocks();
    this.subscribeEvents();
  }

  public stop() {
    this.running = false;
    this.unsubscribeBlocks();
    this.unsubscribeEvents();
  }

  public initContract() {
    this.provider = ethNetworkService.provider;
    this.contract = ethNetworkService.guildOfGuardiansPreSaleContract;
  }

  private async initSystemWallet() {
    const systemAddress = utils.computeAddress(systemPrivateKey);
    const hasSystemRole = await this.contract.hasRole(utils.id('IMMUTABLE_SYSTEM_ROLE'), systemAddress);
    if (!hasSystemRole) {
      throw new Error('SYSTEM_PRIVATE_KEY does not have IMMUTABLE_SYSTEM_ROLE in the contract');
    }
    const systemWallet = new Wallet(systemPrivateKey, this.provider);
    this.contractBySystem = this.contract.connect(systemWallet!);
  }

  private subscribeEvents() {
    this.contract.on('ClaimMythic', this.processClaimMythicEvent);
  }

  private unsubscribeEvents() {
    this.contract.off('ClaimMythic', this.processClaimMythicEvent);
  }

  private subscribeBlocks() {
    this.contract.provider.on('block', this.processBlock);
  }

  private unsubscribeBlocks() {
    this.contract.provider.off('block', this.processBlock);
  }

  private fetchAllocatedOrderEventDataList(blockNumberFrom?: number, blockNumberTo?: number) {
    return this.contract.queryFilter(
      // @ts-ignore
      'AllocateOrder',
      blockNumberFrom,
      blockNumberTo,
    );
  }

  private extractAllocateOrderEvent(allocateOrderEvent: AllocatedOrderEvent) {
    const {
      _allocatedOrder: allocatedOrder,
      _owner: owner,
      _orderPrice: orderPriceRaw,
    } = allocateOrderEvent;
    const {
      firstDiceRoll: firstDiceRollRaw,
      order: orderRaw,
    } = allocatedOrder;
    const firstDiceRoll = Number(firstDiceRollRaw);
    const order = orderRaw.map((item) => Number(item));
    const orderPrice = Number(orderPriceRaw) / 100;
    return {
      owner,
      firstDiceRoll,
      order,
      orderPrice,
    };
  }

  public async recoverOrders() {
    const allocateOrderEventDataList = await this.fetchAllocatedOrderEventDataList(
      blockScanningStartingNumber,
    );
    log.info(`Fetched ${allocateOrderEventDataList.length} events`);
    let prevTotalOrderSum = 0;
    let lastBlockNumber = blockScanningStartingNumber;
    const purchasedProducts = new Set<Product>();

    await resolveSync(allocateOrderEventDataList.map((allocateOrderEventData) => async () => {
      const {
        blockNumber,
        transactionHash,
      } = allocateOrderEventData;
      log.info(`Processing blockNumber: ${blockNumber}, transactionHash: ${transactionHash}`);
      const {
        owner,
        order,
        orderPrice,
        firstDiceRoll,
      } = this.extractAllocateOrderEvent(<AllocatedOrderEvent><unknown>allocateOrderEventData.args);

      await AllocatedOrder.createOrFindOneByTransactionHash(
        blockNumber,
        transactionHash,
        {
          owner,
          order,
          orderPrice,
          firstDiceRoll,
          prevTotalOrderSum,
        },
      );
      await this.calcTokenRewards(
        blockNumber,
        transactionHash,
        prevTotalOrderSum,
        orderPrice,
      );

      order.forEach(
        (amount, idx) => {
          if (amount > 0) {
            purchasedProducts.add(idx);
          }
        },
      );

      prevTotalOrderSum += orderPrice;
      lastBlockNumber = blockNumber;
    }));

    await Stock.makeRaw([...purchasedProducts]);

    await Storage.setValue(StorageKey.TotalOrderSum, prevTotalOrderSum);
    await Storage.setValue(
      StorageKey.HandledBlock,
      lastBlockNumber,
    );
  }

  public async recoverAssets() {
    const allocatedOrderList = await AllocatedOrder
      .find({ secondDiceRoll: { $ne: null } })
      .select('transactionHash')
      .sort({ prevTotalOrderSum: 1 })
      .lean();

    log.info(`Fetched ${allocatedOrderList.length} allocatedOrders`);
    await resolveSync(allocatedOrderList.map(({ transactionHash }) => async () => {
      log.info(`Processing allocatedOrder with transactionHash: ${transactionHash}`);
      const assets = await Asset.find({ transactionHash }).lean();
      if (assets.length === 0) {
        await this.createAssets(transactionHash);
      }
    }));
  }

  private processClaimMythicEvent = async (
    allocatedOrderStruct: AllocatedOrderStruct,
    mythicOrderLine: BigNumber,
    customerAddr: string,
    ethLog: Log,
  ) => {
    log.debug('processing new ClaimMythic event');
    const { transactionHash } = ethLog;
    await Asset.updateOne({
      'internal.claimMythicTransactionHash': transactionHash,
      indexInOrder: Number(mythicOrderLine),
    }, {
      chroma: Chroma.Mythic,
      'internal.mythicClaimed': true,
    });
  };

  private processBlock = async (
    currentBlockNumber: number,
  ) => {
    log.debug(`new block: ${currentBlockNumber}`);
    const currentConfirmedBlock = currentBlockNumber - blockDelta;
    await Storage.setValue(StorageKey.CurrentConfirmedBlock, currentConfirmedBlock);
    healthService.updateData(
      HealthKey.CurrentConfirmedBlock,
      true,
      currentConfirmedBlock,
    );
  };

  public scanBlocks = async (): Promise<boolean> => {
    let allDone = true;
    const currentConfirmedBlock = await Storage.getValue(
      StorageKey.CurrentConfirmedBlock,
      blockScanningStartingNumber,
    );
    const lastHandledBlock = await Storage.getValue(
      StorageKey.HandledBlock,
      blockScanningStartingNumber,
    );
    if (currentConfirmedBlock <= lastHandledBlock) {
      return true;
    }
    const nextHandlingBlock = Math.min(
      currentConfirmedBlock,
      lastHandledBlock + blockScanningMaxBatchSize,
    );
    const currentHandlingBlock = lastHandledBlock + 1;
    log.debug(`scanning block: ${currentHandlingBlock} - ${nextHandlingBlock}`);
    if (nextHandlingBlock !== currentConfirmedBlock) {
      allDone = false;
    }
    const allocateOrderEventDataList = await this.fetchAllocatedOrderEventDataList(
      currentHandlingBlock,
      nextHandlingBlock,
    );
    log.debug(`found ${allocateOrderEventDataList.length} events`);
    const purchasedProducts = new Set<Product>();
    await resolveSync(allocateOrderEventDataList.map((allocateOrderEventData) => async () => {
      const {
        blockNumber,
        transactionHash,
      } = allocateOrderEventData;
      const {
        owner,
        order,
        orderPrice,
        firstDiceRoll,
      } = this.extractAllocateOrderEvent(
        <AllocatedOrderEvent><unknown>allocateOrderEventData.args,
      );
      log.debug(`processing event from blockNumber: ${blockNumber} with transactionHash: ${transactionHash}`);
      const created = await AllocatedOrder.createOrFindOneByTransactionHash(
        blockNumber,
        transactionHash,
        {
          owner,
          order,
          orderPrice,
          firstDiceRoll,
        },
      );
      if (created) {
        const totalOrderSum = await AllocatedOrder.getOrderPriceSum();
        const prevTotalOrderSum = await Storage.setValue(
          StorageKey.TotalOrderSum,
          totalOrderSum,
          0,
        );
        await this.calcTokenRewards(
          blockNumber,
          transactionHash,
          prevTotalOrderSum,
          orderPrice,
        );
        order.forEach(
          (amount, idx) => {
            if (amount > 0) {
              purchasedProducts.add(idx);
            }
          },
        );
        await this.scheduleFetchSecondDiceRoll(blockNumber, transactionHash, firstDiceRoll);
      }
    }));
    await Stock.makeRaw([...purchasedProducts]);
    await Storage.setValue(
      StorageKey.HandledBlock,
      nextHandlingBlock,
    );
    healthService.updateData(
      HealthKey.LastHandledBlock,
      true,
      nextHandlingBlock,
    );
    log.debug(`processing got done for blockNumber: ${nextHandlingBlock}`);
    return allDone;
  };

  public async fetchSecondDiceRoll(
    blockNumber: number,
    transactionHash: string,
    firstDiceRoll: number,
  ) {
    const { secondDiceRoll, error } = await this.calcSecondDiceRoll(firstDiceRoll, blockNumber);
    const { nModified } = await AllocatedOrder.updateOne(
      {
        blockNumber,
        transactionHash,
        secondDiceRoll: null,
      },
      {
        secondDiceRoll,
        error,
      },
    );

    if (nModified > 0) {
      if (error) {
        throw new Error(error);
      }
      await this.scheduleCreateAssets(transactionHash);
    }
  }

  private processMythic = async (asset: AssetDocument) => {
    log.debug(`processing mythic for asset: ${asset._id}`);
    const allocationOrder = await AllocatedOrder.findOne(
      { transactionHash: asset.transactionHash },
    );
    if (!allocationOrder) {
      throw new Error(`Cannot find allocation order for transactionHash: ${asset.transactionHash}`);
    }
    const allocatedOrderStruct = {
      firstDiceRoll: allocationOrder.firstDiceRoll,
      order: allocationOrder.order,
    };
    if (await this.contract.confirmMythic(
      allocatedOrderStruct,
      asset.indexInOrder,
      allocationOrder.secondDiceRoll,
    )) {
      const gasLimit = await this.contractBySystem.estimateGas.claimMythicForCustomer(
        allocatedOrderStruct,
        asset.indexInOrder,
        allocationOrder.owner,
        allocationOrder.secondDiceRoll,
      );
      const transaction = await this.contractBySystem.claimMythicForCustomer(
        allocatedOrderStruct,
        asset.indexInOrder,
        allocationOrder.owner,
        allocationOrder.secondDiceRoll,
        {
          gasLimit,
        },
      );
      await Asset.updateOne(
        { _id: asset._id },
        {
          'internal.claimMythicTransactionHash': transaction.hash,
        },
      );
    } else {
      log.debug('Mythic already claimed');
      // We consider it's marked completed in other place (where it was claimed)
    }
    log.debug(`processing got done for asset: ${asset._id}`);
  };

  async calcTokenRewards(
    blockNumber,
    transactionHash,
    prevTotalOrderSum,
    orderPrice,
  ) {
    if (orderPrice === 0) {
      log.warn(`orderPrice is 0 for ${transactionHash}. Skipping.`);
      return;
    }
    const rewardDistributions = getRewardDistributions(
      prevTotalOrderSum,
      orderPrice,
    );
    const tokenRewardDistributions: TokenRewardDistribution[] = rewardDistributions
      .filter(({ reward }) => reward > 0)
      .map((rewardDistribution) => ({
        sumStart: rewardDistribution.sumStart,
        reward: Math.round(100 * rewardDistribution.reward) / 100,
      }));
    const tokenReward = _.sumBy(tokenRewardDistributions, 'reward');
    await AllocatedOrder.updateOne(
      {
        blockNumber,
        transactionHash,
      },
      {
        prevTotalOrderSum,
        tokenReward,
        tokenRewardDistributions,
      },
    );
  }

  private async calcSecondDiceRoll(firstDiceRoll: number, commitBlock: number) {
    let secondDiceRoll: number | undefined;
    let error: string | undefined;
    try {
      secondDiceRoll = Number(await this.contract.getSecondDiceRoll(
        firstDiceRoll,
        commitBlock,
      ));
    } catch (err) {
      if (err.message.includes('Called too late')) {
        log.debug('it\'s too late, using firstDiceRoll instead');
        secondDiceRoll = firstDiceRoll;
      } else {
        log.error(err);
        Sentry.captureException(err);
        error = err.message;
      }
    }
    return { secondDiceRoll, error };
  }

  async createAssets(
    transactionHash: string,
    shouldClaimMythic: boolean = this.shouldClaimMythic,
  ) {
    log.debug(`Creating assets for ${transactionHash}`);
    const allocatedOrder = (await AllocatedOrder.findOne({
      transactionHash,
    }))!;
    const { firstDiceRoll, order, owner, secondDiceRoll } = allocatedOrder;

    const detailedAllocations: DetailedAllocationStruct[] = await this.contract.decodeAllocation(
      {
        firstDiceRoll,
        order,
      },
      secondDiceRoll,
    );

    const assets = await Promise.all(detailedAllocations.map(async (detailedAllocation, idx) => {
      const { product, rarity, chroma, heroPetType: type, potentialMythic } = detailedAllocation;

      const asset = await Asset.create({
        owner,
        transactionHash,
        indexInOrder: idx,
        product,
        rarity,
        type,
        chroma,
        'internal.potentialMythic': potentialMythic,
        boxed: boxedProducts.includes(product),
      });
      if (shouldClaimMythic && potentialMythic) {
        await this.processMythic(asset);
      }
      await this.scheduleGenerateSerialNumber(transactionHash, idx, secondDiceRoll!);
      return asset;
    }));

    await AllocatedOrder.updateOne(
      { transactionHash, assetsCreatedAt: { $exists: false } },
      { assetsCreatedAt: new Date() },
    );

    log.debug(`Created ${detailedAllocations.length} asset(s)`);

    return assets;
  }

  async generateAndSetSerialNumber(
    transactionHash: string,
    indexInOrder: number,
    secondDiceRoll: number,
  ) {
    const asset = await Asset.findOne({
      transactionHash,
      indexInOrder,
    }).lean();
    if (!asset) {
      throw new Error(`asset not found: ${transactionHash} : ${indexInOrder}`);
    }
    if (asset.nft?.tokenId) {
      return;
    }
    const { serialNumber, contractAddress } = await this.generateSerialNumber(
      asset,
      secondDiceRoll,
    );
    await Asset.updateOne(
      { _id: asset._id },
      { 'nft.contractAddress': contractAddress, 'nft.tokenId': serialNumber },
    );
  }

  async generateSerialNumber(asset: AssetDomain, secondDiceRoll: number) {
    const assetCategory = getAssetCategory(asset.product);
    const metadataItem = getMetadata(assetCategory, asset);
    if (!metadataItem) {
      throw new Error('Metadata not found');
    }
    const nftContract = await NftContract.findOne({
      assetCategory,
      metadataId: metadataItem.id,
    });
    if (!nftContract) {
      throw new Error('NftContract not found');
    }

    const serialNumber = await NftContractRange.popSerialNumber(
      nftContract.contractAddress,
      this.normalizeProbability(secondDiceRoll, asset.indexInOrder),
    );
    return { serialNumber, contractAddress: nftContract.contractAddress };
  }

  private scheduleFetchSecondDiceRoll(
    blockNumber: number,
    transactionHash: string,
    firstDiceRoll: number,
  ) {
    return app.agenda.now(
      app.agenda.jobNames.fetchSecondDiceRoll,
      {
        blockNumber,
        transactionHash,
        firstDiceRoll,
      },
    );
  }

  private scheduleCreateAssets(transactionHash: string) {
    return app.agenda.now(
      app.agenda.jobNames.createAssets,
      {
        transactionHash,
      },
    );
  }

  private scheduleGenerateSerialNumber(
    transactionHash: string,
    indexInOrder: number,
    secondDiceRoll: number,
  ) {
    return app.agenda.now(
      app.agenda.jobNames.generateSerialNumber,
      {
        transactionHash,
        indexInOrder,
        secondDiceRoll,
      },
    );
  }

  /**
   * Converts params to 0..1 range.
   * @param secondDiceRoll
   * @param indexInOrder
   */
  private normalizeProbability(secondDiceRoll: number, indexInOrder: number): number {
    return ((secondDiceRoll * (indexInOrder + 1)) % 10000) / 10000;
  }
}

export default new AllocateOrderService();
