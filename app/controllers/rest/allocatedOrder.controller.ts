import app from 'app';
import BaseController from 'app/lib/base.restifizer.controller';
import { AllocatedOrderDocument, AllocatedOrderResource } from '../../domains/allocatedOrder';

const {
  modelProvider: {
    AllocatedOrder,
  },
} = app;

const fields = [
  '_id',
  'transactionHash',
  'blockNumber',
  'owner',
  'order',
  'orderPrice',
  'firstDiceRoll',
  'secondDiceRoll',
  'error',
  'tokenReward',
  'createdAt',
  'updatedAt',
];

/**
 * @apiDefine AllocatedOrderResponse
 * @apiSuccess {String} transactionHash
 * @apiSuccess {Number} blockNumber
 * @apiSuccess {String} owner
 * @apiSuccess {Number[]} order
 * @apiSuccess {Number} orderPrice
 * @apiSuccess {Number} firstDiceRoll
 * @apiSuccess {Number} secondDiceRoll
 * @apiSuccess {String} error
 * @apiSuccess {Number} tokenReward
 * @apiSuccess {String(ISODate)} createdAt
 * @apiSuccess {String(ISODate)} updatedAt
 */
/**
 * @apiGroup AllocatedOrder
 * @apiName GetAllocatedOrders
 * @api {get} /api/addresses/:owner/allocated-orders Get AllocatedOrder List
 * @apiDescription Returns array of AllocatedOrder.
 *
 * @apiUse AllocatedOrderResponse
 */
/**
 * @apiGroup AllocatedOrder
 * @apiName GetAllocatedOrder
 * @api {get} /api/addresses/:owner/allocated-orders/:transactionHash Get one AllocatedOrder
 * @apiParam {String} transactionHash id of AllocatedOrder.
 * @apiDescription Returns an allocated order.
 *
 * @apiUse AllocatedOrderResponse
 */
class AllocatedOrderController extends BaseController<
AllocatedOrderDocument,
Record<string, any>,
AllocatedOrderResource
> {
  authDelegate: any;

  constructor(options = {}) {
    Object.assign(options, {
      dataSource: {
        type: 'mongoose',
        options: {
          model: AllocatedOrder,
        },
      },
      idField: 'transactionHash',
      disablePagination: true,
      path: ['/api/addresses/:owner/allocated-orders', '/api/admin/allocated-orders'],
      fields,
      actions: {
        insert: BaseController.createAction({
          enabled: false,
        }),
      },
    });

    super(options);
  }
}

module.exports = AllocatedOrderController;
