import { Document, Model } from 'mongoose';
import { AssetCategory } from './asset';

export interface NftContractDomain {
  assetCategory: AssetCategory;
  metadataId: number;
  contractAddress: string;
}

export interface NftContractModel extends Model<NftContractDocument> {
}

export interface NftContractDocument extends NftContractDomain, Document {
}

export interface NftContractResource extends NftContractDomain {
  _id: string;
}
