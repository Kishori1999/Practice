'use strict';

const { createLog, modelProvider: { AllocatedOrder, Storage } } = require('app/app');

const log = createLog(module);

exports.up = async (next) => {
  log.info('Set TotalOrderSum');
  try {
    await Storage.setValue('TotalOrderSum', await AllocatedOrder.getOrderPriceSum());
    next();
  } catch (err) {
    next(err);
  }
};

exports.down = async (next) => {
  log.info('Remove TotalOrderSum');
  try {
    await Storage.deleteOne({ key: 'TotalOrderSum' });
    next();
  } catch (err) {
    next(err);
  }
};
