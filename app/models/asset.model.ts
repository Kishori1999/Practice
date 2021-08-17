import { Mongoose, Schema } from 'mongoose';
import { AssetDocument, ChromaValues, ProductValues, RarityValues } from '../domains/asset';

const modelName = 'Asset';

export default (mongoose: Mongoose) => {
  const schema = new Schema({
    owner: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
    indexInOrder: {
      type: Number,
      required: true,
    },
    product: {
      type: Number,
      enum: ProductValues,
      required: true,
    },
    rarity: {
      type: Number,
      enum: RarityValues,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    chroma: {
      type: Number,
      enum: ChromaValues,
      required: true,
    },
    boxed: {
      type: Boolean,
      required: false,
    },
    internal: {
      potentialMythic: {
        type: Boolean,
        required: true,
      },
      mythicClaimed: Boolean,
      claimMythicTransactionHash: String,
    },
    nft: {
      contractAddress: String,
      tokenId: String,
    },
  }, {
    timestamps: true,
  });

  schema.index(
    {
      transactionHash: 1,
      indexInOrder: 1,
    },
    {
      unique: true,
    },
  );
  schema.index(
    {
      'nft.contractAddress': 1,
      'nft.tokenId': 1,
    },
    {
      sparse: true,
      unique: true,
    },
  );

  return mongoose.model<AssetDocument>(modelName, schema);
};
