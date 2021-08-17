import { Model, Mongoose, Schema } from 'mongoose';
import { StorageDocument, StorageKeyValues } from '../domains/storage';

const modelName = 'Storage';

export default (mongoose: Mongoose) => {
  const schema = new Schema({
    key: {
      type: String,
      required: true,
      unique: true,
      enum: StorageKeyValues,
    },
    value: Schema.Types.Mixed,
  }, {
    timestamps: true,
  });

  schema.statics.getValue = async function getValue<T>(
    this: Model<StorageDocument>,
    key: string,
    defaultValue: T,
  ): Promise<T> {
    const storage = await this.findOne({
      key,
    });
    if (!storage) {
      return defaultValue;
    }

    return <T>storage.value;
  };

  schema.statics.setValue = async function setValue<T>(
    this: Model<StorageDocument>,
    key: string,
    value: T,
    defaultValue?: T,
  ): Promise<T | undefined> {
    const doc = await this.findOneAndUpdate({
      key,
    }, {
      value,
    }, {
      upsert: true,
    });
    return doc ? <T>doc.value : defaultValue;
  };

  return mongoose.model<StorageDocument>(modelName, schema);
};
