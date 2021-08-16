const { utils } = require("ethers");
const fs = require("fs");

require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

const { deploy, getAddress } = require("./utils");

const { isAddress, formatUnits, parseUnits } = utils;

/*
      📡 This is where you configure your deploy configuration for 🏗 scaffold-eth

      check out `packages/scripts/deploy.js` to customize your deployment

      out of the box it will auto deploy anything in the `contracts` folder and named *.sol
      plus it will use *.args for constructor args
*/

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "localhost";

function getMnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

const ropstenAccounts = process.env.ROPSTEN_PRIVATE_KEY
  ? [`0x${process.env.ROPSTEN_PRIVATE_KEY}`]
  : {
      mnemonic: getMnemonic(),
    };

const rinkebyAccounts = process.env.RINKEBY_PRIVATE_KEY
  ? [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
  : {
      mnemonic: getMnemonic(),
    };

const mainetAccounts = process.env.MAINNET_PRIVATE_KEY
  ? [`0x${process.env.MAINNET_PRIVATE_KEY}`]
  : {
      mnemonic: getMnemonic(),
    };

module.exports = {
  defaultNetwork,

  // set provider:
  // REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
  // (then your frontend will talk to your contracts on the live network!)
  // (you will need to restart the `yarn run start` dev server after editing the .env)

  gasReporter: {
    currency: "USD",
    gasPrice: 21,
    enabled: Boolean(process.env.REPORT_GAS),
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic: getMnemonic(),
      },
      forking: {
        url:
          "https://eth-mainnet.alchemyapi.io/v2/zv0oRn4eHHPHvkZjFEPZo6BpPJlOyLXL",
      },
    },
    hardhat: {
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    dev: {
      url: "http://3.106.140.29:8545",
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: rinkebyAccounts,
      usdEthPairAddress: "0x4f113e745f9280888f5CFF007b5965aF83d02832",
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: mainetAccounts,
      usdEthPairAddress: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: ropstenAccounts,
      usdEthPairAddress: "0x94b5f1e9f8794bd73d6157ff6df20ec9658586bb",
    },
    goerli: {
      url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    xdai: {
      url: "https://dai.poa.network",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
  },
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

const DEBUG = false;

function debug(text) {
  if (DEBUG) {
    console.log(text);
  }
}

async function getAddr(ethers, addr) {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts[addr] !== undefined) {
    return accounts[addr];
  }
  throw new Error(`Could not normalize address: ${addr}`);
}

function send(signer, txparams) {
  return signer.sendTransaction(txparams, (error, transactionHash) => {
    if (error) {
      debug(`Error: ${error}`);
    }
    debug(`transactionHash: ${transactionHash}`);
    // checkForReceipt(2, params, transactionHash, resolve)
  });
}

task("wallet", "Create a wallet (pk) link", async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();
  const privateKey = randomWallet._signingKey().privateKey;
  console.log("🔐 WALLET Generated as " + randomWallet.address + "");
  console.log("🔗 http://localhost:3000/pk#" + privateKey);
});

task("fundedwallet", "Create a wallet (pk) link and fund it with deployer?")
  .addOptionalParam(
    "amount",
    "Amount of ETH to send to wallet after generating"
  )
  .addOptionalParam("filename", "File name to write file in")
  .setAction(
    async ({ amount = "0.01", filename = "pk" }, { config, ethers }) => {
      const randomWallet = ethers.Wallet.createRandom();
      const privateKey = randomWallet._signingKey().privateKey;
      console.log(`🔐 WALLET Generated as ${randomWallet.address}`);

      let localDeployerMnemonic;
      try {
        localDeployerMnemonic = fs.readFileSync("./mnemonic.txt");
        localDeployerMnemonic = localDeployerMnemonic.toString().trim();
      } catch (e) {
        /* do nothing - this file isn't always there */
      }

      const tx = {
        to: randomWallet.address,
        value: ethers.utils.parseEther(amount),
      };

      // SEND USING LOCAL DEPLOYER MNEMONIC IF THERE IS ONE
      // IF NOT SEND USING LOCAL HARDHAT NODE:
      if (localDeployerMnemonic) {
        let deployerWallet = ethers.Wallet.fromMnemonic(localDeployerMnemonic);
        deployerWallet = deployerWallet.connect(ethers.provider);
        console.log(
          "💵 Sending " +
            amount +
            " ETH to " +
            randomWallet.address +
            " using deployer account"
        );
        await deployerWallet.sendTransaction(tx);
      } else {
        console.log(
          `💵 Sending ${amount} ETH to ${randomWallet.address} using local node`
        );
        await send(ethers.provider.getSigner(), tx);
      }
      fs.writeFileSync(
        `${config.paths.artifacts}/${filename}.js`,
        `module.exports = "${privateKey}";\n`
      );
    }
  );

task("generate", "Create a mnemonic for builder deploys", async () => {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  const bip39 = require("bip39");
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  const hdkey = require("ethereumjs-wallet/hdkey");
  const mnemonic = bip39.generateMnemonic();
  if (DEBUG) console.log("mnemonic", mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log("seed", seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const walletHdpath = "m/44'/60'/0'/0/";
  const accountIndex = 0;
  const fullPath = walletHdpath + accountIndex;
  if (DEBUG) console.log("fullPath", fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = "0x" + wallet._privKey.toString("hex");
  if (DEBUG) console.log("privateKey", privateKey);
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  const EthUtil = require("ethereumjs-util");
  const address =
    "0x" + EthUtil.privateToAddress(wallet._privKey).toString("hex");
  console.log(
    "🔐 Account Generated as " +
      address +
      " and set as mnemonic in packages/hardhat"
  );
  console.log(
    "💬 Use 'yarn run account' to get more information about the deployment account."
  );
  fs.writeFileSync("./" + address + ".txt", mnemonic.toString());
  fs.writeFileSync("./mnemonic.txt", mnemonic.toString());
});

task("updateUsdEthRate", "Updated usdEthPair contract")
  .addParam("reserveUsd", "reserveUsd")
  .addParam("reserveEth", "reserveEth")
  .addOptionalParam("contractAddress", "Contract address")
  .setAction(async (taskArgs, hre) => {
    console.log(
      `Updating usdToEthPair with reserveUsd=${taskArgs.reserveUsd} and reserveEth=${taskArgs.reserveEth}`
    );
    const uniswapV2PairTestableContract = await deploy(
      hre,
      "UniswapV2PairTestable",
      [taskArgs.reserveUsd, taskArgs.reserveEth]
    );
    const usdEthPairAddress = uniswapV2PairTestableContract.address;
    const guildOfGuardiansPreSaleAddress =
      taskArgs.contractAddress || getAddress(hre, "GuildOfGuardiansPreSale");

    const wallet = hre.ethers.getSigners()[0];
    const guildOfGuardiansPreSaleContract = await hre.ethers.getContractAt(
      "GuildOfGuardiansPreSale",
      guildOfGuardiansPreSaleAddress,
      wallet
    );
    await guildOfGuardiansPreSaleContract.updateUsdToEthPair(usdEthPairAddress);

    console.log(`Updated usdToEthPair to ${usdEthPairAddress}`);
  });

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach((account) => console.log(account));
});

task("blockNumber", "Prints the block number", async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(
      await getAddr(ethers, taskArgs.account)
    );
    console.log(formatUnits(balance, "ether"), "ETH");
  });

task("send", "Send ETH")
  .addParam("from", "From address or account index")
  .addOptionalParam("to", "To address or account index")
  .addOptionalParam("amount", "Amount to send in ether")
  .addOptionalParam("data", "Data included in transaction")
  .addOptionalParam("gasPrice", "Price you are willing to pay in gwei")
  .addOptionalParam("gasLimit", "Limit of how much gas to spend")

  .setAction(async (taskArgs, { network, ethers }) => {
    const from = await getAddr(ethers, taskArgs.from);
    debug(`Normalized from address: ${from}`);
    const fromSigner = await ethers.provider.getSigner(from);

    let to;
    if (taskArgs.to) {
      to = await getAddr(ethers, taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    const txRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: parseUnits(
        taskArgs.amount ? taskArgs.amount : "0",
        "ether"
      ).toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: parseUnits(
        taskArgs.gasPrice ? taskArgs.gasPrice : "1.001",
        "gwei"
      ).toHexString(),
      gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : 24000,
      chainId: network.config.chainId,
    };

    if (taskArgs.data !== undefined) {
      txRequest.data = taskArgs.data;
      debug(`Adding data to payload: ${txRequest.data}`);
    }
    debug(txRequest.gasPrice / 1000000000 + " gwei");
    debug(JSON.stringify(txRequest, null, 2));

    return send(fromSigner, txRequest);
  });
