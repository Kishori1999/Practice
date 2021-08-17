import { BigNumber } from 'ethers';

export interface AllocatedOrderStruct {
  firstDiceRoll: BigNumber;
  order: BigNumber[];
}

export interface AllocatedOrderEvent {
  _allocatedOrder: AllocatedOrderStruct;
  _owner: string;
  _orderPrice: BigNumber;
}

export enum Product {
  RareHeroPack,
  EpicHeroPack,
  LegendaryHeroPack,
  PetPack,
  EnergyToken,
  BasicGuildToken,
  Tier1GuildToken,
  Tier2GuildToken,
  Tier3GuildToken,
}

export enum Price {
  FirstSale,
  LastSale,
}

export enum Rarity {
  Rare,
  Epic,
  Legendary,
  Common,
  NA,
}

export enum Chroma {
  Normal = 0,
  Warrior= 1,
  Elite= 2,
  Mythic= 3,
}

export interface DetailedAllocationStruct {
  product: Product;
  rarity: Rarity;
  heroPetType: number;
  chroma: number;
  potentialMythic: boolean;
}
