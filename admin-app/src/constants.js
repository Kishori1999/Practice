import token from "./styles/token";
import { Product, Rarity } from "../constants";

const AssetCartId = {
  PET: "numPetPacks",
  ENERGY: "numEnergyTokens",
  ADVENTURERS: "numBasicGuildTokens",
  HEROES: "numTier1GuildTokens",
  LEGENDS: "numTier2GuildTokens",
  MYTHIC: "numTier3GuildTokens",
  RARE: "numRareHeroPacks",
  EPIC: "numEpicHeroPacks",
  LEGENDARY: "numLegendaryHeroPacks",
};

const heroProducts = [Product.RareHeroPack, Product.EpicHeroPack, Product.LegendaryHeroPack];
const petProducts = [Product.PetPack];
const otherProducts = [
  Product.EnergyToken,
  Product.BasicGuildToken,
  Product.Tier1GuildToken,
  Product.Tier2GuildToken,
  Product.Tier3GuildToken,
];

const Faction = {
  EMPIRE: "Empire",
  GLADE: "Glade",
  HORDE: "Horde",
};
const factions = [Faction.HORDE, Faction.EMPIRE, Faction.GLADE];

const Type = {
  MELEE: "Melee",
  RANGED: "Ranged",
  MAGE: "Mage",
};
const types = [Type.MELEE, Type.RANGED, Type.MAGE];
const Element = {
  WATER: "Water",
  EARTH: "Earth",
  FIRE: "Fire",
  LIGHT: "Light",
  DARK: "Dark",
};
const elements = [Element.WATER, Element.EARTH, Element.FIRE, Element.LIGHT, Element.DARK];

const chromas = [0, 1, 2, 3];
const Chroma = {
  NORMAL: 0,
  WARRIOR: 1,
  ELITE: 2,
  MYTHIC: 3,
};
const chromaToEditionMap = {
  [Chroma.WARRIOR]: "warrior",
  [Chroma.ELITE]: "elite",
  [Chroma.MYTHIC]: "mythic",
  [Chroma.NORMAL]: "common",
};

const rarityLabel = {
  [Rarity.Rare]: "Rare",
  [Rarity.Epic]: "Epic",
  [Rarity.Legendary]: "Legendary",
  [Rarity.Common]: "Common",
  [Rarity.NA]: "NA",
};
const SortType = {
  OLDEST_FIRST: "oldset",
  NEWEST_FIRST: "newest",
};

/*
const SpecialEdition = {
  NONE: "None",
  WARRIOR: "Warrior",
  ELITE: "Elite",
  MYTHIC: "Mythic",
};
 */

const TabId = {
  HEROES: "heroes",
  PETS: "pets",
  OTHER: "other",
};

const elementToColorMap = {
  [Element.EARTH]: token.palette.purple.earth,
  [Element.WATER]: token.palette.blue.light,
  [Element.FIRE]: token.palette.orange.light,
  [Element.LIGHT]: token.palette.light.main,
  [Element.DARK]: token.palette.dark.main,
};
const rarityToColorMap = {
  [Rarity.Rare]: token.palette.rarity.rare.light,
  [Rarity.Epic]: token.palette.rarity.epic.light,
  [Rarity.Legendary]: token.palette.rarity.legendary.light,
  [Rarity.Common]: token.palette.rarity.common.light,
};

const chromaToColorMap = {
  [Chroma.WARRIOR]: token.palette.light.lightGrey,
  [Chroma.ELITE]: token.palette.light.lightGrey,
  [Chroma.MYTHIC]: token.palette.light.lightGrey,
  [Chroma.NORMAL]: token.palette.light.lightGrey,
};

const PetType = {
  HUNTERS: "hunters",
  SCOUTS: "scouts",
  WORKERS: "workers",
};

const getRarityIconId = rarity => {
  switch (rarity) {
    case Rarity.Rare:
      return "icon-rare";
    case Rarity.Epic:
      return "icon-epic";
    case Rarity.Legendary:
      return "icon-legendary";
    default:
      return "icon-common";
  }
};

const getPetTypeIconId = petType => {
  switch (petType && petType.toLowerCase()) {
    case PetType.WORKERS:
      return "icon-workers";
    case PetType.SCOUTS:
      return "icon-scouts";
    case PetType.HUNTERS:
      return "icon-hunters";
    default:
      return "";
  }
};
const getFactionIconId = faction => {
  switch (faction) {
    case Faction.HORDE:
      return "icon-horde";
    case Faction.EMPIRE:
      return "icon-empire";
    case Faction.GLADE:
      return "icon-glade";
    default:
      return "";
  }
};
const getElementIconId = element => {
  switch (element) {
    case Element.EARTH:
      return "icon-earth";
    case Element.DARK:
      return "icon-dark";
    case Element.FIRE:
      return "icon-fire";
    case Element.LIGHT:
      return "icon-light";
    case Element.WATER:
      return "icon-water";
    default:
      return "";
  }
};

const petTypeToColorMap = {
  [PetType.HUNTERS]: token.palette.blue.dark,
  [PetType.SCOUTS]: token.palette.blue.dark,
  [PetType.WORKERS]: token.palette.blue.dark,
};

const factionToColorMap = {
  [Faction.HORDE]: token.palette.blue.epic,
  [Faction.EMPIRE]: token.palette.blue.light,
  [Faction.GLADE]: token.palette.orange.mainWithLightOpacity,
};

function isHero(product) {
  return [Product.RareHeroPack, Product.EpicHeroPack, Product.LegendaryHeroPack].includes(product);
}

function isPet(product) {
  return product === Product.PetPack;
}

function isToken(product) {
  return !isHero(product) && !isPet(product);
}

export {
  PetType,
  petTypeToColorMap,
  elementToColorMap,
  rarityToColorMap,
  factionToColorMap,
  chromaToEditionMap,
  chromaToColorMap,
  AssetCartId,
  TabId,
  rarityLabel,
  heroProducts,
  petProducts,
  otherProducts,
  Faction,
  factions,
  Type,
  types,
  Element,
  elements,
  chromas,
  SortType,
  Chroma,
  isHero,
  isToken,
  isPet,
  getRarityIconId,
  getElementIconId,
  getFactionIconId,
  getPetTypeIconId,
};
