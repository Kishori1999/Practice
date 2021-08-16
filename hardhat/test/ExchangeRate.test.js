const { ethers } = require("hardhat");
const { expect } = require("chai");
const { exchangeContractName } = require("./utils");
const {
  contractName,
  checkOneEventEmitted,
  createByOtherTest,
  loadFixture,
} = require("./utils");

describe("ExchangeRate", function () {
  async function deployFixture([owner, other]) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    return { contract, owner, other };
  }
  async function exchangeDeployFixture() {
    const Contract = await ethers.getContractFactory(exchangeContractName);
    const contract = await Contract.deploy(1, 1);
    return { exchangeContract: contract };
  }

  describe("#usdEthPairAddress", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    it(`should return value`, async () =>
      expect(await contract.usdEthPairAddress()).not.to.be.undefined);
  });

  describe("#updateUsdToEthPair", () => {
    let exchangeContract;
    before(async () => {
      ({ exchangeContract } = await loadFixture(exchangeDeployFixture));
    });
    describe("by owner", () => {
      let contract;
      let transaction;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        transaction = await contract.updateUsdToEthPair(
          exchangeContract.address
        );
      });

      it(`should change usdEthPairAddress`, async () =>
        expect(await contract.usdEthPairAddress()).to.be.equal(
          exchangeContract.address
        ));

      it("should emit UpdateUsdToEthPair", async () => {
        const event = await checkOneEventEmitted(
          contract,
          transaction,
          "UpdateUsdToEthPair"
        );
        expect(event.args[0]).to.be.equal(exchangeContract.address);
      });
    });

    describe("by other user", () => {
      createByOtherTest(deployFixture, (contract) =>
        contract.updateUsdToEthPair(exchangeContract.address)
      );
    });
  });

  describe("#getWeiPrice", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    it(`should return USD/ETH rate from external contract`, async function () {
      expect(Number(await contract.getWeiPrice(100))).to.equal(47309155135812);
    });
  });
});
