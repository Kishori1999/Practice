const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");

const { provider } = waffle;
const { checkOneEventEmitted, contractName, loadFixture } = require("./utils");

describe("Treasury", function () {
  async function deployFixture([owner, other]) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    return { contract, owner, other };
  }

  describe("#withdraw", () => {
    const valueNum = 10;
    const value = ethers.utils.parseEther(`${valueNum}`);

    describe("when no ETH", () => {
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
      });
      it("should be reverted", async () => {
        await expect(contract.withdraw(value)).to.be.revertedWith(
          "Transfer failed"
        );
      });
    });

    describe("by treasurer", () => {
      let contract;
      let treasurer;
      let treasurerBalanceBefore;
      let contractBalanceBefore;
      let transaction;
      before(async () => {
        ({ contract, owner: treasurer } = await loadFixture(deployFixture));
        await contract.testingReceive({
          value,
        });
        treasurerBalanceBefore = await treasurer.getBalance();
        contractBalanceBefore = await provider.getBalance(contract.address);
        transaction = await contract.withdraw(value);
      });
      it("should increase treasurer balance", async () => {
        const balance = await treasurer.getBalance();
        return expect(balance.gt(treasurerBalanceBefore)).to.be.true;
      });
      it("should decrease contract balance", async () => {
        const balance = await provider.getBalance(contract.address);
        expect(
          ethers.utils.formatEther(contractBalanceBefore.sub(balance))
        ).to.be.equal(ethers.utils.formatEther(value));
      });
      it("should emit Withdraw", async () => {
        const event = await checkOneEventEmitted(
          contract,
          transaction,
          "Withdraw"
        );
        return expect(event.args[0].eq(value)).to.be.true;
      });
    });

    describe("by other", () => {
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
        await contract.testingReceive({
          value,
        });
      });
      it("should be reverted", async () => {
        await expect(
          contract.connect(other).withdraw(value)
        ).to.be.revertedWith("Caller is not treasurer");
      });
    });
  });
});
