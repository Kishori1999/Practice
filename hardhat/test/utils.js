const { expect } = require("chai");
const { waffle } = require("hardhat");

const { createFixtureLoader, provider } = waffle;

const contractName = "GuildOfGuardiansPreSaleTestable";
const exchangeContractName = "UniswapV2PairTestable";

const loadFixture = createFixtureLoader(provider.getWallets(), provider);

const createByOtherTest = (
  fixture,
  testingFn,
  revertReason = "Caller is not product owner"
) => {
  let contract;
  let other;
  before(async () => {
    ({ contract, other } = await loadFixture(fixture));
    if (!contract) {
      throw new Error("No contract in fixture provided");
    }
  });
  it("should be reverted", async () => {
    await expect(testingFn(contract.connect(other), other)).to.be.revertedWith(
      revertReason
    );
  });
};

const checkOneEventEmitted = async (contract, transaction, eventName) => {
  const receipt = await transaction.wait();
  const events = await contract.queryFilter(eventName, receipt.blockHash);
  expect(events).to.have.length(1);
  return events[0];
};

module.exports = {
  checkOneEventEmitted,
  contractName,
  createByOtherTest,
  exchangeContractName,
  loadFixture,
};
