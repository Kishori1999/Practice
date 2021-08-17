import app from 'app';
import { Contract } from 'ethers';
import { Price, Product } from '../../domains/solTypes';
import ethNetworkService from './ethNetworkService.service';

const {
  config: {
    isMigration,
    isTest,
  },
  createLog,
  modelProvider: {
    Stock,
  },
} = app;

const log = createLog(module);

class StockService {
  private contract!: Contract;

  private running: boolean = false;

  async init() {
    if (isMigration) {
      return;
    }
    log.debug('initializing stockService');
    await this.initContract();
    if (!isTest) {
      await this.start();
    }
  }

  public start() {
    if (this.running) {
      throw new Error('Already started');
    }
    this.running = true;
  }

  public stop() {
    this.running = false;
  }

  public initContract() {
    this.contract = ethNetworkService.guildOfGuardiansPreSaleContract;
  }

  public fetchRawStocks = async () => {
    const rawStocks = await Stock.find(
      {
        isRaw: true,
      },
    );
    await Stock.updateMany(
      {
        _id: { $in: rawStocks.map(({ _id }) => _id) },
      },
      {
        $unset: {
          isRaw: '',
        },
      },
    );
    await Promise.all(rawStocks.map(({ product }) => this.fetchProductStock(product)));
  };

  private async fetchProductStock(product: Product) {
    log.info(`fetching product ${product}...`);
    const [usdPrice, availableAmount, originalAmount] = await Promise.all([
      this.contract.getProductCostUsd(product),
      this.contract.stockAvailable(product),
      this.contract.originalStock(product),
    ]);
    await Stock.updateOne(
      {
        product,
      },
      {
        $set: {
          usdPrice,
          availableAmount,
          originalAmount,
        },
      },
      {
        upsert: true,
      },
    );
    log.info(`fetching product ${product} completed`);
  }

  public async createProductStock(product: Product) {
    log.info(`fetching product ${product} prices...`);
    const [firstUsdPrice, lastUsdPrice] = await Promise.all([
      this.contract.productPrices(product, Price.FirstSale),
      this.contract.productPrices(product, Price.LastSale),
    ]);
    await Stock.create(
      {
        product,
        firstUsdPrice,
        lastUsdPrice,
        isRaw: true,
      },
    );
    log.info(`fetching product ${product} prices completed`);
  }
}

export default new StockService();
