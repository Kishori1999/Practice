const { ethers } = require("hardhat");
const { expect } = require("chai");
const { contractName, loadFixture } = require("./utils");

describe("Dice", function () {
  const maxRandom = 10000;

  async function deployFixture([owner, other]) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    return { contract, owner, other };
  }

  describe("#getFirstDiceRoll", () => {
    const seed = 11111;
    let contract;
    let result;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
      result = Number(await contract.getFirstDiceRoll(seed));
    });
    it(`should return value in range 0..${maxRandom - 1}`, () =>
      expect(result).to.be.within(0, maxRandom - 1));
  });

  describe("#getSecondDiceRoll", () => {
    const firstDiceRoll = 33333;
    const firstDiceRollBlock = 1;
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    it(`until two blocks have passed, should revert`, async () => {
      await expect(
        contract.getSecondDiceRoll(firstDiceRoll, firstDiceRollBlock)
      ).to.be.revertedWith("Called too early");
    });
    it(`after two blocks have passed, should return value in range 0..${
      maxRandom - 1
    }`, async () => {
      let rcp = await contract.testingMine();
      await rcp.wait();
      rcp = await contract.testingMine();
      await rcp.wait();
      rcp = await contract.testingMine();
      await rcp.wait();
      expect(
        Number(
          await contract.getSecondDiceRoll(firstDiceRoll, firstDiceRollBlock)
        )
      ).to.be.within(0, maxRandom - 1);
    });
    it(`after 256 blocks have passed, should revert with called too late`, async () => {
      let rcp = await contract.testingMine();
      await rcp.wait();
      for (let i = 0; i < 256; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        rcp = await contract.testingMine();
        // eslint-disable-next-line no-await-in-loop
        await rcp.wait();
      }
      await expect(
        contract.getSecondDiceRoll(firstDiceRoll, firstDiceRollBlock)
      ).to.be.revertedWith("Called too late");
    });
  });

  describe("#emitSecondDiceRoll", () => {
    const firstDiceRoll = 33333;
    const firstDiceRollBlock = 1;
    let contract;
    let transaction;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
      let rcp = await contract.testingMine();
      await rcp.wait();
      rcp = await contract.testingMine();
      await rcp.wait();
      rcp = await contract.testingMine();
      await rcp.wait();
      transaction = await contract.emitSecondDiceRoll(
        firstDiceRoll,
        firstDiceRollBlock
      );
    });
    it(`should emit SecondDiceRoll event with _secondDiceRoll in range 0..${
      maxRandom - 1
    }`, async () => {
      const receipt = await transaction.wait();
      const secondDiceRollEvents = await contract.queryFilter(
        "SecondDiceRoll",
        receipt.blockHash
      );
      expect(secondDiceRollEvents).to.have.length(1);
      expect(Number(secondDiceRollEvents[0].args._firstDiceRoll)).to.be.equal(
        firstDiceRoll
      );
      expect(Number(secondDiceRollEvents[0].args._commitBlock)).to.be.equal(
        firstDiceRollBlock
      );
      expect(Number(secondDiceRollEvents[0].args._secondDiceRoll)).to.be.within(
        0,
        maxRandom - 1
      );
    });
  });
});
