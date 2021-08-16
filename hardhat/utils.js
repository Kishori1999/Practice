const fs = require("fs");
const chalk = require("chalk");
const { utils } = require("ethers");
const R = require("ramda");

function getContractMeta(hre, contractName) {
  try {
    const contractRaw = fs
      .readFileSync(
        `${hre.config.paths.artifacts}/contracts/${contractName}.sol/${contractName}.json`
      )
      .toString();
    return JSON.parse(contractRaw);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function abiEncodeArgs(deployed, contractArgs) {
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  return utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
}

async function deploy(hre, contractName, _args) {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractFactory = await hre.ethers.getContractFactory(contractName);
  const deployed = await contractFactory.deploy(...contractArgs);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(
    `${hre.config.paths.artifacts}/${contractName}.address`,
    deployed.address
  );

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(
    `${hre.config.paths.artifacts}/${contractName}.args`,
    encoded.slice(2)
  );

  return deployed;
}

function getAddress(hre, name) {
  return fs
    .readFileSync(`${hre.config.paths.artifacts}/${name}.address`)
    .toString();
}

module.exports = {
  abiEncodeArgs,
  deploy,
  getAddress,
  getContractMeta,
};
