import { Document, Model } from 'mongoose';
import { Chroma, Product, Rarity } from './solTypes';

export const ProductValues: Product[] = <Product[]>Object
  .values(Product)
  .filter((x) => typeof x === 'number');

export const RarityValues: Rarity[] = <Rarity[]>Object
  .values(Rarity)
  .filter((x) => typeof x === 'number');

export const ChromaValues: (keyof typeof Chroma)[] = <(keyof typeof Chroma)[]>Object
  .values(Chroma)
  .filter((x) => typeof x === 'number');

interface AssetInternal {
  potentialMythic: boolean;
  mythicClaimed?: boolean;
  claimMythicTransactionHash?: string;
}

interface AssetNft {
  contractAddress: string;
  tokenId: string;
}

export interface AssetDomain {
  owner: string;
  transactionHash: string;
  indexInOrder: number;
  product: Product;
  rarity: Rarity;
  type: number;
  chroma: Chroma;
  internal: AssetInternal;
  nft: AssetNft;
  boxed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssetModel extends Model<AssetDocument> {
}

export interface AssetDocument extends AssetDomain, Document {
}

export interface AssetResource extends AssetDomain {
  _id: string;
  category: AssetCategory;
}

export enum AssetCategory {
  Hero,
  Pet,
  Token,
}

export const AssetCategoryValues: AssetCategory[] = <AssetCategory[]>Object
  .values(AssetCategory)
  .filter((x) => typeof x === 'number');

export function getAssetCategory(product: Product) {
  switch (product) {
    case Product.RareHeroPack:
    case Product.EpicHeroPack:
    case Product.LegendaryHeroPack: {
      return AssetCategory.Hero;
    }
    case Product.PetPack: {
      return AssetCategory.Pet;
    }
    case Product.EnergyToken:
    case Product.BasicGuildToken:
    case Product.Tier1GuildToken:
    case Product.Tier2GuildToken:
    case Product.Tier3GuildToken:
      return AssetCategory.Token;
    default:
      throw new Error(`Wrong product: ${product}`);
  }
}
