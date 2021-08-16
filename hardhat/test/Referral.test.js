const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { checkOneEventEmitted, contractName, loadFixture } = require("./utils");

const { provider } = waffle;

describe("Referral", function () {
  async function deployFixture([owner, other]) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    return { contract, owner, other };
  }

  describe("#referrerBonuses", () => {
    describe("initially", () => {
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
      });
      it("should be 0", async () => {
        expect(Number(await contract.referrerBonuses(other.address))).to.equal(
          0
        );
      });
    });
    describe("after changes", () => {
      const value = ethers.utils.parseEther("1");
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
        await contract.testingAddReferrerBonuses(other.address, value);
      });
      it("should be equal value we set", async () => {
        const newValue = await contract.referrerBonuses(other.address);
        return expect(newValue.eq(value)).to.be.true;
      });
    });
  });

  describe("#withdrawBonus", () => {
    const valueNum = 10;
    const value = ethers.utils.parseEther(`${valueNum}`);

    describe("when no ETH", () => {
      let contract;
      let referrer;
      before(async () => {
        ({ contract, owner: referrer } = await loadFixture(deployFixture));
        await contract.testingAddReferrerBonuses(referrer.address, value);
      });
      it("should be reverted", async () => {
        await expect(contract.withdrawBonus()).to.be.revertedWith(
          "Transfer failed"
        );
      });
    });

    describe("by referrer", () => {
      let contract;
      let referrer;
      let referrerBalanceBefore;
      let contractBalanceBefore;
      let transaction;
      before(async () => {
        ({ contract, owner: referrer } = await loadFixture(deployFixture));
        await contract.testingReceive({
          value,
        });
        await contract.testingAddReferrerBonuses(referrer.address, value);
        referrerBalanceBefore = await referrer.getBalance();
        contractBalanceBefore = await provider.getBalance(contract.address);
        transaction = await contract.withdrawBonus();
      });
      it("should increase referrer balance", async () => {
        const balance = await referrer.getBalance();
        return expect(balance.gt(referrerBalanceBefore)).to.be.true;
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
          "WithdrawBonus"
        );
        return (
          expect(event.args[0].eq(value)).to.be.true &&
          expect(event.args[1]).to.be.equal(referrer.address)
        );
      });
    });

    describe("by other", () => {
      let contract;
      let referrer;
      let other;
      before(async () => {
        ({ contract, owner: referrer, other } = await loadFixture(
          deployFixture
        ));
        await contract.testingReceive({
          value,
        });
        await contract.testingAddReferrerBonuses(referrer.address, value);
      });
      it("should be reverted", async () => {
        await expect(
          contract.connect(other).withdrawBonus()
        ).to.be.revertedWith("Nothing to withdraw");
      });
    });
  });
});
