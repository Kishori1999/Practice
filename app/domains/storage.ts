import { Document, Model } from 'mongoose';

export enum StorageKey {
  CurrentConfirmedBlock = 'CurrentConfirmedBlock',
  HandledBlock = 'HandledBlock',
  TotalOrderSum = 'TotalOrderSum',
}

export const StorageKeyValues: StorageKey[] = Object
  .values(StorageKey)
  .filter((x) => typeof x === 'string');

export interface StorageDomain {
  key: string;
  value: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface StorageModel extends Model<StorageDocument> {
  getValue<T>(key: string, defaultValue: T): Promise<T>;
  setValue<T>(key: string, value: T, defaultValue?: T): Promise<T | undefined>;
}

export interface StorageDocument extends StorageDomain, Document {
}
