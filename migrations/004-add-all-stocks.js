'use strict';

const { createLog, modelProvider: { Stock } } = require('app/app');
const { default: stockService } = require('app/lib/services/stock.service');
const { ProductValues } = require('app/domains/asset');

const log = createLog(module);

exports.up = async (next) => {
  log.info('Add stocks');
  try {
    await Stock.deleteMany();
    await stockService.initContract();
    await Promise.all(
      ProductValues.map((product) => stockService.createProductStock(product)),
    );
    next();
  } catch (err) {
    next(err);
  }
};

exports.down = async () => {
  // Not relevant
};
