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
  Empire: "Empire",
  Glade: "Glade",
  Horde: "Horde",
};
const factions = [Faction.Horde, Faction.Empire, Faction.Glade];

const HeroClass = {
  Melee: "Melee",
  Ranged: "Ranged",
  Mage: "Mage",
};
const classes = [HeroClass.Melee, HeroClass.Ranged, HeroClass.Mage];

const Element = {
  Water: "Water",
  Earth: "Earth",
  Fire: "Fire",
  Light: "Light",
  Dark: "Dark",
};
const elements = [Element.Water, Element.Earth, Element.Fire, Element.Light, Element.Dark];

const Chroma = {
  Normal: 0,
  Warrior: 1,
  Elite: 2,
  Mythic: 3,
};
const chromas = [Chroma.Normal, Chroma.Warrior, Chroma.Elite, Chroma.Mythic];
const chromaToEditionMap = {
  [Chroma.Warrior]: "Warrior",
  [Chroma.Elite]: "Elite",
  [Chroma.Mythic]: "Mythic",
  [Chroma.Normal]: "",
};

const rarityLabel = {
  [Rarity.Rare]: "Rare",
  [Rarity.Epic]: "Epic",
  [Rarity.Legendary]: "Legendary",
  [Rarity.Common]: "Common",
  [Rarity.NA]: "NA",
};

const SortType = {
  OLDEST_FIRST: "oldest",
  NEWEST_FIRST: "newest",
};

const TabId = {
  HEROES: "heroes",
  PETS: "pets",
  OTHER: "other",
};

const rarityToColorMap = {
  [Rarity.Rare]: token.palette.rarity.rare.light,
  [Rarity.Epic]: token.palette.rarity.epic.light,
  [Rarity.Legendary]: token.palette.rarity.legendary.light,
  [Rarity.Common]: token.palette.rarity.common.light,
};

const PetClass = {
  Hunters: "Hunters",
  Scouts: "Scouts",
  Workers: "Workers",
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

const getPetClassIconId = petClass => {
  switch (petClass) {
    case PetClass.Workers:
      return "icon-workers";
    case PetClass.Scouts:
      return "icon-scouts";
    case PetClass.Hunters:
      return "icon-hunters";
    default:
      return "";
  }
};
const getFactionIconId = faction => {
  switch (faction) {
    case Faction.Horde:
      return "icon-horde";
    case Faction.Empire:
      return "icon-empire";
    case Faction.Glade:
      return "icon-glade";
    default:
      return "";
  }
};
const getElementIconId = element => {
  switch (element) {
    case Element.Earth:
      return "icon-earth";
    case Element.Dark:
      return "icon-dark";
    case Element.Fire:
      return "icon-fire";
    case Element.Light:
      return "icon-light";
    case Element.Water:
      return "icon-water";
    default:
      return "";
  }
};

export {
  PetClass,
  rarityToColorMap,
  chromaToEditionMap,
  AssetCartId,
  TabId,
  rarityLabel,
  heroProducts,
  petProducts,
  otherProducts,
  Faction,
  factions,
  HeroClass,
  classes,
  Element,
  elements,
  chromas,
  SortType,
  Chroma,
  getRarityIconId,
  getElementIconId,
  getFactionIconId,
  getPetClassIconId,
};
