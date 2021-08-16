/* eslint no-use-before-define: "warn" */
const chalk = require("chalk");
const hre = require("hardhat");
const { utils } = require("ethers");
const { deploy } = require("../utils");

const { config, network, run } = hre;

const isLocalNetwork = network.name === "localhost";

const main = async () => {
  console.log("\n\n 📡 Deploying...\n");
  let {
    config: { usdEthPairAddress },
  } = network;
  const filename = "system-pk";
  if (isLocalNetwork) {
    console.log(
      " 💾  Creating system account: ",
      chalk.blue("packages/hardhat/artifacts/system-pk"),
      "\n\n"
    );
    await run("fundedwallet", { amount: "10", filename });
  }
  if (!usdEthPairAddress) {
    console.log("usdEthPairAddress not found, using UniswapV2PairTestable ...");
    const uniswapV2PairTestableContract = await deploy(
      hre,
      "UniswapV2PairTestable",
      ["58236923444502806606838391", "2755139645868413700552"]
    );
    usdEthPairAddress = uniswapV2PairTestableContract.address;
  }
  const guildOfGuardiansPreSale = await deploy(hre, "GuildOfGuardiansPreSale", [
    usdEthPairAddress,
  ]);
  await deploy(hre, "GuardiansToken");

  if (isLocalNetwork || process.env.SYSTEM_PRIVATE_KEY) {
    const systemPrivateKey =
      process.env.SYSTEM_PRIVATE_KEY ||
      // eslint-disable-next-line global-require,import/no-dynamic-require
      require(`${config.paths.artifacts}/${filename}.js`);
    const systemAddress = utils.computeAddress(systemPrivateKey);
    console.log(` 🔌  Adding system account: ${systemAddress}
`);
    await guildOfGuardiansPreSale.grantRole(
      utils.id("IMMUTABLE_SYSTEM_ROLE"),
      systemAddress
    );
  }

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
