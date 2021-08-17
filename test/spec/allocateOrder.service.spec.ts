import { expect } from 'chai';
import app from 'app';
import allocateOrderService from 'app/lib/services/allocateOrder.service';
import { utils } from 'ethers';
import specHelper, { FIXTURE_TYPES } from '../helper/specHelper';
import { AssetCategory, AssetDocument } from '../../app/domains/asset';
import { Chroma, Product } from '../../app/domains/solTypes';
import { StorageKey } from '../../app/domains/storage';
import { NftContractResource } from '../../app/domains/nftContract';
import { NftContractRangeResource } from '../../app/domains/nftContractRange';
import { getMetadata } from '../../app/metadataProvider';

const {
  modelProvider: {
    AllocatedOrder,
    Asset,
    Stock,
    Storage,
  },
} = app;

enum Job {
  createAssets = 'createAssets',
  fetchSecondDiceRoll = 'fetchSecondDiceRoll',
  generateSerialNumber = 'generateSerialNumber',
  scanBlocks = 'scanBlocks',
}

const withAllocateOrderService = () => {
  before(() => allocateOrderService.start());

  after(() => {
    allocateOrderService.stop();
  });
};

const withCleanUpRecords = () => {
  before(() => AllocatedOrder.deleteMany());
  after(() => AllocatedOrder.deleteMany());
  before(() => Asset.deleteMany());
  after(() => Asset.deleteMany());
  before(() => Stock.deleteMany());
  after(() => Stock.deleteMany());
  after(() => app.agenda.cancel({}));
};

const withMineBlocks = (blockNumber = 1) => {
  before(async () => {
    for (let i = 0; i < blockNumber; i += 1) {
      // just some transactions to force mining
      // eslint-disable-next-line no-await-in-loop
      await specHelper.guildOfGuardiansPreSaleConnected.grantRole(
        utils.id('IMMUTABLE_SYSTEM_ROLE'),
        specHelper.wallet.address,
      );
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    }
  });
};

// TODO: Avoid timeouts
describe('AllocateOrderService', () => {
  before(() => Storage.deleteMany());
  after(() => Storage.deleteMany());
  describe('process new records', () => {
    let fetchSecondDiceRollJobs;
    let createAssetsJobs;
    let generateSerialNumberJobs;
    withAllocateOrderService();
    withCleanUpRecords();
    describe('when purchase', () => {
      specHelper.withPurchase({
        order: specHelper.createOrder({ [Product.RareHeroPack]: 2, [Product.EpicHeroPack]: 1 }),
      });
      describe('check immediately', () => {
        specHelper.withRunJob({ name: Job.scanBlocks });
        specHelper.withTimeout();
        before(async function () {
          this.allocatedOrders = await AllocatedOrder.find();
          this.assets = await Asset.find();
        });
        it('should not create a record in AllocatedOrder',
          function () {
            return expect(this.allocatedOrders.length).to.be.equal(0);
          });
        it('should not create a record in Asset',
          function () {
            return expect(this.assets.length).to.be.equal(0);
          });
      });
      describe('wait 2 blocks', () => {
        withMineBlocks(2);
        specHelper.withTimeout(2000);
        specHelper.withRunJob({ name: Job.scanBlocks });
        specHelper.withTimeout();
        before(async function () {
          this.assets = await Asset.find();
          this.allocatedOrders = await AllocatedOrder.find();
        });
        it('still should not create a record in AllocatedOrder',
          function () {
            return expect(this.allocatedOrders.length).to.be.equal(0);
          });
        it('still should not create any record in Asset',
          function () {
            return expect(this.assets.length).to.be.equal(0);
          });
      });
      describe('wait 3rd block', () => {
        withMineBlocks(1);
        specHelper.withTimeout(2000);
        specHelper.withRunJob({ name: Job.scanBlocks });
        specHelper.withTimeout();
        before(async function () {
          this.allocatedOrders = await AllocatedOrder.find();
          this.assets = await Asset.find();
          this.totalOrderSum = await Storage.getValue(StorageKey.TotalOrderSum, Number.NaN);
          fetchSecondDiceRollJobs = await app.agenda.jobs({ name: Job.fetchSecondDiceRoll });
          createAssetsJobs = await app.agenda.jobs({ name: Job.createAssets });
          generateSerialNumberJobs = await app.agenda.jobs({ name: Job.generateSerialNumber });
        });
        it('should create a record in AllocatedOrder',
          function () {
            return expect(this.allocatedOrders.length).to.be.equal(1);
          });
        it('allocationOrder should have prevTotalOrderSum',
          function () {
            return expect(this.allocatedOrders[0].prevTotalOrderSum).to.be.equal(0);
          });
        it('allocationOrder should have tokenReward',
          function () {
            return expect(this.allocatedOrders[0].tokenReward).to.be.above(0);
          });
        it('allocationOrder should not have secondDiceRoll',
          function () {
            return expect(this.allocatedOrders[0].secondDiceRoll).to.be.equal(null);
          });
        it('allocatedOrder should have the same transactionHash, blockNumber and owner',
          function () {
            const [allocatedOrder] = this.allocatedOrders;
            return expect(allocatedOrder.transactionHash).to.be.equal(
              this.transactionReceipt.transactionHash,
            )
              && expect(allocatedOrder.blockNumber).to.be.equal(
                this.transactionReceipt.blockNumber,
              )
              && expect(allocatedOrder.owner).to.be.equal(
                specHelper.wallet.address,
              );
          });
        it('should set totalOrderSum',
          function () {
            return expect(this.totalOrderSum).to.be.equal(this.allocatedOrders[0].orderPrice);
          });
        it('should not create assets',
          function () {
            return expect(this.assets.length).to.be.equal(0);
          });
        it('should create a fetchSecondDiceRoll job',
          () => expect(fetchSecondDiceRollJobs.length).to.be.equal(1));
        it('should not create a createAssets job',
          () => expect(createAssetsJobs.length).to.be.equal(0));
        it('should not create a generateSerialNumberJobs job',
          () => expect(generateSerialNumberJobs.length).to.be.equal(0));
        it('should create stocks for purchased items',
          () => expect(Stock.countDocuments()).eventually.to.be.equal(2));
      });
      describe('run fetchSecondDiceRoll', () => {
        specHelper.withRunJob({
          name: Job.fetchSecondDiceRoll,
          dataFn: () => fetchSecondDiceRollJobs[0].attrs.data,
        });
        specHelper.withTimeout();
        before(async function () {
          this.allocatedOrders = await AllocatedOrder.find();
          this.assets = await Asset.find();
          createAssetsJobs = await app.agenda.jobs({ name: Job.createAssets });
          generateSerialNumberJobs = await app.agenda.jobs({ name: Job.generateSerialNumber });
        });

        it('should keep a record in AllocatedOrder',
          function () {
            return expect(this.allocatedOrders.length).to.be.equal(1);
          });
        it('allocationOrder should have secondDiceRoll',
          function () {
            return expect(this.allocatedOrders[0].secondDiceRoll).not.to.be.equal(null);
          });
        it('should create createAssets job',
          () => expect(createAssetsJobs.length).to.be.equal(1));
        it('should not create generateSerialNumberJobs job',
          () => expect(generateSerialNumberJobs.length).to.be.equal(0));
      });
      describe('run createAssets', () => {
        specHelper.withRunJob({
          name: Job.createAssets,
          dataFn: () => createAssetsJobs[0].attrs.data,
        });
        specHelper.withTimeout();
        before(async function () {
          this.allocatedOrders = await AllocatedOrder.find();
          this.assets = await Asset.find();
          generateSerialNumberJobs = await app.agenda.jobs({ name: Job.generateSerialNumber });
        });

        it('should keep a record in AllocatedOrder',
          function () {
            return expect(this.allocatedOrders.length).to.be.equal(1);
          });
        it('should create 3 records in Asset',
          function () {
            return expect(this.assets.length).to.be.equal(3);
          });
        it('assets should have the same transactionHash and owner',
          function () {
            this.assets.forEach((asset: AssetDocument) => expect(asset.transactionHash).to.be.equal(
              this.transactionReceipt.transactionHash,
            ) && expect(asset.owner).to.be.equal(
              specHelper.wallet.address,
            ));
          });
        it('assets should not have mythic chroma',
          function () {
            this.assets.forEach((asset: AssetDocument) => expect(asset.chroma).not.to.be.equal(
              Chroma.Mythic,
            ));
          });
        it('should create generateSerialNumberJobs job',
          function () {
            return expect(generateSerialNumberJobs.length).to.be.equal(this.assets.length);
          });
      });
      describe('run generateSerialNumberJobs', () => {
        let nftContracts;
        let nftContractRanges;
        before(async () => {
          const assets = await Asset.find();
          const metadataIdSet = new Set(
            assets.map((asset) => getMetadata(AssetCategory.Hero, asset)!.id),
          );
          nftContracts = await Promise.all(
            Array.from(metadataIdSet).map((metadataId) => specHelper.createNftContract(
              specHelper.getFixture<NftContractResource>(
                FIXTURE_TYPES.NFT_CONTRACT,
                undefined,
                {
                  assetCategory: AssetCategory.Hero,
                  metadataId,
                },
              ),
            )),
          );
          nftContractRanges = await Promise.all(
            nftContracts.map((nftContract) => specHelper.createNftContractRange(
              nftContract,
              specHelper.getFixture<NftContractRangeResource>(
                FIXTURE_TYPES.NFT_CONTRACT_RANGE,
                undefined,
                {
                  probabilityFrom: 0,
                  probabilityTo: 1,
                  serialNumbers: [1, 2, 3],
                },
              ),
            )),
          );
        });
        after(async () => {
          await Promise.all(
            nftContracts.map((nftContract) => specHelper.removeNftContract(nftContract)),
          );
          await Promise.all(
            nftContractRanges.map(
              (nftContractRange) => specHelper.removeNftContractRange(nftContractRange),
            ),
          );
        });
        specHelper.withRunJob({
          name: Job.generateSerialNumber,
          dataFn: () => generateSerialNumberJobs[0].attrs.data,
        });
        specHelper.withRunJob({
          name: Job.generateSerialNumber,
          dataFn: () => generateSerialNumberJobs[1].attrs.data,
        });
        specHelper.withRunJob({
          name: Job.generateSerialNumber,
          dataFn: () => generateSerialNumberJobs[2].attrs.data,
        });
        specHelper.withTimeout();
        before(async function () {
          this.assets = await Asset.find();
        });
        it('still should have 3 records in Asset',
          function () {
            return expect(this.assets.length).to.be.equal(3);
          });
        it('assets should have nft contractAddress',
          function () {
            this.assets.forEach((asset: AssetDocument) => expect(
              asset.nft.contractAddress,
            ).not.to.be.undefined);
          });
        it('assets should have nft tokenId',
          function () {
            this.assets.forEach((asset: AssetDocument) => expect(
              asset.nft.tokenId,
            ).not.to.be.undefined);
          });
      });
    });
  });

  describe('process mythic item', () => {
    let originalCalcSecondDiceRoll: any;
    withAllocateOrderService();
    before(() => {
      // @ts-ignore
      originalCalcSecondDiceRoll = allocateOrderService.calcSecondDiceRoll;
      // @ts-ignore
      allocateOrderService.calcSecondDiceRoll = () => (Promise.resolve(
        { secondDiceRoll: 2877, error: undefined },
      ));
    });
    after(() => {
      // @ts-ignore
      allocateOrderService.calcSecondDiceRoll = originalCalcSecondDiceRoll;
    });
    withCleanUpRecords();
    specHelper.withPurchase({
      order: specHelper.createOrder({ [Product.RareHeroPack]: 1 }),
    });
    specHelper.withTimeout();
    withMineBlocks(3);
    specHelper.withTimeout();
    specHelper.withRunJob({ name: Job.scanBlocks });
    specHelper.withRunJob({ name: Job.fetchSecondDiceRoll, fetchFromDb: true });
    specHelper.withRunJob({ name: Job.createAssets, fetchFromDb: true });
    specHelper.withTimeout(4000);
    before(async function () {
      this.allocatedOrders = await AllocatedOrder.find();
      this.assets = await Asset.find();
    });
    it('allocationOrder should have secondDiceRoll',
      function () {
        return expect(this.allocatedOrders[0].secondDiceRoll).not.to.be.equal(null);
      });
    it('should create 1 record in Asset',
      function () {
        return expect(this.assets.length).to.be.equal(1);
      });
    it('asset should have mythic chroma',
      function () {
        expect(this.assets[0].chroma).to.be.equal(
          Chroma.Mythic,
        );
      });
  });
});
