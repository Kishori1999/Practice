import { HeroMetadata, PetMetadata, TokenMetadata } from './metadata';
import { AssetCategory, AssetDomain } from './asset';
import { Chroma, Rarity } from './solTypes';

type MetadataWithoutId = Omit<HeroMetadata | PetMetadata | TokenMetadata, 'id'>;

export interface NftResource extends MetadataWithoutId {
  tokenId: AssetDomain['nft']['tokenId'],
  contractAddress: AssetDomain['nft']['contractAddress'],
  assetCategory: AssetCategory,
  assetId: string,
  rarity: Rarity,
  chroma: Chroma,
}
