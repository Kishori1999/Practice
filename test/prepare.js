'use strict';

require('../root-require');
const { ethers, getDefaultProvider, utils, Wallet } = require('ethers');
const prepare = require('mocha-prepare');

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

prepare(async (done) => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.warn('Forced NODE_ENV to test');
    global.FORCED_NODE_ENV = 'test';
  }

  // deploy contracts
  // eslint-disable-next-line global-require
  const usdEthPairAbi = require('config/contracts/development/UniswapV2PairTestable.abi');
  // eslint-disable-next-line global-require
  const usdEthPairBytecode = require('config/contracts/development/UniswapV2PairTestable.bytecode');
  // eslint-disable-next-line global-require
  const guildOfGuardiansPreSaleAbi = require('config/contracts/development/GuildOfGuardiansPreSale.abi');
  // eslint-disable-next-line global-require
  const guildOfGuardiansPreSaleBytecode = require('config/contracts/development/GuildOfGuardiansPreSale.bytecode');

  // It's taken from output of `chain`
  const privateKey = '0xd35590c698bd14fc4fb79ca4c2bb75130ddd6268ca83e5f8a1ceb15d3807d438';

  const wallet = new Wallet(privateKey)
    .connect(getDefaultProvider('http://localhost:8545'));

  const usdEthPairFactory = new ethers.ContractFactory(usdEthPairAbi, usdEthPairBytecode, wallet);
  const usdEthPair = await usdEthPairFactory.deploy(1, 1);
  const usdEthPairAddress = usdEthPair.address;

  const guildOfGuardiansPreSaleContractFactory = new ethers.ContractFactory(
    guildOfGuardiansPreSaleAbi,
    guildOfGuardiansPreSaleBytecode,
    wallet,
  );
  const guildOfGuardiansPreSale = await guildOfGuardiansPreSaleContractFactory.deploy(
    usdEthPairAddress,
  );
  await guildOfGuardiansPreSale.deployTransaction.wait();
  global.FORCED_SYSTEM_PRIVATE_KEY = privateKey;
  await guildOfGuardiansPreSale.grantRole(
    utils.id('IMMUTABLE_SYSTEM_ROLE'),
    wallet.address,
  );
  await guildOfGuardiansPreSale.addStock([
    65535,
    20000,
    4000,
    10000,
    1000,
    500,
    250,
    50,
    10,
  ]);
  global.FORCED_GUILD_OF_GUARDIANS_PRE_SALE_ADDRESS = guildOfGuardiansPreSale.address;

  global.guildOfGuardiansPreSaleConnected = guildOfGuardiansPreSale.connect(wallet);
  global.wallet = wallet;

  // eslint-disable-next-line global-require
  const server = require('server');
  await server();

  done();
});
