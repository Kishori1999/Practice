/* eslint no-use-before-define: "warn" */
const chalk = require("chalk");
const hre = require("hardhat");
const { deploy } = require("../utils");

const main = async () => {
  console.log("\n\n 📡 Deploying nft...\n");
  await deploy(hre, "GuildOfGuardiansSampleNFT");

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
