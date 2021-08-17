import _ from 'lodash';
import { FilterQuery, Mongoose, Schema } from 'mongoose';
import app from 'app';
import { NftContractRangeBatch, NftContractRangeDocument, NftContractRangeModel } from '../domains/nftContractRange';
import { validateBatch } from '../lib/helpers/nftContractHelper';

const modelName = 'NftContractRange';

export default (mongoose: Mongoose) => {
  const schema = new Schema({
    nftContract: {
      type: Schema.Types.ObjectId,
      ref: 'NftContract',
      required: true,
    },
    probabilityFrom: {
      type: Number,
      required: true,
    },
    probabilityTo: {
      type: Number,
      required: true,
    },
    serialNumbers: [{
      type: Number,
      required: true,
    }],
  }, {
    timestamps: true,
  });

  // @ts-ignore
  schema.statics.popSerialNumber = async function popSerialNumber(
    this: NftContractRangeModel,
    contractAddress: string,
    probability: number,
  ): Promise<number> {
    const nftContract = await app.modelProvider.NftContract.findOne({
      contractAddress,
    }).lean().select('_id');
    if (!nftContract) {
      throw new Error(`Cannot locate nftContract for ${contractAddress}`);
    }

    let nftContractRange = await this.findOneAndPopSerialNumber({
      nftContract: nftContract._id,
      probabilityFrom: { $lte: probability },
      probabilityTo: { $gt: probability },
    });

    if (!nftContractRange) {
      nftContractRange = await this.lookForAlternativeAndPopSerialNumber(nftContract._id);
    }
    if (!nftContractRange) {
      throw new Error(`No serial numbers available for ${
        contractAddress} with probability ${probability}`);
    }
    return nftContractRange.serialNumbers[0];
  };

  // @ts-ignore
  schema.statics.findOneAndPopSerialNumber = async function findOneAndPopSerialNumber(
    this: NftContractRangeModel,
    filter: FilterQuery<NftContractRangeDocument>,
  ): Promise<NftContractRangeDocument|null> {
    const nftContractRange = await this.findOneAndUpdate(
      filter,
      {
        $pop: {
          serialNumbers: -1,
        },
      },
    )
      .select('serialNumbers');
    if (!nftContractRange) {
      throw new Error('Cannot locate nftContractRange');
    }

    const { serialNumbers } = nftContractRange;

    return serialNumbers && serialNumbers.length > 0 ? nftContractRange : null;
  };

  // @ts-ignore
  schema.statics.lookForAlternativeAndPopSerialNumber = async function
  lookForAlternativeAndPopSerialNumber(
    this: NftContractRangeModel,
    nftContractId: string,
  ): Promise<NftContractRangeDocument|null> {
    const nftContractRanges = await this.find(
      {
        nftContract: nftContractId,
        'serialNumbers.0': { $exists: true },
      },
    )
      .select('serialNumbers')
      .sort({
        probabilityFrom: 1,
      })
      .lean();

    let result: NftContractRangeDocument | null = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const currentNftContractRange of nftContractRanges) {
      // eslint-disable-next-line no-await-in-loop
      result = await this.findOneAndPopSerialNumber({ _id: currentNftContractRange._id });
      if (result) {
        break;
      }
    }
    return result;
  };

  schema.statics.generateBatch = async function generateBatch(
    nftContractRangeBatch: NftContractRangeBatch,
  ): Promise<void> {
    validateBatch(nftContractRangeBatch);
    const { contractAddress, ranges } = nftContractRangeBatch;
    const nftContract = await app.modelProvider.NftContract.findOne({
      contractAddress,
    }).lean().select('_id');
    if (!nftContract) {
      throw new Error(`Cannot locate nftContract for ${contractAddress}`);
    }
    let lastProbabilityFrom = 0;
    await Promise.all(ranges.map(({ probability, serialNumberFrom, amount }) => {
      const result = {
        nftContract: nftContract._id,
        probabilityFrom: lastProbabilityFrom,
        probabilityTo: lastProbabilityFrom + probability,
        serialNumbers: _.shuffle(
          _.range(serialNumberFrom, serialNumberFrom + amount),
        ),
      };
      lastProbabilityFrom += probability;
      return this.create(result);
    }));
  };

  return mongoose.model<NftContractRangeDocument>(modelName, schema);
};
