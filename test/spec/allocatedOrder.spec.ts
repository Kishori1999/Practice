import { Context } from 'mocha';
import testConfig from 'test/config';
import specHelper from 'test/helper/specHelper';
import { AllocatedOrderResource } from '../../app/domains/allocatedOrder';

const MASKING_FIELDS = [
  '_id',
  'createdAt',
  'updatedAt',
];

describe('/allocated-orders', () => {
  before(function (this: Context) {
    this.owner = '0x111';
  });

  describe('Create', () => {
    const allocatedOrderData: Partial<AllocatedOrderResource> = specHelper.getFixture(
      specHelper.FIXTURE_TYPES.ALLOCATED_ORDER,
      1,
    );
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.post(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/allocated-orders`,
          allocatedOrderData,
        );
      },
      404,
    );
  });

  describe('Get list', () => {
    specHelper.withAllocatedOrder({ seed: 1 });
    describe('for owner', () => {
      specHelper.checkResponse(
        function (this: Context) {
          return specHelper.get(
            `${testConfig.baseUrl}/api/addresses/${this.owner}/allocated-orders`,
          );
        },
        200,
        {
          mask: MASKING_FIELDS,
        },
      );
    });
    describe('all through admin', () => {
      specHelper.checkResponse(
        () => specHelper.get(
          `${testConfig.baseUrl}/api/admin/allocated-orders`,
        ),
        200,
        {
          mask: MASKING_FIELDS,
        },
      );
    });
  });

  describe('Get one', () => {
    specHelper.withAllocatedOrder({ seed: 1 });
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.get(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/allocated-orders/${this.allocatedOrder.transactionHash}`,
        );
      },
      200,
      {
        mask: MASKING_FIELDS,
      },
    );
  });

  describe('Update', () => {
    specHelper.withAllocatedOrder({ seed: 1 });
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.patch(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/allocated-orders/${this.allocatedOrder.transactionHash}`,
          {},
        );
      },
      404,
    );
  });

  describe('Delete', () => {
    specHelper.withAllocatedOrder({ seed: 1 });
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.delete(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/allocated-orders/${this.allocatedOrder.transactionHash}`,
          {},
        );
      },
      404,
    );
  });
});
