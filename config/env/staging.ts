export default {
  mongo: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost/gog-staging',
  networkName: process.env.NETWORK_NAME || 'rinkeby',
  networkUrl: process.env.NETWORK_URL || 'https://rinkeby.infura.io/v3/2c6c9111e1db4daeaed49ef039a6261a',
};
