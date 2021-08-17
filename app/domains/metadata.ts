import { Rarity } from './solTypes';
import { AssetCategory } from './asset';

export enum HeroClass {
  Melee = 'Melee',
  Ranged = 'Ranged',
  Mage = 'Mage',
}

export enum Element {
  Water= 'Water',
  Earth = 'Earth',
  Fire = 'Fire',
  Light = 'Light',
  Dark = 'Dark',
}

export enum Faction {
  Empire ='Empire',
  Glade ='Glade',
  Horde ='Horde',
}

export enum PetClass {
  Hunters= 'Hunters',
  Scouts = 'Scouts',
  Workers = 'Workers',
}

export interface CommonMetadata {
  id: number;
  name: string;
  ipfsFolder?: string;
}

export interface HeroMetadata extends CommonMetadata {
  tagline: string;
  faction: Faction,
  class: HeroClass,
  element: Element;
}

export interface PetMetadata extends CommonMetadata {
  heroPetType: number;
  rarity: Rarity;
  class: PetClass;
  effect: string;
  effect2: string;
}

export interface TokenMetadata extends CommonMetadata {
  assetBase: string;
}

export interface AllMetadata {
  [AssetCategory.Hero]: HeroMetadata[],
  [AssetCategory.Pet]: PetMetadata[],
  [AssetCategory.Token]: TokenMetadata[],
}

export type OneOfMetadata = HeroMetadata | PetMetadata | TokenMetadata;

export interface CommonMetadataResource {
  animationUrl?: string;
}

export interface HeroMetadataResource extends Omit<HeroMetadata, 'ipfsFolder'>, CommonMetadataResource {
}

export interface PetMetadataResource extends Omit<PetMetadata, 'ipfsFolder'>, CommonMetadataResource {
}

export interface TokenMetadataResource extends Omit<TokenMetadata, 'ipfsFolder'>, CommonMetadataResource {
}

export interface AllMetadataResource {
  [AssetCategory.Hero]: HeroMetadataResource[],
  [AssetCategory.Pet]: PetMetadataResource[],
  [AssetCategory.Token]: TokenMetadataResource[],
}

export type OneOfMetadataResource =
| HeroMetadataResource
| PetMetadataResource
| TokenMetadataResource;
