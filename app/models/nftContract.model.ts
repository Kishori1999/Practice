import { Mongoose, Schema } from 'mongoose';
import { AssetCategoryValues } from '../domains/asset';
import { NftContractDocument } from '../domains/nftContract';

const modelName = 'NftContract';

export default (mongoose: Mongoose) => {
  const schema = new Schema({
    assetCategory: {
      type: Number,
      enum: AssetCategoryValues,
      required: true,
    },
    metadataId: {
      type: Number,
      required: true,
    },
    contractAddress: {
      unique: true,
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });

  schema.index(
    {
      assetCategory: 1,
      metadataId: 1,
    },
    {
      unique: true,
    },
  );

  return mongoose.model<NftContractDocument>(modelName, schema);
};
