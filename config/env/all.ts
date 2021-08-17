import toNumber from '../../app/lib/helpers/toNumber';
import tryRequire from '../../app/lib/helpers/tryRequire';
import { MilestoneConfig } from '../../app/domains/milestone';

const appTitle = 'gog-backend';

const nodeEnv = process.env.NODE_ENV || 'development';

const config = {
  port: process.env.PORT || 1340,
  mongo: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost/gog',
  mongoOptions: {
    poolSize: toNumber(process.env.MONGO_POOL_SIZE, 5),
    connectTimeoutMS: toNumber(process.env.MONGO_CONNECT_TIMEOUT, 30000),
    socketTimeoutMS: toNumber(process.env.MONGO_SOCKET_TIMEOUT, 30000),
    useUnifiedTopology: true,
    useFindAndModify: false,
  },

  environment: nodeEnv || (<any>global).FORCED_NODE_ENV,
  isMigration: false,
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test' || (<any>global).FORCED_NODE_ENV === 'test',

  app: {
    title: appTitle,
  },

  agenda: {
    processEvery: '2 seconds',
    fetchRawStocksEvery: '5 seconds',
    cleanUpCompletedJobsEvery: '60 seconds',
    scanBlocksSchedule: 'in 10 seconds',
  },

  logger: {
    suppressStdout: process.env.LOGGER_SUPPRESS_STDOUT,
    level: process.env.LOGGER_LEVEL || 'warn',
  },

  contracts: {
    GuildOfGuardiansPreSale: {
      abi: process.env.GUILD_OF_GUARDIANS_PRE_SALE_ABI
        ? JSON.parse(process.env.GUILD_OF_GUARDIANS_PRE_SALE_ABI)
        // eslint-disable-next-line global-require,import/no-dynamic-require
        : tryRequire(`config/contracts/${nodeEnv}/GuildOfGuardiansPreSale.abi`, ''),
      // eslint-disable-next-line global-require
      address: process.env.GUILD_OF_GUARDIANS_PRE_SALE_ADDRESS
        // eslint-disable-next-line global-require,import/no-dynamic-require
        || tryRequire(`config/contracts/${nodeEnv}/GuildOfGuardiansPreSale.address`, ''),
    },
    GuardiansToken: {
      abi: process.env.GUARDIANS_TOKEN_ABI
        ? JSON.parse(process.env.GUARDIANS_TOKEN_ABI)
        // eslint-disable-next-line global-require,import/no-dynamic-require
        : tryRequire(`config/contracts/${nodeEnv}/GuardiansToken.abi`, ''),
      // eslint-disable-next-line global-require
      address: process.env.GUARDIANS_TOKEN_ADDRESS
        // eslint-disable-next-line global-require,import/no-dynamic-require
        || tryRequire(`config/contracts/${nodeEnv}/GuardiansToken.address`, ''),
    },
  },
  systemPrivateKey: process.env.SYSTEM_PRIVATE_KEY
    // eslint-disable-next-line global-require,import/no-dynamic-require
    || tryRequire(`config/contracts/${nodeEnv}/system-pk`, ''),
  networkName: process.env.NETWORK_NAME || 'localhost',
  networkUrl: process.env.NETWORK_URL || 'http://127.0.0.1:8545/',

  blockScanningMaxBatchSize: 5000,
  blockScanningStartingNumber: 0,

  sentry: {
    dsn: process.env.SENTRY_DSN || 'https://6d5f5e554ee244239b9a9f2dc00b72ed@o762328.ingest.sentry.io/5793348',
  },

  milestones: <MilestoneConfig[]>[
    {
      sum: 200000,
      label: '200K',
      reward: 8000,
    },
    {
      sum: 500000,
      label: '500K',
      reward: 10000,
    },
    {
      sum: 1000000,
      label: '1M',
      reward: 15000,
    },
    {
      sum: 1750000,
      label: '1.75M',
      reward: 22000,
    },
    {
      sum: 3000000,
      label: '3M',
      reward: 35000,
    },
    {
      sum: 5000000,
      label: '5M',
      reward: 50000,
    },
    {
      sum: 7500000,
      label: '7.5M',
      reward: 60000,
    },
    {
      sum: 10000000,
      label: '10M',
      reward: 75000,
    },
  ],
  assetBaseUrl: process.env.ASSET_BASE_URL || 'https://gog-art-assets.s3-ap-southeast-2.amazonaws.com/',
};

export type Config = typeof config;

export default config;
