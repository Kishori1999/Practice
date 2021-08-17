import app from 'app';
import HTTP_STATUSES from 'http-statuses';
import { Scope } from 'app/domains/app';
import BaseController from 'app/lib/base.restifizer.controller';
import { AssetDocument, AssetResource, getAssetCategory } from '../../domains/asset';

const {
  modelProvider: { Asset },
} = app;

const fields = [
  '_id',
  'owner',
  'transactionHash',
  'indexInOrder',
  'product',
  'rarity',
  'type',
  'chroma',
  'boxed',
  'createdAt',
  'updatedAt',
];

/**
 * @apiDefine AssetResponse
 * @apiSuccess {String} owner
 * @apiSuccess {String} transactionHash
 * @apiSuccess {Number} indexInOrder
 * @apiSuccess {Number} product
 * @apiSuccess {Number} rarity
 * @apiSuccess {Number} type
 * @apiSuccess {Number} chroma
 * @apiSuccess {Boolean} boxed
 * @apiSuccess {Number} category
 * @apiSuccess {String(ISODate)} createdAt
 * @apiSuccess {String(ISODate)} updatedAt
 */
/**
 * @apiGroup Asset
 * @apiName GetAssets
 * @api {get} /api/addresses/:owner/assets Get Asset List
 * @apiDescription Returns array of assets.
 *
 * @apiUse AssetResponse
 */
/**
 * @apiGroup Asset
 * @apiName GetAsset
 * @api {get} /api/addresses/:owner/assets/:_id Get one asset
 * @apiParam {String(ObjectID)} _id id of an asset.
 * @apiDescription Returns an asset.
 *
 * @apiUse AssetResponse
 */
/**
 * @apiGroup Asset
 * @apiName UnboxAsset
 * @api {put} /api/addresses/:owner/assets/:_id/unbox Unbox an asset
 * @apiParam {String(ObjectID)} _id id of an asset.
 * @apiDescription Remove boxed flag of an asset.
 *
 * @apiUse EmptySuccess
 */
/**
 * @apiGroup Asset
 * @apiName BatchUnboxAsset
 * @api {put} /api/addresses/:owner/assets/unbox Unbox a batch of assets
 * @apiParam {Object} filter filter criteria for assets to get unboxed
 * @apiDescription Remove boxed flag of assets.
 *
 * @apiSuccess {Number} updated amount of records updated
 */
class AssetController extends BaseController<AssetDocument, Record<string, any>, AssetResource> {
  authDelegate: any;

  constructor(options = {}) {
    Object.assign(options, {
      dataSource: {
        type: 'mongoose',
        options: {
          model: Asset,
        },
      },
      idField: '_id',
      disablePagination: true,
      path: ['/api/addresses/:owner/assets', '/api/assets'],
      fields,
      actions: {
        insert: BaseController.createAction({
          enabled: false,
        }),
        unbox: BaseController.createAction({
          method: 'put',
          path: ':_id/unbox',
        }),
        batchUnbox: BaseController.createAction({
          method: 'put',
          path: 'unbox',
        }),
      },
    });

    super(options);
  }

  async pre(scope: Scope<AssetDocument>) {
    // Do not allow to select list of all assets
    if (!scope.params.owner && scope.isSelect() && !scope.isSelectOne()) {
      throw HTTP_STATUSES.FORBIDDEN.createError();
    }
  }

  async post(result: AssetResource) {
    result.category = getAssetCategory(result.product);
    return result;
  }

  async unbox(scope: Scope<AssetDocument>) {
    const {
      params: { _id: id },
    } = scope;
    const { nModified } = await Asset.updateOne({ _id: id }, { $unset: { boxed: 1 } });
    if (nModified === 0) {
      throw HTTP_STATUSES.NOT_FOUND.createError();
    }
  }

  async batchUnbox(scope: Scope<AssetDocument>) {
    const { params: { owner } } = scope;
    const filter = await this.getFilter(scope);

    const { nModified } = await Asset.updateMany(
      { ...filter, owner },
      { $unset: { boxed: 1 } },
    );
    return { updated: nModified };
  }
}

module.exports = AssetController;
