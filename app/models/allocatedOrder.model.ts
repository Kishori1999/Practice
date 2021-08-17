import { Mongoose, Schema } from 'mongoose';
import { AllocatedOrderDocument, Customer } from '../domains/allocatedOrder';

const modelName = 'AllocatedOrder';

function getCustomerAggregationPipeline(currentSum: number) {
  return [
    {
      $project: {
        orderPrice: 1,
        owner: 1,
        tokenReward: 1,
        tokenRewardDistributions: 1,
        transactionHash: 1,
      },
    },
    { $unwind: '$tokenRewardDistributions' },
    {
      $match: {
        'tokenRewardDistributions.sumStart': { $lte: currentSum },
      },
    },
    {
      $group: {
        _id: '$transactionHash',
        owner: { $first: '$owner' },
        orderPrice: { $first: '$orderPrice' },
        tokenReward: { $sum: '$tokenRewardDistributions.reward' },
      },
    },
    {
      $group: {
        _id: '$owner',
        orderPriceTotal: { $sum: '$orderPrice' },
        tokenRewardTotal: { $sum: '$tokenReward' },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];
}

export default (mongoose: Mongoose) => {
  const tokenRewardDistributionSchema = new Schema({
    sumStart: {
      type: Number,
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
  }, { _id: false });

  const schema = new Schema({
    transactionHash: {
      type: String,
      required: true,
      unique: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
      index: true,
    },
    order: [Number],
    orderPrice: {
      type: Number,
      required: true,
    },
    prevTotalOrderSum: {
      type: Number,
      required: true,
      // TODO: Uncomment after completing migrations
      // sparse: true,
      // unique: true,
    },
    firstDiceRoll: {
      type: Number,
      required: true,
    },
    secondDiceRoll: {
      type: Number,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    assetsCreatedAt: Date,
    tokenReward: Number,
    tokenRewardDistributions: [tokenRewardDistributionSchema],
  }, {
    timestamps: true,
  });

  schema.statics.createOrFindOneByTransactionHash = async function createOrFindOneByTransactionHash(
    blockNumber: number,
    transactionHash: string,
    data: Partial<Omit<AllocatedOrderDocument, 'blockNumber' | 'transactionHash'>>,
  ): Promise<boolean> {
    const result = await this.updateOne(
      {
        blockNumber,
        transactionHash,
      },
      {
        ...data,
      },
      {
        upsert: true,
      },
    );
    return result.nModified === 0;
  };

  schema.statics.getOrderPriceSum = async function getOrderPriceSum(): Promise<number> {
    const aggregationResult = await this.aggregate([
      {
        $group: {
          _id: null,
          orderPriceTotal: { $sum: '$orderPrice' },
        },
      },
    ]);
    return aggregationResult[0]?.orderPriceTotal || 0;
  };

  schema.statics.getCustomer = async function getCustomer(
    address: string,
    currentSum: number,
  ): Promise<Customer | null> {
    const aggregationResult = await this.aggregate([
      {
        $match: {
          owner: address,
          prevTotalOrderSum: { $lt: currentSum },
        },
      },
      ...getCustomerAggregationPipeline(currentSum),
    ]);
    const mappedArray = aggregationResult.map(({ _id, ...rest }) => ({
      owner: _id,
      ...rest,
    }));
    if (mappedArray.length) {
      return mappedArray[0];
    } else {
      return null;
    }
  };

  schema.statics.getCustomers = async function getCustomers(
    currentSum: number,
  ): Promise<Customer[]> {
    const aggregationResult = await this.aggregate([
      ...getCustomerAggregationPipeline(currentSum),
    ]);
    return aggregationResult.map(({ _id, ...rest }) => ({
      owner: _id,
      ...rest,
    }));
  };

  return mongoose.model<AllocatedOrderDocument>(modelName, schema);
};
