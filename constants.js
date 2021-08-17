export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID || "5fab6982681549208c870313f28fd03b";

export const ETHERSCAN_KEY = "MPP68TAVE5UMYN1V1MVS266D3DAHP7RH6E";

export const IMX_LINK = process.env.NEXT_PUBLIC_IMX_LINK || "https://link.uat.x.immutable.com";

export const BLOCK_NATIVE_KEY = "6a5ab061-4863-476c-8a99-a7d8428b5bfc";

export const DEFAULT_POLL_TIME_BALANCE = 30000;
export const DEFAULT_POLL_TIME_PROVIDER = 30000;
export const DEFAULT_POLL_TIME_ALLOCATION_DECODER = 30000;
export const DEFAULT_POLL_TIME_ALLOCATION_ORDER_TX = 30000;
export const DEFAULT_POLL_TIME_RESOURCE = 30000;
export const DEFAULT_POLL_TIME_CONTRACT_READER = 30000;
export const DEFAULT_POLL_TIME_EXCHANGE_PRICE = 30000;
export const DEFAULT_POLL_TIME_GAS_PRICE = 30000;

export const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export const FEATURE_IS_COMING_SOON_MODE = process.env.NEXT_PUBLIC_FEATURE_IS_COMING_SOON_MODE === "1";
export const FEATURE_SHOW_PROMOTION_TOPBAR = process.env.NEXT_PUBLIC_FEATURE_SHOW_PROMOTION_TOPBAR === "1";
export const FEATURE_MINTING = process.env.NEXT_PUBLIC_FEATURE_MINTING === "1";

export const FEATURE_IMX_TRADING_ENABLED = process.env.NEXT_PUBLIC_FEATURE_IMX_TRADING_ENABLED === "1";
export const FEATURE_TOKENTROVE_TRADING_ENABLED = process.env.NEXT_PUBLIC_FEATURE_TOKENTROVE_TRADING_ENABLED === "1";

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1340";

export const sentryDsn =
  process.env.NEXT_PUBLIC_SENTRY_DSN || "https://6d5f5e554ee244239b9a9f2dc00b72ed@o762328.ingest.sentry.io/5793348";

export const FEATURE_ADD_WITHDRAW_BONUS = process.env.NEXT_PUBLIC_FEATURE_ADD_WITHDRAW_BONUS === "1";

export const PRICE_BUFFER = 1.075;
export const REFERRAL_DISCOUNT = 0.05;

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://localhost:8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  rinkeby: {
    name: "rinkeby",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `wss://rinkeby.infura.io/ws/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `wss://ropsten.infura.io/ws/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
};

export const Product = {
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

export const AssetCategory = {
  Hero: 0,
  Pet: 1,
  Token: 2,
};

export const Rarity = {
  Rare: 0,
  Epic: 1,
  Legendary: 2,
  Common: 3,
  NA: 4,
};

export const Chroma = {
  Normal: 0,
  Warrior: 1,
  Elite: 2,
  Mythic: 3,
};

export const TX_STATUS = {
  MINING: "MINING",
  PROCESSING: "PROCESSING",
  DONE: "DONE",
};

// OTHER are defaulted to 100, which doesn't need to be specified in props
export const CART_ASSETS_LIMIT = {
  LEGENDARY_HERO: 10,
  MYTHIC_GUILD: 1,
  LEGENDS_GUILD: 1,
  WARRIORS_GUILD: 5,
  ADVENTURERS_GUILD: 10,
};

export const gatewayUrl = "https://gog-art-assets.s3-ap-southeast-2.amazonaws.com/";
export const thumbnailRoot = gatewayUrl;

export const queryBlackList = ["address", "url"];
