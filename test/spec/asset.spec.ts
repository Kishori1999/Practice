import { Context } from 'mocha';
import testConfig from 'test/config';
import specHelper from 'test/helper/specHelper';
import { AssetResource } from '../../app/domains/asset';

const MASKING_FIELDS = [
  '_id',
  'createdAt',
  'updatedAt',
];

describe('/assets', () => {
  before(function (this: Context) {
    this.owner = '0x111';
  });

  describe('Create', () => {
    const asset: Partial<AssetResource> = specHelper.getFixture(
      specHelper.FIXTURE_TYPES.ASSET,
      1,
    );
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.post(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/assets`,
          asset,
        );
      },
      404,
    );
  });

  describe('Get list', () => {
    specHelper.withAsset({ seed: 1 });
    describe('filtered by owner', () => {
      specHelper.checkResponse(
        function (this: Context) {
          return specHelper.get(
            `${testConfig.baseUrl}/api/addresses/${this.owner}/assets`,
          );
        },
        200,
        {
          mask: MASKING_FIELDS,
        },
      );
    });
    describe('without filter', () => {
      specHelper.checkResponse(
        () => specHelper.get(
          `${testConfig.baseUrl}/api/assets`,
        ),
        403,
      );
    });
  });

  describe('Get one', () => {
    specHelper.withAsset({ seed: 1 });
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.get(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/assets/${this.asset._id}`,
        );
      },
      200,
      {
        mask: MASKING_FIELDS,
      },
    );
  });

  describe('Update', () => {
    specHelper.withAsset({ seed: 1 });
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.patch(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/assets/${this.asset._id}`,
          {},
        );
      },
      404,
    );
  });

  describe('Delete', () => {
    specHelper.withAsset({ seed: 1 });
    specHelper.checkResponse(
      function (this: Context) {
        return specHelper.delete(
          `${testConfig.baseUrl}/api/addresses/${this.owner}/assets/${this.asset._id}`,
          {},
        );
      },
      404,
    );
  });
});
