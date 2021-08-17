import { Document, Model } from 'mongoose';
import { Product } from './solTypes';

export interface StockDomain {
  product: Product;
  firstUsdPrice: number;
  lastUsdPrice: number;
  usdPrice: number;
  availableAmount: number;
  originalAmount: number;
  isRaw?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StockModel extends Model<StockDocument> {
  makeRaw(products: Product[]): Promise<void>;
}

export interface StockDocument extends StockDomain, Document {
}

export interface StockResource extends StockDomain {
}
