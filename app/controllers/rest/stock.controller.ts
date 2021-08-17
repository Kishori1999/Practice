import app from 'app';
import BaseController from 'app/lib/base.restifizer.controller';
import { StockDocument, StockResource } from '../../domains/stock';

const {
  modelProvider: { Stock },
} = app;

const fields = [
  'product',
  'firstUsdPrice',
  'lastUsdPrice',
  'usdPrice',
  'availableAmount',
  'originalAmount',
  'createdAt',
  'updatedAt',
];

/**
 * @apiDefine StockResponse
 * @apiSuccess {Number} product
 * @apiSuccess {Number} usdPrice
 * @apiSuccess {Number} availableAmount
 * @apiSuccess {Number} originalAmount
 * @apiSuccess {String(ISODate)} createdAt
 * @apiSuccess {String(ISODate)} updatedAt
 */
/**
 * @apiGroup Stock
 * @apiName GetStocks
 * @api {get} /api/stocks Get Stock List
 * @apiDescription Returns array of stock.
 *
 * @apiUse StockResponse
 */
class StockController extends BaseController<StockDocument, Record<string, any>, StockResource> {
  authDelegate: any;

  constructor(options = {}) {
    Object.assign(options, {
      dataSource: {
        type: 'mongoose',
        options: {
          model: Stock,
        },
      },
      idField: 'product',
      disablePagination: true,
      path: ['/api/stocks'],
      fields,
      actions: {
        selectOne: BaseController.createAction({
          enabled: false,
        }),
        insert: BaseController.createAction({
          enabled: false,
        }),
      },
    });

    super(options);
  }
}

module.exports = StockController;
