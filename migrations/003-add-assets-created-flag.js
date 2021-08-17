'use strict';

const { createLog } = require('app/app');
const { default: allocateOrderService } = require('app/lib/services/allocateOrder.service');

const log = createLog(module);

exports.up = async (next) => {
  log.info('Add assetsCreatedAt');
  try {
    await allocateOrderService.initContract();
    await allocateOrderService.recoverOrders();
    await allocateOrderService.recoverAssets();
    next();
  } catch (err) {
    next(err);
  }
};

exports.down = async () => {
  // Not relevant
};
