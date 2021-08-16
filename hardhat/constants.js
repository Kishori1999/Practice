const Price = {
  FirstSale: 0,
  LastSale: 1,
};

const Product = {
  RareHeroPack: 0,
  EpicHeroPack: 1,
  LegendaryHeroPack: 2,
  PetPack: 3,
  EnergyToken: 4,
  BasicGuildToken: 5,
  Tier1GuildToken: 6,
  Tier2GuildToken: 7,
  Tier3GuildToken: 8,
};

const Rarity = {
  Rare: 0,
  Epic: 1,
  Legendary: 2,
  Common: 3,
  NA: 4,
};

const heroPacks = [
  Product.RareHeroPack,
  Product.EpicHeroPack,
  Product.LegendaryHeroPack,
];

module.exports = {
  Price,
  Product,
  Rarity,
  heroPacks,
};
