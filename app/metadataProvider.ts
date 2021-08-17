import { Product, Rarity } from './domains/solTypes';
import {
  AllMetadata,
  Element,
  Faction,
  HeroClass,
  HeroMetadata, OneOfMetadata,
  PetClass,
  PetMetadata,
  TokenMetadata,
} from './domains/metadata';
import { AssetCategory, AssetDomain } from './domains/asset';

export const ipfsBaseUrl = 'https://guildofguardians.mypinata.cloud/ipfs';

export const heroesMetadata: HeroMetadata[] = [
  {
    id: 1,
    name: 'Lia',
    tagline: 'Priestess of Illumination',
    faction: Faction.Glade,
    class: HeroClass.Mage,
    element: Element.Light,
    ipfsFolder: 'QmRmQ1H2cfaECE9fWz4URiBtBmenyFUvdbaLDuTG7CReRW',
  },
  {
    id: 2,
    name: 'Tavros',
    tagline: 'Archmage of Darkness',
    faction: Faction.Empire,
    class: HeroClass.Mage,
    element: Element.Dark,
  },
  {
    id: 3,
    name: 'Rufus',
    tagline: 'Guardian of the Skies',
    faction: Faction.Glade,
    class: HeroClass.Ranged,
    element: Element.Water,
  },
  {
    id: 4,
    name: 'Tieroc',
    tagline: 'Cursed Sorcerer',
    faction: Faction.Glade,
    class: HeroClass.Mage,
    element: Element.Dark,
  },
  {
    id: 5,
    name: 'Helia',
    tagline: 'Princess of Flame',
    faction: Faction.Horde,
    class: HeroClass.Ranged,
    element: Element.Fire,
  },
  {
    id: 6,
    name: 'Freia',
    tagline: 'Bastion of Defense',
    faction: Faction.Empire,
    class: HeroClass.Melee,
    element: Element.Earth,
  },
  {
    id: 7,
    name: 'Kharkuk',
    tagline: 'Chieftan of the Deadlands',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Earth,
  },
  {
    id: 8,
    name: 'Cyrus',
    tagline: 'Infernal Swordsman',
    faction: Faction.Empire,
    class: HeroClass.Melee,
    element: Element.Fire,
  },
  {
    id: 9,
    name: 'Ewindel',
    tagline: 'The Luminous Weaver',
    faction: Faction.Horde,
    class: HeroClass.Mage,
    element: Element.Light,
  },
  {
    id: 10,
    name: 'Kanreh',
    tagline: 'Grassland Protector',
    faction: Faction.Glade,
    class: HeroClass.Melee,
    element: Element.Earth,
  },
  {
    id: 11,
    name: 'Miera',
    tagline: 'Gatekeeper of Otherrealm',
    faction: Faction.Glade,
    class: HeroClass.Mage,
    element: Element.Dark,
  },
  {
    id: 12,
    name: 'Othrox',
    tagline: 'Lost Prince of Draconia',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Fire,
  },
  {
    id: 13,
    name: 'Prielle',
    tagline: 'Light of the North',
    faction: Faction.Empire,
    class: HeroClass.Mage,
    element: Element.Light,
  },
  {
    id: 14,
    name: 'Gwynn',
    tagline: 'Oracle of the Infinite',
    faction: Faction.Glade,
    class: HeroClass.Melee,
    element: Element.Water,
  },
  {
    id: 15,
    name: 'Morax',
    tagline: 'Forsaken Demon',
    faction: Faction.Horde,
    class: HeroClass.Mage,
    element: Element.Fire,
  },
  {
    id: 16,
    name: 'Farrah',
    tagline: 'Shadow Assassin',
    faction: Faction.Horde,
    class: HeroClass.Ranged,
    element: Element.Earth,
  },
  {
    id: 17,
    name: 'Duren',
    tagline: 'The Dark Hand',
    faction: Faction.Glade,
    class: HeroClass.Melee,
    element: Element.Dark,
  },
  {
    id: 18,
    name: 'Elohatt',
    tagline: 'Exiled Necromancer',
    faction: Faction.Horde,
    class: HeroClass.Mage,
    element: Element.Water,
  },
  {
    id: 19,
    name: 'Takati',
    tagline: 'The Stonewalker',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Water,
  },
  {
    id: 20,
    name: 'Strider',
    tagline: 'Untamed Huntress',
    faction: Faction.Glade,
    class: HeroClass.Ranged,
    element: Element.Earth,
  },
  {
    id: 21,
    name: 'Tomoe',
    tagline: 'The Wandering Blade',
    faction: Faction.Empire,
    class: HeroClass.Melee,
    element: Element.Light,
  },
  {
    id: 22,
    name: 'Arkus',
    tagline: 'Hallowed Champion',
    faction: Faction.Empire,
    class: HeroClass.Melee,
    element: Element.Light,
  },
  {
    id: 23,
    name: 'Germain',
    tagline: 'Swashbuckling Charmer',
    faction: Faction.Glade,
    class: HeroClass.Melee,
    element: Element.Light,
  },
  {
    id: 24,
    name: 'Akhun',
    tagline: 'Prince of Light',
    faction: Faction.Empire,
    class: HeroClass.Melee,
    element: Element.Light,
  },
  {
    id: 25,
    name: 'Aria',
    tagline: 'Keeper of Mystery',
    faction: Faction.Empire,
    class: HeroClass.Mage,
    element: Element.Dark,
  },
  {
    id: 26,
    name: 'Ulmak',
    tagline: 'Revenant of Dust',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Earth,
  },
  {
    id: 27,
    name: 'Umbar',
    tagline: 'Bringer of Despair',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Dark,
  },
  {
    id: 28,
    name: 'Varik',
    tagline: 'Infamous Thief',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Water,
  },
  {
    id: 29,
    name: 'Rei',
    tagline: "Inferno's Dancer",
    faction: Faction.Glade,
    class: HeroClass.Melee,
    element: Element.Fire,
  },
  {
    id: 30,
    name: 'Rowan',
    tagline: 'Sentinel of the Wald',
    faction: Faction.Glade,
    class: HeroClass.Mage,
    element: Element.Dark,
  },
  {
    id: 31,
    name: 'Felicia',
    tagline: 'Volcanic Nymph',
    faction: Faction.Glade,
    class: HeroClass.Mage,
    element: Element.Fire,
  },
  {
    id: 32,
    name: 'Kalix',
    tagline: 'King of the Frostmire',
    faction: Faction.Glade,
    class: HeroClass.Melee,
    element: Element.Water,
  },
  {
    id: 33,
    name: 'Torim',
    tagline: 'Dwarven Battlemaster',
    faction: Faction.Empire,
    class: HeroClass.Ranged,
    element: Element.Earth,
  },
  {
    id: 34,
    name: 'Daskah',
    tagline: 'Notorious Brigand',
    faction: Faction.Horde,
    class: HeroClass.Ranged,
    element: Element.Fire,
  },
  {
    id: 35,
    name: 'Tikor',
    tagline: 'Herald of Violence',
    faction: Faction.Horde,
    class: HeroClass.Melee,
    element: Element.Water,
  },
];

export const petsMetadata: PetMetadata[] = [
  {
    id: 1,
    heroPetType: 1,
    rarity: Rarity.Common,
    name: 'Trixie',
    class: PetClass.Workers,
    effect: 'Free daily cubelets',
    effect2: 'T1 + T2',
  },
  {
    id: 2,
    heroPetType: 1,
    rarity: Rarity.Rare,
    name: 'Krios',
    class: PetClass.Workers,
    effect: 'Free daily cubelets',
    effect2: 'T2 + T3',
  },
  {
    id: 3,
    heroPetType: 1,
    rarity: Rarity.Epic,
    name: 'Namur',
    class: PetClass.Workers,
    effect: 'Free daily cubelets',
    effect2: 'T3 + T4',
  },
  {
    id: 4,
    heroPetType: 1,
    rarity: Rarity.Legendary,
    name: 'Cadmus',
    class: PetClass.Workers,
    effect: 'Free daily cubelets',
    effect2: 'T4 + T5',
  },
  {
    id: 5,
    heroPetType: 2,
    rarity: Rarity.Common,
    name: 'Reina',
    class: PetClass.Scouts,
    effect: 'Increase item drop rates',
    effect2: '10%',
  },
  {
    id: 6,
    heroPetType: 2,
    rarity: Rarity.Rare,
    name: 'Stype',
    class: PetClass.Scouts,
    effect: 'Increase item drop rates',
    effect2: '25%',
  },
  {
    id: 7,
    heroPetType: 2,
    rarity: Rarity.Epic,
    name: 'Onyx',
    class: PetClass.Scouts,
    effect: 'Increase item drop rates',
    effect2: '50%',
  },
  {
    id: 8,
    heroPetType: 2,
    rarity: Rarity.Legendary,
    name: 'Selene',
    class: PetClass.Scouts,
    effect: 'Increase item drop rates',
    effect2: '100%',
  },
  {
    id: 9,
    heroPetType: 3,
    rarity: Rarity.Common,
    name: 'Rummus',
    class: PetClass.Hunters,
    effect: 'Increase cubelet rewards',
    effect2: 'T1-T2',
  },
  {
    id: 10,
    heroPetType: 3,
    rarity: Rarity.Rare,
    name: 'Urska',
    class: PetClass.Hunters,
    effect: 'Increase cubelet rewards',
    effect2: 'T1-T3',
  },
  {
    id: 11,
    heroPetType: 3,
    rarity: Rarity.Epic,
    name: 'Mbeku',
    class: PetClass.Hunters,
    effect: 'Increase cubelet rewards',
    effect2: 'T1-T4',
  },
  {
    id: 12,
    heroPetType: 3,
    rarity: Rarity.Legendary,
    name: 'Lucius',
    class: PetClass.Hunters,
    effect: 'Increase cubelet rewards',
    effect2: 'All Tiers',
  },
];

export const tokensMetadata: TokenMetadata[] = [
  {
    id: Product.EnergyToken,
    name: 'Energy Token',
    assetBase: 'energy-token',
  },
  {
    id: Product.BasicGuildToken,
    name: 'Adventurers Guild Token',
    assetBase: 'adventurers-guild',
  },
  {
    id: Product.Tier1GuildToken,
    name: 'Warriors Guild Token',
    assetBase: 'heroes-guild',
  },
  {
    id: Product.Tier2GuildToken,
    name: 'Legends Guild Token',
    assetBase: 'legends-guild',
  },
  {
    id: Product.Tier3GuildToken,
    name: 'Mythic Guild Token',
    assetBase: 'mythic-guild',
  },
];

export const metadata: AllMetadata = {
  [AssetCategory.Hero]: heroesMetadata,
  [AssetCategory.Pet]: petsMetadata,
  [AssetCategory.Token]: tokensMetadata,
};

export function getMetadata(
  assetCategory: AssetCategory,
  asset: AssetDomain,
): OneOfMetadata | undefined {
  const categoryMetadata: OneOfMetadata[] = metadata[assetCategory];
  let findFn: (metadata: OneOfMetadata) => boolean;
  if (assetCategory === AssetCategory.Hero) {
    findFn = (metadataItem: OneOfMetadata) => {
      const heroMetadata = <HeroMetadata><unknown>metadataItem;
      return heroMetadata.id === asset.type;
    };
  } else if (assetCategory === AssetCategory.Pet) {
    findFn = (metadataItem: OneOfMetadata) => {
      const petMetadata = <PetMetadata><unknown>metadataItem;
      return petMetadata.heroPetType === asset.type
        && petMetadata.rarity === asset.rarity;
    };
  } else if (assetCategory === AssetCategory.Token) {
    findFn = (tokenMetadata: OneOfMetadata) => tokenMetadata.id === asset.product;
  } else {
    throw new Error(`Wrong assetCategory: ${assetCategory}`);
  }
  const foundItem = categoryMetadata.find(findFn);

  return foundItem ? { ...foundItem } : undefined;
}
