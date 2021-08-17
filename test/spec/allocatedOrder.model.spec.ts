import { Context } from 'mocha';
import { expect } from 'chai';
import app from 'app';
import specHelper from 'test/helper/specHelper';
import { AllocatedOrderResource } from '../../app/domains/allocatedOrder';

const {
  modelProvider: {
    AllocatedOrder,
  },
} = app;

describe('AllocatedOrderModel', () => {
  const owner = '0x111';
  const otherOwner = '0x222';
  const allocatedOrder1Data = specHelper.getFixture<AllocatedOrderResource>(
    specHelper.FIXTURE_TYPES.ALLOCATED_ORDER,
    1,
    {
      owner,
      prevTotalOrderSum: 0,
      orderPrice: 1,
      tokenReward: 33,
      tokenRewardDistributions: [
        {
          sumStart: 0,
          reward: 10,
        },
        {
          sumStart: 100,
          reward: 11,
        },
        {
          sumStart: 200,
          reward: 12,
        },
      ],
    },
  );
  const allocatedOrder2Data = specHelper.getFixture<AllocatedOrderResource>(
    specHelper.FIXTURE_TYPES.ALLOCATED_ORDER,
    2,
    {
      owner,
      prevTotalOrderSum: 0,
      orderPrice: 2,
      tokenReward: 100,
      tokenRewardDistributions: [
        {
          sumStart: 0,
          reward: 100,
        },
      ],
    },
  );
  const allocatedOrder3Data = specHelper.getFixture<AllocatedOrderResource>(
    specHelper.FIXTURE_TYPES.ALLOCATED_ORDER,
    3,
    {
      owner: otherOwner,
      prevTotalOrderSum: 0,
      orderPrice: 3,
      tokenReward: 1000,
      tokenRewardDistributions: [
        {
          sumStart: 0,
          reward: 1000,
        },
      ],
    },
  );

  before(async () => Promise.all([allocatedOrder1Data, allocatedOrder2Data, allocatedOrder3Data]
    .map((data) => AllocatedOrder.create(data))));

  after(async () => Promise.all([allocatedOrder1Data, allocatedOrder2Data, allocatedOrder3Data]
    .map(({ transactionHash }) => AllocatedOrder.deleteOne({ transactionHash }))));

  describe('#getCustomer', () => {
    describe('with 1 item affected', () => {
      let result;
      before(async () => {
        result = await AllocatedOrder.getCustomer(owner, 1);
      });
      it('should aggregate 1 item data', function (this: Context) {
        expect(result).matchSnapshot(this);
      });
    });
    describe('with 2 items affected', () => {
      let result;
      before(async () => {
        result = await AllocatedOrder.getCustomer(owner, 101);
      });
      it('should aggregate 2 items data', function (this: Context) {
        expect(result).matchSnapshot(this);
      });
    });
  });

  describe('#getCustomers', () => {
    describe('with 1 item affected', () => {
      let result;
      before(async () => {
        result = await AllocatedOrder.getCustomers(1);
      });
      it('should aggregate 1 item data', function (this: Context) {
        expect(result).matchSnapshot(this);
      });
    });
    describe('with 2 items affected', () => {
      let result;
      before(async () => {
        result = await AllocatedOrder.getCustomers(101);
      });
      it('should aggregate 2 items data', function (this: Context) {
        expect(result).matchSnapshot(this);
      });
    });
  });
});
