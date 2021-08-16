const _ = require("lodash");
const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { Price, Product, Rarity } = require("../constants");
const {
  checkOneEventEmitted,
  contractName,
  createByOtherTest: createByOtherTestOriginal,
  loadFixture,
} = require("./utils");

const { provider } = waffle;

const createOrder = (data = {}) => {
  const result = Array.from({ length: Object.keys(Product).length }).map(
    () => 0
  );
  Object.entries(data).forEach(([productId, amount]) => {
    result[productId] = amount;
  });
  return result;
};

const checkStockAvailable = async (contract, data = {}) => {
  const comparingResult = await Promise.all(
    Object.values(Product).map(
      async (productId) =>
        Number(await contract.stockAvailable(productId)) ===
        Number(await contract.originalStock(productId)) - (data[productId] || 0)
    )
  );

  return comparingResult.every((result) => result);
};

const firstChromaChance = 1200;
const secondChromaChance = 200;
const rareToEpicUpgradeChance = 400;
const rareToLegendaryUpgradeChance = 100;
const epicToLegendaryUpgradeChance = 500;
const rareHeroMythicChance = 3;
const epicHeroMythicChance = 8;
const legendaryHeroMythicChance = 22;

const petRareChance = 2700;
const petEpicChance = 1000;
const petLegendaryChance = 300;

const referralDiscount = 500;
const referrerBonus = 500;

const fairBigNumber = 100;

const calcProbabilityValue = (probabilityRate) => {
  return (fairBigNumber * probabilityRate) / 10000;
};

describe("Inventory", function () {
  async function deployFixture([owner, other]) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    return { contract, owner, other };
  }

  const createByOtherTest = (testingFn, revertReason) =>
    createByOtherTestOriginal(deployFixture, testingFn, revertReason);

  describe("#originalStock", () => {
    const expectedStock = {
      [Product.RareHeroPack]: 100000,
      [Product.EpicHeroPack]: 20000,
      [Product.LegendaryHeroPack]: 4000,
      [Product.PetPack]: 10000,
      [Product.EnergyToken]: 1000,
      [Product.BasicGuildToken]: 500,
      [Product.Tier1GuildToken]: 250,
      [Product.Tier2GuildToken]: 50,
      [Product.Tier3GuildToken]: 10,
    };
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    Object.entries(expectedStock).forEach(([productId, expectedAmount]) => {
      it(`should return ${expectedAmount} for productId: ${productId}`, async function () {
        expect(Number(await contract.originalStock(productId))).to.equal(
          expectedAmount
        );
      });
    });
  });

  describe("#stockAvailable", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    Object.values(Product).forEach((productId) => {
      it(`should return amount equal to originalStock for productId: ${productId}`, async function () {
        expect(Number(await contract.stockAvailable(productId))).to.equal(
          Number(await contract.originalStock(productId))
        );
      });
    });
  });

  describe("#mythicOwner", () => {
    const targetProductId = Product.RareHeroPack;
    describe("initially", () => {
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
      });
      it("should be 0", async () => {
        expect(Number(await contract.mythicOwner(targetProductId))).to.equal(0);
      });
    });
    describe("after changes", () => {
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
        await contract.testingSetMythicOwner(targetProductId, other.address);
      });
      it("should be other's address", async () => {
        expect(await contract.mythicOwner(targetProductId)).to.equal(
          other.address
        );
      });
    });
  });

  describe("#stockFixed", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    describe("initially", () => {
      it("should be false", async () =>
        expect(await contract.stockFixed()).to.be.false);
    });
    describe("after change to true", () => {
      before(async () => {
        await contract.testingSetStockFixed(true);
      });
      it("should be true", async () =>
        expect(await contract.stockFixed()).to.be.true);
    });
  });

  describe("#productPrices", () => {
    const productPrices = {
      [Product.RareHeroPack]: {
        [Price.FirstSale]: 1000,
        [Price.LastSale]: 1250,
      },
      [Product.EpicHeroPack]: {
        [Price.FirstSale]: 4400,
        [Price.LastSale]: 5500,
      },
      [Product.LegendaryHeroPack]: {
        [Price.FirstSale]: 20000,
        [Price.LastSale]: 25000,
      },
      [Product.PetPack]: {
        [Price.FirstSale]: 6000,
        [Price.LastSale]: 7500,
      },
      [Product.EnergyToken]: {
        [Price.FirstSale]: 12000,
        [Price.LastSale]: 15000,
      },
      [Product.BasicGuildToken]: {
        [Price.FirstSale]: 16000,
        [Price.LastSale]: 20000,
      },
      [Product.Tier1GuildToken]: {
        [Price.FirstSale]: 320000,
        [Price.LastSale]: 400000,
      },
      [Product.Tier2GuildToken]: {
        [Price.FirstSale]: 1600000,
        [Price.LastSale]: 2000000,
      },
      [Product.Tier3GuildToken]: {
        [Price.FirstSale]: 8000000,
        [Price.LastSale]: 10000000,
      },
    };
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    Object.entries(productPrices).forEach(([productId, priceData]) => {
      Object.entries(priceData).forEach(([priceId, expectedPrice]) => {
        it(`should return ${expectedPrice} for productId: ${productId} and priceId: ${priceId}`, async function () {
          expect(
            Number(await contract.productPrices(productId, priceId))
          ).to.equal(expectedPrice);
        });
      });
    });
  });

  describe("#getProductCostUsd", () => {
    const restZero = Product.RareHeroPack;
    const slightlySoldProductId = Product.EnergyToken;
    const fullProductId = Product.LegendaryHeroPack;
    // TODO: Update
    const deployAndSetStockAvailable = async (...params) => {
      const { contract, owner, other } = await deployFixture(...params);
      await contract.testingSetStockAvailable(restZero, 0);
      await contract.testingSetStockAvailable(slightlySoldProductId, 750);
      return { contract, owner, other };
    };
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployAndSetStockAvailable));
    });
    it("should return FirstSale price if no sales of product", async () => {
      expect(Number(await contract.getProductCostUsd(fullProductId))).to.equal(
        Number(await contract.productPrices(fullProductId, Price.FirstSale))
      );
    });
    it("should return LastSale price if no rest of product", async () => {
      expect(Number(await contract.getProductCostUsd(restZero))).to.equal(
        Number(await contract.productPrices(restZero, Price.LastSale))
      );
    });
    it("should return calculated value", async () => {
      expect(
        Number(await contract.getProductCostUsd(slightlySoldProductId))
      ).to.equal(12750);
    });
  });

  describe("#getProductCostWei", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    it("should return right value", async () => {
      expect(
        Number(await contract.getProductCostWei(Product.RareHeroPack))
      ).to.equal(473091551358124);
    });
  });

  describe("#calcOrderCostUsd", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    describe("with 2 products ordered", () => {
      const product1Id = Product.BasicGuildToken;
      const amount1 = 3;
      const product2Id = Product.EpicHeroPack;
      const amount2 = 4;
      it("should return right value", async () => {
        expect(
          Number(
            await contract.calcOrderCostUsd(
              createOrder({ [product1Id]: amount1, [product2Id]: amount2 })
            )
          )
        ).to.equal(65600);
      });
    });
    describe("when empty array", () => {
      it("should revert", async () => {
        await expect(contract.calcOrderCostUsd([])).to.be.revertedWith(
          "Unexpected number of orderlines"
        );
      });
    });
    describe("when too many orderlines", () => {
      it("should revert", async () => {
        await expect(
          contract.calcOrderCostUsd([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
        ).to.be.revertedWith("Unexpected number of orderlines");
      });
    });
    describe("when too few orderlines", () => {
      it("should revert", async () => {
        await expect(
          contract.calcOrderCostUsd([1, 1, 1, 1, 1, 1, 1, 1])
        ).to.be.revertedWith("Unexpected number of orderlines");
      });
    });
    describe("when all zeros", () => {
      it("should return 0", async () => {
        expect(Number(await contract.calcOrderCostUsd(createOrder()))).to.equal(
          0
        );
      });
    });
  });

  describe("#calcOrderCostWei", () => {
    let contract;
    before(async () => {
      ({ contract } = await loadFixture(deployFixture));
    });
    describe("with 2 products ordered", () => {
      const product1Id = Product.BasicGuildToken;
      const amount1 = 3;
      const product2Id = Product.EpicHeroPack;
      const amount2 = 4;
      it("should return right value", async () => {
        expect(
          Number(
            await contract.calcOrderCostWei(
              createOrder({ [product1Id]: amount1, [product2Id]: amount2 })
            )
          )
        ).to.equal(31034805769092936);
      });
    });
  });

  describe("#purchase", () => {
    const value = ethers.utils.parseEther("100");
    describe("with empty order", () => {
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
      });
      it("should be reverted", async () => {
        await expect(
          contract.purchase([], ethers.constants.AddressZero, {
            value,
          })
        ).to.be.revertedWith("revert");
      });
    });

    describe("with all zeros in order", () => {
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        const order = createOrder();
        await contract.purchase(order, ethers.constants.AddressZero, {
          value,
        });
      });
      it("should not change stockAvailable", async () =>
        expect(await checkStockAvailable(contract)).to.be.true);
    });

    describe("when order is over limit", () => {
      const purchaseData = {
        [Product.BasicGuildToken]: 101,
      };
      const order = createOrder(purchaseData);
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
      });
      it("should be reverted", async () => {
        await expect(
          contract.purchase(order, ethers.constants.AddressZero, {
            value,
          })
        ).to.be.revertedWith("Max limit 100 per item");
      });
    });

    describe("with one item order", () => {
      const purchaseData = { [Product.BasicGuildToken]: 1 };
      const order = createOrder(purchaseData);
      describe("when enough eth sent", () => {
        let contract;
        let owner;
        let userBalanceBefore;
        let contractBalanceBefore;
        let transaction;
        let orderCostWei;
        let orderCostUsd;
        before(async () => {
          ({ contract, owner } = await loadFixture(deployFixture));
          userBalanceBefore = await owner.getBalance();
          contractBalanceBefore = await provider.getBalance(contract.address);
          orderCostWei = await contract.calcOrderCostWei(order);
          orderCostUsd = await contract.calcOrderCostUsd(order);
          transaction = await contract.purchase(
            order,
            ethers.constants.AddressZero,
            {
              value,
            }
          );
        });
        it("should change stockAvailable", async () => {
          return expect(await checkStockAvailable(contract, purchaseData)).to.be
            .true;
        });
        it("should emit AllocateOrder with order", async () => {
          const receipt = await transaction.wait();
          const allocateOrderEvents = await contract.queryFilter(
            "AllocateOrder",
            receipt.blockHash
          );
          expect(allocateOrderEvents).to.have.length(1);
          expect(allocateOrderEvents[0].args._allocatedOrder.order).to.eql(
            order
          );
          expect(
            ethers.BigNumber.isBigNumber(
              allocateOrderEvents[0].args._allocatedOrder.firstDiceRoll
            )
          ).to.be.equal(true);
          expect(allocateOrderEvents[0].args._owner).to.be.equal(owner.address);
          expect(allocateOrderEvents[0].args._orderPrice).to.be.equal(
            orderCostUsd
          );
        });
        it("should decrease user balance", async () => {
          const balance = await owner.getBalance();
          return expect(balance.lt(userBalanceBefore)).to.be.true;
        });
        it("should increase contract balance", async () => {
          const balance = await provider.getBalance(contract.address);
          expect(balance.sub(contractBalanceBefore)).to.be.equal(orderCostWei);
        });
      });
      describe("when not enough eth sent", () => {
        let contract;
        before(async () => {
          ({ contract } = await loadFixture(deployFixture));
        });
        it("should not change stockAvailable", async () => {
          await expect(
            contract.purchase(
              createOrder(purchaseData),
              ethers.constants.AddressZero
            )
          ).to.be.revertedWith("VM Exception while processing transaction");
          return expect(await checkStockAvailable(contract)).to.be.true;
        });
      });
    });
    describe("with several item order", () => {
      const purchaseData = {
        [Product.BasicGuildToken]: 1,
        [Product.EpicHeroPack]: 2,
        [Product.EnergyToken]: 3,
      };
      const order = createOrder(purchaseData);
      let contract;
      let owner;
      let orderCostUsd;
      let transaction;
      before(async () => {
        ({ contract, owner } = await loadFixture(deployFixture));
        orderCostUsd = await contract.calcOrderCostUsd(order);
        transaction = await contract.purchase(
          order,
          ethers.constants.AddressZero,
          { value }
        );
      });
      it("should change stockAvailable", async () => {
        return expect(await checkStockAvailable(contract, purchaseData)).to.be
          .true;
      });
      it("should emit AllocateOrder with order", async () => {
        const receipt = await transaction.wait();
        const allocateOrderEvents = await contract.queryFilter(
          "AllocateOrder",
          receipt.blockHash
        );
        expect(allocateOrderEvents).to.have.length(1);
        expect(allocateOrderEvents[0].args._allocatedOrder.order).to.eql(order);
        expect(
          ethers.BigNumber.isBigNumber(
            allocateOrderEvents[0].args._allocatedOrder.firstDiceRoll
          )
        ).to.be.equal(true);
        expect(allocateOrderEvents[0].args._owner).to.be.equal(owner.address);
        expect(allocateOrderEvents[0].args._orderPrice).to.be.equal(
          orderCostUsd
        );
      });
    });

    describe("with referrer", () => {
      const purchaseData = {
        [Product.BasicGuildToken]: 1,
        [Product.EpicHeroPack]: 2,
        [Product.EnergyToken]: 3,
      };
      const order = createOrder(purchaseData);

      let contract;
      let owner;
      let userBalanceBefore;
      let contractBalanceBefore;
      let transaction;
      let other;
      let orderCostWei;
      let orderCostUsd;
      let referrerBonusAmountWei;
      let referrerBonusAmountUsd;
      let referralDiscountAmountWei;
      let referralDiscountAmountUsd;
      before(async () => {
        ({ contract, other, owner } = await loadFixture(deployFixture));
        userBalanceBefore = await owner.getBalance();
        contractBalanceBefore = await provider.getBalance(contract.address);
        orderCostWei = await contract.calcOrderCostWei(order);
        orderCostUsd = await contract.calcOrderCostUsd(order);
        transaction = await contract.purchase(order, other.address, {
          value,
        });
        referrerBonusAmountWei = orderCostWei.mul(referrerBonus).div(10000);
        referrerBonusAmountUsd = orderCostUsd.mul(referrerBonus).div(10000);
        referralDiscountAmountWei = orderCostWei
          .mul(referralDiscount)
          .div(10000);
        referralDiscountAmountUsd = orderCostUsd
          .mul(referralDiscount)
          .div(10000);
      });
      it("should change stockAvailable", async () => {
        return expect(await checkStockAvailable(contract, purchaseData)).to.be
          .true;
      });
      it("should emit AllocateOrder with order", async () => {
        const receipt = await transaction.wait();
        const allocateOrderEvents = await contract.queryFilter(
          "AllocateOrder",
          receipt.blockHash
        );
        expect(allocateOrderEvents).to.have.length(1);
        expect(allocateOrderEvents[0].args._allocatedOrder.order).to.eql(order);
        expect(
          ethers.BigNumber.isBigNumber(
            allocateOrderEvents[0].args._allocatedOrder.firstDiceRoll
          )
        ).to.be.equal(true);
        expect(allocateOrderEvents[0].args._owner).to.be.equal(owner.address);
        expect(allocateOrderEvents[0].args._orderPrice).to.be.equal(
          orderCostUsd
            .sub(referralDiscountAmountUsd)
            .sub(referrerBonusAmountUsd)
        );
      });
      it("should decrease user balance", async () => {
        const balance = await owner.getBalance();
        return expect(balance.lt(userBalanceBefore)).to.be.true;
      });
      it("should increase contract balance", async () => {
        const balance = await provider.getBalance(contract.address);
        expect(balance.sub(contractBalanceBefore)).to.be.equal(
          orderCostWei.sub(referralDiscountAmountWei)
        );
      });
      it("should set referrerBonuses", async () =>
        expect(await contract.referrerBonuses(other.address)).to.be.equal(
          referrerBonusAmountWei
        ));
    });
  });

  describe("#giftPack", () => {
    const purchaseData = { [Product.BasicGuildToken]: 0 };
    const overLimitPurchaseData = {
      [Product.BasicGuildToken]: 101,
    };
    const order = createOrder(purchaseData);
    const overLimitOrder = createOrder(overLimitPurchaseData);

    describe("by owner", () => {
      let contract;
      let owner;
      let other;
      let transaction;
      before(async () => {
        ({ contract, other, owner } = await loadFixture(deployFixture));
        transaction = await contract
          .connect(owner)
          .giftPack(order, other.address);
      });
      it("should change stockAvailable", async () => {
        return expect(await checkStockAvailable(contract, purchaseData)).to.be
          .true;
      });
      it("should emit AllocateOrder with order", async () => {
        const receipt = await transaction.wait();
        const allocateOrderEvents = await contract.queryFilter(
          "AllocateOrder",
          receipt.blockHash
        );
        expect(allocateOrderEvents).to.have.length(1);
        expect(allocateOrderEvents[0].args._allocatedOrder.order).to.eql(order);
        expect(
          ethers.BigNumber.isBigNumber(
            allocateOrderEvents[0].args._allocatedOrder.firstDiceRoll
          )
        ).to.be.equal(true);
        expect(allocateOrderEvents[0].args._owner).to.be.equal(other.address);
        expect(allocateOrderEvents[0].args._orderPrice).to.be.equal(0);
      });
      it("should emit GiftOrder with giftRecipient", async () => {
        const receipt = await transaction.wait();
        const giftOrderEvents = await contract.queryFilter(
          "GiftOrder",
          receipt.blockHash
        );
        expect(giftOrderEvents).to.have.length(1);
        expect(giftOrderEvents[0].args[0]).to.equal(other.address);
      });
    });

    describe("when order is over limit", () => {
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
      });
      it("should be reverted", async () => {
        await expect(
          contract.giftPack(overLimitOrder, other.address)
        ).to.be.revertedWith("Max limit 100 per item");
      });
    });

    describe("by other user", () => {
      createByOtherTest((contract, sender) =>
        contract.giftPack(order, sender.address)
      );
    });
  });

  describe("#decodeAllocation", () => {
    const firstDiceRoll = 1111;
    const secondDiceRoll = 6890;
    const checkHeroPetTypeForRarity = (
      result,
      targetRarity,
      begin,
      end,
      delta
    ) => {
      const filteredResult = result.filter(
        ({ rarity }) => rarity === targetRarity
      );
      const countResult = _.countBy(
        filteredResult,
        ({ heroPetType }) => heroPetType
      );
      const expectedCount = filteredResult.length / (end - begin + 1);
      Object.entries(countResult).forEach(([heroPetType, count]) => {
        expect(parseInt(heroPetType, 10)).to.be.within(begin, end);
        expect(count).to.be.closeTo(expectedCount, delta);
      });
    };

    describe("when the same firstDiceRoll sent in different calls", () => {
      const purchaseData = {
        [Product.RareHeroPack]: 2,
        [Product.EpicHeroPack]: 2,
        [Product.LegendaryHeroPack]: 2,
        [Product.PetPack]: 2,
        [Product.EnergyToken]: 2,
        [Product.BasicGuildToken]: 2,
        [Product.Tier1GuildToken]: 2,
        [Product.Tier2GuildToken]: 2,
        [Product.Tier3GuildToken]: 2,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result1;
      let result2;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result1 = await contract.decodeAllocation(
          { firstDiceRoll, order },
          secondDiceRoll
        );
        result2 = await contract.decodeAllocation(
          { firstDiceRoll, order },
          secondDiceRoll
        );
      });
      it("should return equal results", () =>
        expect(result1).to.be.eql(result2));
    });
    describe("when different secondDiceRoll sent in different calls", () => {
      const secondDiceRoll1 = 6890;
      const secondDiceRoll2 = 6891;
      const purchaseData = {
        [Product.RareHeroPack]: 2,
        [Product.EpicHeroPack]: 2,
        [Product.LegendaryHeroPack]: 2,
        [Product.PetPack]: 2,
        [Product.EnergyToken]: 2,
        [Product.BasicGuildToken]: 2,
        [Product.Tier1GuildToken]: 2,
        [Product.Tier2GuildToken]: 2,
        [Product.Tier3GuildToken]: 2,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result1;
      let result2;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result1 = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll1
        );
        result2 = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll2
        );
      });
      it("should return different results", () =>
        expect(result1).not.to.be.eql(result2));
    });

    describe("when RareHeroPack", () => {
      const purchaseData = {
        [Product.RareHeroPack]: fairBigNumber,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll
        );
      });
      it(`should return ${fairBigNumber} items`, () => {
        expect(result).to.have.length(fairBigNumber);
      });
      it("all heroPetType for the same rarity should be with expected probabilities", () => {
        checkHeroPetTypeForRarity(result, Rarity.Rare, 20, 35, 7);
      });
      it("all heroPetType for Epic rarity should be with expected probabilities", () => {
        checkHeroPetTypeForRarity(result, Rarity.Epic, 9, 19, 2);
      });
      it("all heroPetType for Legendary rarity should be with expected probabilities", () => {
        checkHeroPetTypeForRarity(result, Rarity.Legendary, 1, 8, 1);
      });
      it("all chroma should be with expected probabilities", () => {
        const countResult = _.countBy(result, ({ chroma }) => chroma);
        expect(countResult[0]).closeTo(
          calcProbabilityValue(10000 - firstChromaChance - secondChromaChance),
          3
        );
        expect(countResult[1]).closeTo(
          calcProbabilityValue(firstChromaChance),
          2
        );
        expect(countResult[2]).closeTo(
          calcProbabilityValue(secondChromaChance),
          1
        );
      });
      it("all rarity should be with expected probabilities", () => {
        const countResult = _.countBy(result, ({ rarity }) => rarity);
        expect(countResult[Rarity.Rare]).closeTo(
          calcProbabilityValue(
            10000 - rareToEpicUpgradeChance - rareToLegendaryUpgradeChance
          ),
          4
        );
        expect(countResult[Rarity.Epic]).closeTo(
          calcProbabilityValue(rareToEpicUpgradeChance),
          3
        );
        expect(countResult[Rarity.Legendary]).closeTo(
          calcProbabilityValue(rareToLegendaryUpgradeChance),
          1
        );
      });
      it("all potentialMythic should be with expected probabilities", () => {
        const countResult = _.countBy(
          result,
          ({ potentialMythic }) => potentialMythic
        );
        expect(countResult.true || 0).closeTo(
          calcProbabilityValue(rareHeroMythicChance),
          1
        );
        expect(countResult.false).closeTo(
          calcProbabilityValue(10000 - rareHeroMythicChance),
          1
        );
      });
    });

    describe("when EpicHeroPack", () => {
      const purchaseData = {
        [Product.EpicHeroPack]: fairBigNumber,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll
        );
      });
      it(`should return ${fairBigNumber} items`, () => {
        expect(result).to.have.length(fairBigNumber);
      });
      it("all heroPetType for the same rarity should be with expected probabilities", () => {
        checkHeroPetTypeForRarity(result, Rarity.Epic, 9, 19, 7);
      });
      it("all heroPetType for Legendary rarity should be with expected probabilities", () => {
        checkHeroPetTypeForRarity(result, Rarity.Legendary, 1, 8, 2);
      });
      it("all chroma should be with expected probabilities", () => {
        const countResult = _.countBy(result, ({ chroma }) => chroma);
        expect(countResult[0]).closeTo(
          calcProbabilityValue(10000 - firstChromaChance - secondChromaChance),
          3
        );
        expect(countResult[1]).closeTo(
          calcProbabilityValue(firstChromaChance),
          2
        );
        expect(countResult[2]).closeTo(
          calcProbabilityValue(secondChromaChance),
          1
        );
      });
      it("all rarity should be with expected probabilities", () => {
        const countResult = _.countBy(result, ({ rarity }) => rarity);
        expect(countResult[Rarity.Epic]).closeTo(
          calcProbabilityValue(10000 - epicToLegendaryUpgradeChance),
          4
        );
        expect(countResult[Rarity.Legendary]).closeTo(
          calcProbabilityValue(epicToLegendaryUpgradeChance),
          2
        );
      });
      it("all potentialMythic should be with expected probabilities", () => {
        const countResult = _.countBy(
          result,
          ({ potentialMythic }) => potentialMythic
        );
        expect(countResult.true || 0).closeTo(
          calcProbabilityValue(epicHeroMythicChance),
          1
        );
        expect(countResult.false).closeTo(
          calcProbabilityValue(10000 - epicHeroMythicChance),
          1
        );
      });
    });

    describe("when LegendaryHeroPack", () => {
      const purchaseData = {
        [Product.LegendaryHeroPack]: fairBigNumber,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll
        );
      });
      it(`should return ${fairBigNumber} items`, () => {
        expect(result).to.have.length(fairBigNumber);
      });
      it("all heroPetType should be with expected probabilities", () => {
        const begin = 1;
        const end = 8;
        const countResult = _.countBy(result, ({ heroPetType }) => heroPetType);
        const expectedCount = fairBigNumber / (end - begin + 1);
        Object.entries(countResult).forEach(([heroPetType, count]) => {
          expect(parseInt(heroPetType, 10)).to.be.within(begin, end);
          expect(count).to.be.closeTo(expectedCount, 9);
        });
      });
      it("all chroma should be with expected probabilities", () => {
        const countResult = _.countBy(result, ({ chroma }) => chroma);
        expect(countResult[0]).closeTo(
          calcProbabilityValue(10000 - firstChromaChance - secondChromaChance),
          3
        );
        expect(countResult[1]).closeTo(
          calcProbabilityValue(firstChromaChance),
          2
        );
        expect(countResult[2]).closeTo(
          calcProbabilityValue(secondChromaChance),
          1
        );
      });
      it("all rarity should not change", () => {
        const countResult = _.countBy(result, ({ rarity }) => rarity);
        expect(countResult[Rarity.Legendary]).equal(fairBigNumber);
      });
      it("all potentialMythic should be with expected probabilities", () => {
        const countResult = _.countBy(
          result,
          ({ potentialMythic }) => potentialMythic
        );
        expect(countResult.true || 0).closeTo(
          calcProbabilityValue(legendaryHeroMythicChance),
          1
        );
        expect(countResult.false).closeTo(
          calcProbabilityValue(10000 - legendaryHeroMythicChance),
          1
        );
      });
    });

    describe("when PetPack", () => {
      const purchaseData = {
        [Product.PetPack]: fairBigNumber,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll
        );
      });
      it(`should return ${fairBigNumber} items`, () => {
        expect(result).to.have.length(fairBigNumber);
      });
      it("all heroPetType should be with expected probabilities", () => {
        const begin = 1;
        const end = 3;
        const countResult = _.countBy(result, ({ heroPetType }) => heroPetType);
        const expectedCount = fairBigNumber / (end - begin + 1);
        Object.entries(countResult).forEach(([heroPetType, count]) => {
          expect(parseInt(heroPetType, 10)).to.be.within(begin, end);
          expect(count).to.be.closeTo(expectedCount, 2);
        });
      });
      it("all chroma should be 0", () => {
        const countResult = _.countBy(result, ({ chroma }) => chroma);
        expect(countResult[0]).equal(fairBigNumber);
      });
      it("all rarity should be with expected probabilities", () => {
        const countResult = _.countBy(result, ({ rarity }) => rarity);
        expect(countResult[Rarity.Rare]).closeTo(
          calcProbabilityValue(petRareChance),
          14
        );
        expect(countResult[Rarity.Epic]).closeTo(
          calcProbabilityValue(petEpicChance),
          3
        );
        expect(countResult[Rarity.Legendary]).closeTo(
          calcProbabilityValue(petLegendaryChance),
          2
        );
        expect(countResult[Rarity.Common]).closeTo(
          calcProbabilityValue(
            10000 - petRareChance - petEpicChance - petLegendaryChance
          ),
          13
        );
      });
      it("all potentialMythic should be false", () => {
        const countResult = _.countBy(
          result,
          ({ potentialMythic }) => potentialMythic
        );
        expect(countResult.false).equal(fairBigNumber);
      });
    });

    const createTestForOthers = (testingProduct) => {
      const purchaseData = {
        [testingProduct]: 2,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result = await contract.decodeAllocation(
          {
            firstDiceRoll,
            order,
          },
          secondDiceRoll
        );
      });
      it("should return 2 items", () => {
        expect(result).to.have.length(2);
      });
      it("all fields should match constant template", () => {
        result.forEach(
          ({ product, rarity, heroPetType, chroma, potentialMythic }) => {
            expect(product).to.be.equal(product);
            expect(rarity).to.be.equal(Rarity.NA);
            expect(heroPetType).to.be.equal(0);
            expect(chroma).to.be.equal(0);
            expect(potentialMythic).to.be.equal(false);
          }
        );
      });
    };

    describe("when BasicGuildToken", () => {
      createTestForOthers(Product.BasicGuildToken);
    });

    describe("when Tier1GuildToken", () => {
      createTestForOthers(Product.Tier1GuildToken);
    });

    describe("when Tier2GuildToken", () => {
      createTestForOthers(Product.Tier2GuildToken);
    });

    describe("when Tier3GuildToken", () => {
      createTestForOthers(Product.Tier3GuildToken);
    });

    describe("when EnergyToken", () => {
      createTestForOthers(Product.EnergyToken);
    });
  });

  describe("#claimMythicForCustomer", () => {
    const defaultFirstDiceRoll = 1111;
    const regularSecondDiceRoll = 6890;
    // It was just found randomly, no math involved
    const mythicSecondDiceRoll = 2877;
    const purchaseData = {
      [Product.EpicHeroPack]: 1,
    };
    const order = createOrder(purchaseData);
    const createCheckMythicTest = (
      firstDiceRoll,
      secondDiceRoll,
      shouldEmit,
      claimTwice = false
    ) => {
      let contract;
      let other;
      let transaction;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
        if (claimTwice) {
          await contract.claimMythicForCustomer(
            { firstDiceRoll, order },
            0,
            other.address,
            secondDiceRoll
          );
        }
        transaction = await contract.claimMythicForCustomer(
          { firstDiceRoll, order },
          0,
          other.address,
          secondDiceRoll
        );
      });
      if (shouldEmit) {
        it("should emit ClaimMythic", async () => {
          const receipt = await transaction.wait();
          const claimMythicEvents = await contract.queryFilter(
            "ClaimMythic",
            receipt.blockHash
          );
          expect(claimMythicEvents).to.have.length(1);
          expect(Number(claimMythicEvents[0].args[0].firstDiceRoll)).to.equal(
            firstDiceRoll
          );
          expect(claimMythicEvents[0].args[0].order).to.eql(order);
          expect(claimMythicEvents[0].args[1]).to.equal(0);
          expect(claimMythicEvents[0].args[2]).to.equal(other.address);
        });
      }
    };
    describe("when no mythic", () => {
      createCheckMythicTest(defaultFirstDiceRoll, regularSecondDiceRoll, false);
    });
    describe("when mythic", () => {
      createCheckMythicTest(defaultFirstDiceRoll, mythicSecondDiceRoll, true);
    });
    describe("when already claimed", () => {
      createCheckMythicTest(
        defaultFirstDiceRoll,
        mythicSecondDiceRoll,
        false,
        true
      );
    });
    describe("by other user", () => {
      createByOtherTest(
        (contract, other) =>
          contract.claimMythicForCustomer(
            { firstDiceRoll: defaultFirstDiceRoll, order },
            0,
            other.address,
            regularSecondDiceRoll
          ),
        "Caller is not immutable"
      );
    });
  });

  describe("#confirmMythic", () => {
    const defaultFirstDiceRoll = 1111;
    const regularSecondDiceRoll = 6890;
    // It was just found randomly, no math involved
    const mythicSecondDiceRoll = 2877;
    const createCheckMythicTest = (
      firstDiceRoll,
      secondDiceRoll,
      expectedValue
    ) => {
      const purchaseData = {
        [Product.EpicHeroPack]: 1,
      };
      const order = createOrder(purchaseData);
      let contract;
      let result;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        result = await contract.confirmMythic(
          { firstDiceRoll, order },
          0,
          secondDiceRoll
        );
      });
      it(`should return ${expectedValue}`, () =>
        expect(result).to.be.equal(expectedValue));
    };
    describe("when no mythic", () => {
      createCheckMythicTest(defaultFirstDiceRoll, regularSecondDiceRoll, false);
    });
    describe("when mythic", () => {
      createCheckMythicTest(defaultFirstDiceRoll, mythicSecondDiceRoll, true);
    });
  });

  describe("#addStock", () => {
    const targetProductId = Product.EpicHeroPack;
    const order = createOrder({
      [targetProductId]: 1,
    });
    describe("by owner", () => {
      let contract;
      let originalStockBefore;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        await contract.testingSetStockAvailable(targetProductId, 0);
        originalStockBefore = Number(
          await contract.originalStock(targetProductId)
        );
        await contract.addStock(order);
      });

      it(`should change stockAvailable`, async () =>
        expect(
          Number(await contract.stockAvailable(targetProductId))
        ).to.be.equal(1));

      it(`should change originalStock`, async () =>
        expect(
          Number(await contract.originalStock(targetProductId)) -
            originalStockBefore
        ).to.be.equal(1));
    });

    describe("when stockFixed", () => {
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        await contract.testingSetStockFixed(true);
      });

      it("should be reverted", async () => {
        await expect(contract.addStock(order)).to.be.revertedWith(
          "No more stock can be added"
        );
      });
    });

    describe("by other user", () => {
      createByOtherTest((contract) =>
        contract.addStock(
          createOrder({
            [Product.EpicHeroPack]: 1,
          })
        )
      );
    });
  });

  describe("#addStockAndGift", () => {
    const targetProductId = Product.EpicHeroPack;
    const purchaseData = {
      [targetProductId]: 1,
    };
    const order = createOrder(purchaseData);
    const overLimitOrder = createOrder({
      [targetProductId]: 101,
    });

    describe("by owner", () => {
      let contract;
      let owner;
      let other;
      let transaction;
      let originalStockBefore;
      before(async () => {
        ({ contract, other, owner } = await loadFixture(deployFixture));
        await contract.testingSetStockAvailable(targetProductId, 0);
        originalStockBefore = Number(
          await contract.originalStock(targetProductId)
        );
        transaction = await contract
          .connect(owner)
          .addStockAndGift(order, other.address);
      });

      it(`should not change stockAvailable`, async () =>
        expect(
          Number(await contract.stockAvailable(targetProductId))
        ).to.be.equal(0));

      it(`should change originalStock`, async () =>
        expect(
          Number(await contract.originalStock(targetProductId)) -
            originalStockBefore
        ).to.be.equal(1));
      it("should emit AllocateOrder with order", async () => {
        const receipt = await transaction.wait();
        const allocateOrderEvents = await contract.queryFilter(
          "AllocateOrder",
          receipt.blockHash
        );
        expect(allocateOrderEvents).to.have.length(1);
        expect(allocateOrderEvents[0].args._allocatedOrder.order).to.eql(order);
        expect(
          ethers.BigNumber.isBigNumber(
            allocateOrderEvents[0].args._allocatedOrder.firstDiceRoll
          )
        ).to.be.equal(true);
        expect(allocateOrderEvents[0].args._owner).to.be.equal(other.address);
        expect(allocateOrderEvents[0].args._orderPrice).to.be.equal(0);
      });
      it("should emit GiftOrder with giftRecipient", async () => {
        const receipt = await transaction.wait();
        const giftOrderEvents = await contract.queryFilter(
          "GiftOrder",
          receipt.blockHash
        );
        expect(giftOrderEvents).to.have.length(1);
        expect(giftOrderEvents[0].args[0]).to.equal(other.address);
      });
    });

    describe("when order is over limit", () => {
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
      });
      it("should be reverted", async () => {
        await expect(
          contract.addStockAndGift(overLimitOrder, other.address)
        ).to.be.revertedWith("Max limit 100 per item");
      });
    });

    describe("when stockFixed", () => {
      let contract;
      let other;
      before(async () => {
        ({ contract, other } = await loadFixture(deployFixture));
        await contract.testingSetStockFixed(true);
      });

      it("should be reverted", async () => {
        await expect(
          contract.addStockAndGift(order, other.address)
        ).to.be.revertedWith("No more stock can be added");
      });
    });

    describe("by other user", () => {
      createByOtherTest((contract, sender) =>
        contract.addStockAndGift(order, sender.address)
      );
    });
  });

  describe("#permanentlyLockStock", () => {
    describe("by owner", () => {
      let contract;
      let transaction;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        transaction = await contract.permanentlyLockStock();
      });
      it("should be true", async () =>
        expect(await contract.stockFixed()).to.be.true);

      it("should emit PermanentlyLockStock", async () => {
        await checkOneEventEmitted(
          contract,
          transaction,
          "PermanentlyLockStock"
        );
      });
    });

    describe("when stockFixed", () => {
      let contract;
      before(async () => {
        ({ contract } = await loadFixture(deployFixture));
        await contract.testingSetStockFixed(true);
      });

      it("should be reverted", async () => {
        await expect(contract.permanentlyLockStock()).to.be.revertedWith(
          "Stock already locked"
        );
      });
    });

    describe("by other user", () => {
      createByOtherTest((contract) => contract.permanentlyLockStock());
    });
  });
});
