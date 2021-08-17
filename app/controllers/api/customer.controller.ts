import app from 'app/index';
import BaseController from 'app/lib/base.controlizer.controller';
import { Scope } from 'controlizer';
import { StorageKey } from '../../domains/storage';
import { getExtendedMilestoneConfigs } from '../../lib/helpers/milestoneHelper';

const {
  modelProvider: {
    AllocatedOrder,
    Storage,
  },
} = app;

/**
 * @apiGroup Customer
 * @apiName GetCustomers
 * @api {get} /api/admin/customers Get Customer List
 * @apiDescription Returns array of customers.
 *
 * @apiSuccess {String} address
 * @apiSuccess {Number} orderPriceTotal
 */
/**
 * @apiGroup Customer
 * @apiName GetCustomer
 * @api {get} /api/customers/:address Get Customer List
 * @apiDescription Returns customers data by its address.
 *
 * @apiParam {String} address
 *
 * @apiSuccess {String} address
 * @apiSuccess {Number} orderPriceTotal
 */
class CustomerController extends BaseController {
  constructor(options = {}) {
    Object.assign(options, {
      path: '/api',
      actions: {
        getCustomers: BaseController.createAction({
          method: 'get',
          path: 'admin/customers',
        }),
        getOneCustomer: BaseController.createAction({
          method: 'get',
          path: 'addresses/:address/customers',
        }),
      },
    });
    super(options);
  }

  async getCustomers() {
    const lastReachedMilestone = await this.getLastReachedMilestone();
    if (!lastReachedMilestone) {
      return null;
    }

    return AllocatedOrder.getCustomers(lastReachedMilestone.sum);
  }

  async getOneCustomer(scope: Scope) {
    const { address } = scope.params;

    const lastReachedMilestone = await this.getLastReachedMilestone();
    if (!lastReachedMilestone) {
      return null;
    }

    return AllocatedOrder.getCustomer(address, lastReachedMilestone.sum);
  }

  private async getLastReachedMilestone() {
    const totalOrderSum = await Storage.getValue(StorageKey.TotalOrderSum, 0);
    const extendedMilestones = getExtendedMilestoneConfigs(totalOrderSum);
    return extendedMilestones.find(({ isLastReached }) => isLastReached);
  }
}

export = CustomerController;
