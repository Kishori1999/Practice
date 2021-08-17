export default {
  mongo: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost/gog-production',
  networkName: process.env.NETWORK_NAME || 'mainnet',
  networkUrl: process.env.NETWORK_URL || 'https://mainnet.infura.io/v3/2c6c9111e1db4daeaed49ef039a6261a',
  // when the contract deployed
  blockScanningStartingNumber: 12457274,
};
