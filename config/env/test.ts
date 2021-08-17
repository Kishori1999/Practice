const config = {
  port: process.env.PORT || 1341,
  mongo: process.env.MONGO_URL || 'mongodb://localhost/gog-test',
  contracts: {
    GuildOfGuardiansPreSale: {
      abi: process.env.GUILD_OF_GUARDIANS_PRE_SALE_ABI
        ? JSON.parse(process.env.GUILD_OF_GUARDIANS_PRE_SALE_ABI)
        // eslint-disable-next-line global-require,import/no-dynamic-require
        : require('config/contracts/development/GuildOfGuardiansPreSale.abi'),
      // @ts-ignore
      address: global.FORCED_GUILD_OF_GUARDIANS_PRE_SALE_ADDRESS,
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  // @ts-ignore
  systemPrivateKey: global.FORCED_SYSTEM_PRIVATE_KEY,
};

export default config;
