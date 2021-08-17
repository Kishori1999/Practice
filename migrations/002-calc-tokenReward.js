'use strict';

const { createLog, modelProvider: { AllocatedOrder } } = require('app/app');
const { default: allocateOrderService } = require('app/lib/services/allocateOrder.service');

const log = createLog(module);

exports.up = async (next) => {
  log.info('Calc token reward');
  try {
    const allocatedOrderList = await AllocatedOrder.find({}).sort({ prevTotalOrderSum: 1 });

    await Promise.all(allocatedOrderList
      .map(({
        blockNumber,
        orderPrice,
        prevTotalOrderSum,
        transactionHash,
      }) => allocateOrderService.calcTokenRewards(
        blockNumber,
        transactionHash,
        prevTotalOrderSum,
        orderPrice,
      )),
    );
    next();
  } catch (err) {
    next(err);
  }
};

exports.down = async () => {
  // Not relevant
};
