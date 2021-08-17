'use strict';

const { createLog, modelProvider: { AllocatedOrder, Asset } } = require('app/app');
const { default: allocateOrderService } = require('app/lib/services/allocateOrder.service');

const log = createLog(module);

exports.up = async (next) => {
  log.info('Fill serial numbers / token IDs');
  try {
    const allocatedOrderList = await AllocatedOrder
      .find({ secondDiceRoll: { $ne: null } })
      .select('transactionHash')
      .sort({ prevTotalOrderSum: 1 })
      .lean();

    await Promise.all(allocatedOrderList.map(({ secondDiceRoll, transactionHash }) => async () => {
      log.info(`Processing allocatedOrder with transactionHash: ${transactionHash}`);
      const assets = await Asset.find({ transactionHash }).lean();
      return Promise.all(assets.map(async (asset) => {
        const { serialNumber, contractAddress } = await allocateOrderService.generateSerialNumber(
          asset,
          secondDiceRoll,
        );
        return Asset.updateOne(
          { _id: asset._id },
          { 'nft.contractAddress': contractAddress, 'nft.tokenId': serialNumber },
        );
      }));
    }));

    next();
  } catch (err) {
    next(err);
  }
};

exports.down = async () => {
  // Not relevant
};
