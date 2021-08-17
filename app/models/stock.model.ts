import { Mongoose, Schema } from 'mongoose';
import { ProductValues } from '../domains/asset';
import { StockDocument } from '../domains/stock';
import { Product } from '../domains/solTypes';

const modelName = 'Stock';

export default (mongoose: Mongoose) => {
  const schema = new Schema({
    product: {
      unique: true,
      type: Number,
      enum: ProductValues,
      required: true,
    },
    firstUsdPrice: {
      type: Number,
      required: true,
    },
    lastUsdPrice: {
      type: Number,
      required: true,
    },
    usdPrice: {
      type: Number,
      required: true,
      default: -1,
    },
    availableAmount: {
      type: Number,
      required: true,
      default: -1,
    },
    originalAmount: {
      type: Number,
      required: true,
      default: -1,
    },
    isRaw: Boolean,
  }, {
    timestamps: true,
  });

  schema.statics.makeRaw = async function makeRaw(products: Product[]): Promise<void> {
    await Promise.all([...products].map(async (purchasedProduct) => this.updateOne(
      {
        product: purchasedProduct,
      },
      {
        isRaw: true,
      },
      {
        setDefaultsOnInsert: true,
        upsert: true,
      },
    )));
  };

  return mongoose.model<StockDocument>(modelName, schema);
};
