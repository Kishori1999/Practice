import app from 'app/index';
import BaseController from 'app/lib/base.controlizer.controller';
import { StorageKey } from '../../domains/storage';
import { getExtendedMilestoneConfigs } from '../../lib/helpers/milestoneHelper';

const {
  config: {
    contracts,
    networkName,
  },
  modelProvider: {
    Storage,
  },
} = app;

/**
 * @apiGroup CommonData
 * @apiName GetMilestones
 * @api {get} /api/milestones Get Milestone List
 * @apiDescription Returns array of milestones.
 *
 * @apiSuccess {Number} sum
 * @apiSuccess {String} label
 * @apiSuccess {Number} reward
 * @apiSuccess {Boolean} isReached
 * @apiSuccess {Boolean} isLastReached
 * @apiSuccess {Boolean} isCurrent
 */
/**
 * @apiGroup CommonData
 * @apiName GetMilestones
 * @api {get} /api/total-order-sum Get Total Order Sum
 * @apiDescription Returns total order sum.
 * @apiSuccess {Number} totalOrderSum
 */
/**
 * @apiGroup CommonData
 * @apiName GetNetwork
 * @api {get} /api/network Get network and contract data
 * @apiDescription Returns network and contract data
 * @apiSuccess {String} networkName
 * @apiSuccess {Object} contracts
 */
class CommonDataController extends BaseController {
  constructor(options = {}) {
    Object.assign(options, {
      path: '/api',
      actions: {
        getMilestones: BaseController.createAction({
          method: 'get',
          path: 'milestones',
        }),
        getTotalOrderSum: BaseController.createAction({
          method: 'get',
          path: 'total-order-sum',
        }),
        getNetworkData: BaseController.createAction({
          method: 'get',
          path: 'network',
        }),
      },
    });
    super(options);
  }

  async getMilestones() {
    const totalOrderSum = await Storage.getValue(StorageKey.TotalOrderSum, 0);
    return getExtendedMilestoneConfigs(totalOrderSum);
  }

  async getTotalOrderSum() {
    const totalOrderSum = await Storage.getValue(StorageKey.TotalOrderSum, 0);
    return { totalOrderSum };
  }

  async getNetworkData() {
    return {
      contracts,
      networkName,
    };
  }
}

export = CommonDataController;
