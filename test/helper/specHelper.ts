import _ from 'lodash';
import request, { RequestPromise } from 'request-promise';
import { CoreOptions } from 'request';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiThings from 'chai-things';
import { Context } from 'mocha';
import chaiSnapshot from 'mocha-chai-snapshot';
import app from 'app';
import { BigNumber, constants, utils } from 'ethers';
import testConfig from 'test/config';
import { AllocatedOrderDocument, AllocatedOrderResource } from '../../app/domains/allocatedOrder';
import { AssetDocument, AssetResource, ProductValues } from '../../app/domains/asset';
import { Product } from '../../app/domains/solTypes';
import { StockDocument, StockResource } from '../../app/domains/stock';
import { NftContractRangeDocument, NftContractRangeResource } from '../../app/domains/nftContractRange';
import { NftContractDocument, NftContractResource } from '../../app/domains/nftContract';

const {
  modelProvider: {
    AllocatedOrder,
    Asset,
    NftContract,
    NftContractRange,
    Stock,
  },
} = app;

chai.use(chaiAsPromised);
chai.use(chaiThings);
chai.use(chaiSnapshot);

chai.should();

type MakeSnapShotParam = { isForced?: boolean, mask?: any[], description?: string };

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum FIXTURE_TYPES {
  ALLOCATED_ORDER = 'allocatedOrder.data',
  ASSET = 'asset.data',
  NFT_CONTRACT = 'nftContract.data',
  NFT_CONTRACT_RANGE = 'nftContractRange.data',
  STOCK = 'stock.data',
}

const specHelper = {

  FIXTURE_TYPES,

  get(uri: string, options?: Partial<CoreOptions>) {
    return this.request('GET', uri, undefined, options);
  },
  post(uri: string, body: any, options?: Partial<CoreOptions>) {
    return this.request('POST', uri, body, options);
  },
  patch(uri: string, body: any, options?: Partial<CoreOptions>) {
    return this.request('PATCH', uri, body, options);
  },
  put(uri: string, body: any, options?: Partial<CoreOptions>) {
    return this.request('PUT', uri, body, options);
  },
  delete(uri: string, body: any, options?: Partial<CoreOptions>) {
    return this.request('DELETE', uri, body, options);
  },
  request(method: string, uri: string, body: any, options?: Partial<CoreOptions>) {
    return request({
      method,
      uri,
      body,
      resolveWithFullResponse: true,
      simple: false,
      json: true,
      ...options,
    });
  },

  getFixture<T = object>(fixtureType: FIXTURE_TYPES, seed?: number, data?: Partial<T>): T {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const resolvedRequire = require(`../data/${fixtureType}`);
    const fixtureProvider = resolvedRequire?.default || resolvedRequire;
    let result;
    if (_.isArray(fixtureProvider)) {
      if (_.isUndefined(seed)) {
        seed = Math.floor(Math.random() * fixtureProvider.length);
      } else if (!_.isNumber(seed) || seed >= fixtureProvider.length) {
        throw new Error(`Wrong seed value: ${seed}`);
      }
      result = { ...fixtureProvider[seed] };
    } else if (_.isFunction(fixtureProvider)) {
      seed = seed || Math.floor(Math.random() * 1000000);
      result = fixtureProvider(seed);
    } else {
      throw new Error(`Unsupported fixture provider: ${fixtureType}`);
    }
    return Object.assign(result, data || {});
  },

  get guildOfGuardiansPreSaleConnected() {
    // @ts-ignore
    return global.guildOfGuardiansPreSaleConnected;
  },

  get wallet() {
    // @ts-ignore
    return global.wallet;
  },

  async runJob(name: string, data: any = {}) {
    const result = await this
      .post(
        `${testConfig.baseUrl}/jobs/${name}`,
        data,
      );
    if (result.statusCode >= 400) {
      return result.body.error;
    }

    return result;
  },
  withRunJob(params: {
    fetchFromDb?: boolean,
    key?: string,
    name: string,
    data?: any,
    dataFn?: () => any }) {
    const {
      name,
      data,
      dataFn,
      key = name,
      fetchFromDb = false,
    } = params;
    before(async function () {
      let jobData;
      if (fetchFromDb) {
        const jobs = await app.agenda.jobs({ name });
        ({ data: jobData } = jobs[0].attrs);
      } else {
        jobData = dataFn ? dataFn.call(this) : data;
      }
      this[key] = await specHelper.runJob(name, jobData);
    });
  },

  async createAllocatedOrder(
    owner: string,
    data: Partial<AllocatedOrderResource>,
  ): Promise<AllocatedOrderDocument> {
    const result = await AllocatedOrder.create({ ...data, owner });
    data._id = result._id;
    return result;
  },

  async removeAllocatedOrder(data: AllocatedOrderResource) {
    return data._id && AllocatedOrder.deleteOne({ _id: data._id });
  },

  withAllocatedOrder(options?: {
    data?: Partial<AllocatedOrderResource>;
    key?: string;
    ownerKey?: string;
    seed?: number;
  }) {
    const { data, key = 'allocatedOrder', ownerKey = 'owner', seed } = options || {};
    before(async function (this: Context) {
      this[key] = data
        ? _.cloneDeep(data)
        : specHelper.getFixture(specHelper.FIXTURE_TYPES.ALLOCATED_ORDER, seed);
      await specHelper.createAllocatedOrder(this[ownerKey], this[key]);
    });

    after(function () {
      return specHelper.removeAllocatedOrder(this[key]);
    });
  },

  async createAsset(
    owner: string,
    data: Partial<AssetResource>,
  ): Promise<AssetDocument> {
    const result = await Asset.create({ ...data, owner });
    data._id = result._id;
    return result;
  },

  async removeAsset(data: AssetResource) {
    return data._id && Asset.deleteOne({ _id: data._id });
  },

  withAsset(options?: {
    data?: Partial<AssetResource>;
    key?: string;
    ownerKey?: string;
    seed?: number;
  }) {
    const { data, key = 'asset', ownerKey = 'owner', seed } = options || {};
    before(async function () {
      this[key] = data
        ? _.cloneDeep(data)
        : specHelper.getFixture(specHelper.FIXTURE_TYPES.ASSET, seed);
      await specHelper.createAsset(this[ownerKey], this[key]);
    });

    after(function () {
      return specHelper.removeAsset(this[key]);
    });
  },

  async createStock(
    data: Partial<StockResource>,
  ): Promise<StockDocument> {
    return Stock.create({ ...data });
  },

  async removeStock(data: StockResource) {
    return data.product && Stock.deleteOne({ product: data.product });
  },

  withStock(options?: {
    data?: Partial<StockResource>;
    key?: string;
    seed?: number;
  }) {
    const { data, key = 'stock', seed } = options || {};
    before(async function () {
      this[key] = data
        ? _.cloneDeep(data)
        : specHelper.getFixture(specHelper.FIXTURE_TYPES.STOCK, seed);
      await specHelper.createStock(this[key]);
    });

    after(function () {
      return specHelper.removeStock(this[key]);
    });
  },

  async createNftContract(
    data: Partial<NftContractResource>,
  ): Promise<NftContractDocument> {
    const result = await NftContract.create({ ...data });
    data._id = result._id;
    return result;
  },

  async removeNftContract(data: NftContractResource) {
    return data._id && NftContract.deleteOne({ _id: data._id });
  },

  withNftContract(options?: {
    data?: Partial<NftContractResource>;
    key?: string;
    seed?: number;
  }) {
    const { data, key = 'nftContract', seed } = options || {};
    before(async function () {
      this[key] = data
        ? _.cloneDeep(data)
        : specHelper.getFixture(specHelper.FIXTURE_TYPES.NFT_CONTRACT, seed);
      await specHelper.createNftContract(this[key]);
    });

    after(function () {
      return specHelper.removeNftContract(this[key]);
    });
  },

  async createNftContractRange(
    nftContractData: Partial<NftContractResource>,
    data: Partial<NftContractRangeResource>,
  ): Promise<NftContractRangeDocument> {
    const result = await NftContractRange.create({ nftContract: nftContractData._id, ...data });
    data._id = result._id;
    return result;
  },

  async removeNftContractRange(data: NftContractRangeResource) {
    return data._id && NftContractRange.deleteOne({ _id: data._id });
  },

  withNftContractRange(options?: {
    data?: Partial<NftContractRangeResource>;
    key?: string;
    nftContractKey?: string;
    seed?: number;
  }) {
    const {
      data,
      key = 'nftContractRange',
      nftContractKey = 'nftContract',
      seed,
    } = options || {};
    before(async function () {
      this[key] = data
        ? _.cloneDeep(data)
        : specHelper.getFixture(specHelper.FIXTURE_TYPES.NFT_CONTRACT_RANGE, seed);
      await specHelper.createNftContractRange(this[nftContractKey], this[key]);
    });

    after(function () {
      return specHelper.removeNftContractRange(this[key]);
    });
  },

  createOrder(data: Partial<Record<Product, number>> = {}): number[] {
    const result: number[] = Array.from({ length: Object.keys(ProductValues).length }).map(
      () => 0,
    );
    Object.entries(data).forEach(([productId, amount]) => {
      result[productId as unknown as number] = amount!;
    });
    return result;
  },

  withPurchase({ order, value = utils.parseEther('100') }: { order: number[], value?: BigNumber }) {
    before(async function (this: Context) {
      const transaction = await specHelper.guildOfGuardiansPreSaleConnected.purchase(
        order,
        constants.AddressZero,
        { value },
      );
      this.transactionReceipt = await transaction.wait();
    });
    after(function (this: Context) {
      const { transactionHash } = this.transactionReceipt;
      return Promise.all([
        AllocatedOrder.deleteMany({ transactionHash }),
        Asset.deleteMany({ transactionHash }),
      ]);
    });
  },

  checkResponse(
    sendResponse: () => RequestPromise,
    status = 200,
    makeSnapShot?: MakeSnapShotParam,
  ) {
    before('send request', async function () {
      this.response = await sendResponse.call(this);
    });
    it(`should return status ${status}`, function () {
      return expect(this.response.statusCode).to.be.equal(status);
    });
    if (makeSnapShot) {
      it(makeSnapShot.description || 'response should contain body', function () {
        // eslint-disable-next-line no-restricted-properties
        return makeSnapShot.isForced
          // eslint-disable-next-line no-restricted-properties
          ? expect(specHelper.maskPaths(
            this.response.body,
            makeSnapShot.mask || [],
          )).isForced.matchSnapshot(this)
          : expect(specHelper.maskPaths(
            this.response.body,
            makeSnapShot.mask || [],
          )).matchSnapshot(this);
      });
    }
  },

  maskPaths(obj: Record<string, any> | Record<string, any>[], paths: any[]) {
    const MASK_VALUE = '---';
    const mask = (target: Record<string, any>, idx: number) => {
      const result = _.cloneDeep(target);
      paths.forEach((item) => {
        const isObject = !Array.isArray(item) && _.isObject(item);
        const path = isObject ? item.replace : item;
        if (_.get(target, path)) {
          let newFieldValue;
          let newValue = isObject ? item.newValue : undefined;
          if (_.isUndefined(newValue)) {
            newValue = path ? `${path}` : MASK_VALUE;
          }
          if ((!isObject || item.useIdx !== false) && idx !== -1) {
            newValue = `${newValue}[${idx}]`;
          }
          newValue = `$\{${newValue}}`;
          if (isObject) {
            const replacedValue = item.withPath ? _.get(target, item.withPath) : item.withValue;
            newFieldValue = !_.isUndefined(replacedValue)
              ? (_.get(target, path) || '')
                .replace(new RegExp(replacedValue, 'g'), newValue)
              : newValue;
          } else {
            newFieldValue = newValue;
          }
          _.set(result, path, newFieldValue);
        }
      });
      return result;
    };
    return Array.isArray(obj) ? obj.map(mask) : mask(obj, -1);
  },

  withTimeout(timeout = 1000) {
    let timeoutId: NodeJS.Timeout | null = null;
    before((done) => {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        done();
      }, timeout);
    });
    after(() => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    });
  },
  withPrepareDb() {
    before(() => this.prepareDb());
  },
  prepareDb() {
    return Promise.all([
      AllocatedOrder.deleteMany(),
      Asset.deleteMany(),
      NftContract.deleteMany(),
      NftContractRange.deleteMany(),
      Stock.deleteMany(),
    ]);
  },
};

export default specHelper;
