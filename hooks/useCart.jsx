import React, { useCallback, useContext, useRef, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useRouter } from "next/router";
import { getNormalizedPrice } from "../helpers";
import { createTransactionInfo } from "../../helpers";
import { Product, TX_STATUS, REFERRAL_DISCOUNT, PRICE_BUFFER } from "../../constants";

const CartContext = React.createContext(null);

export function useCart() {
  return useContext(CartContext);
}

const getPrice = (stocks, product) => (stocks && stocks[product] ? stocks[product].usdPrice : -1);
const getFinalPrice = (stocks, product) => (stocks && stocks[product] ? stocks[product].lastUsdPrice : -1);

export function CartProvider({ children, gasPrice, price, setLatestTransaction, stocks, writeContracts }) {
  const rareHeroPackCost = getPrice(stocks, Product.RareHeroPack);
  const epicHeroPackCost = getPrice(stocks, Product.EpicHeroPack);
  const legendaryHeroPackCost = getPrice(stocks, Product.LegendaryHeroPack);
  const petPackCost = getPrice(stocks, Product.PetPack);
  const energyPackCost = getPrice(stocks, Product.EnergyToken);
  const basicGuildTokenCost = getPrice(stocks, Product.BasicGuildToken);
  const tier1GuildTokenCost = getPrice(stocks, Product.Tier1GuildToken);
  const tier2GuildTokenCost = getPrice(stocks, Product.Tier2GuildToken);
  const tier3GuildTokenCost = getPrice(stocks, Product.Tier3GuildToken);

  const rareHeroPackFinalCost = getFinalPrice(stocks, Product.RareHeroPack);
  const epicHeroPackFinalCost = getFinalPrice(stocks, Product.EpicHeroPack);
  const legendaryHeroPackFinalCost = getFinalPrice(stocks, Product.LegendaryHeroPack);
  const petPackFinalCost = getFinalPrice(stocks, Product.PetPack);
  const energyTokenFinalCost = getFinalPrice(stocks, Product.EnergyToken);
  const basicGuildTokenFinalCost = getFinalPrice(stocks, Product.BasicGuildToken);
  const tier1GuildTokenFinalCost = getFinalPrice(stocks, Product.Tier1GuildToken);
  const tier2GuildTokenFinalCost = getFinalPrice(stocks, Product.Tier2GuildToken);
  const tier3GuildTokenFinalCost = getFinalPrice(stocks, Product.Tier3GuildToken);

  const router = useRouter();
  const [cartOpened, setCartOpened] = useState(false);
  const prevTotalCount = useRef(0);

  const [numRareHeroPacks, setNumRareHeroPacks] = useState(0);
  const [numEpicHeroPacks, setNumEpicHeroPacks] = useState(0);
  const [numLegendaryHeroPacks, setNumLegendaryHeroPacks] = useState(0);
  const [numPetPacks, setNumPetPacks] = useState(0);
  const [numEnergyTokens, setNumEnergyTokens] = useState(0);
  const [numBasicGuildTokens, setNumBasicGuildTokens] = useState(0);
  const [numTier1GuildTokens, setNumTier1GuildTokens] = useState(0);
  const [numTier2GuildTokens, setNumTier2GuildTokens] = useState(0);
  const [numTier3GuildTokens, setNumTier3GuildTokens] = useState(0);
  const [txError, setTxError] = useState(false);

  const usdToEthRate = 1 / price;

  const getOrder = () => {
    const order = Array(9);
    order[0] = numRareHeroPacks;
    order[1] = numEpicHeroPacks;
    order[2] = numLegendaryHeroPacks;
    order[3] = numPetPacks;
    order[4] = numEnergyTokens;
    order[5] = numBasicGuildTokens;
    order[6] = numTier1GuildTokens;
    order[7] = numTier2GuildTokens;
    order[8] = numTier3GuildTokens;
    return order;
  };

  const resetCart = useCallback(() => {
    setNumRareHeroPacks(0);
    setNumEpicHeroPacks(0);
    setNumLegendaryHeroPacks(0);
    setNumPetPacks(0);
    setNumEnergyTokens(0);
    setNumBasicGuildTokens(0);
    setNumTier1GuildTokens(0);
    setNumTier2GuildTokens(0);
    setNumTier3GuildTokens(0);
  }, []);

  let orderSumBeforeDiscount;
  const totalPriceOrder = (order => {
    let sum = 0;
    sum += order[0] * rareHeroPackCost;
    sum += order[1] * epicHeroPackCost;
    sum += order[2] * legendaryHeroPackCost;
    sum += order[3] * petPackCost;
    sum += order[4] * energyPackCost;
    sum += order[5] * basicGuildTokenCost;
    sum += order[6] * tier1GuildTokenCost;
    sum += order[7] * tier2GuildTokenCost;
    sum += order[8] * tier3GuildTokenCost;
    return sum;
  })(getOrder());

  const referralDiscountRaw = (() => {
    if (router.query.refcode) {
      try {
        ethers.utils.getAddress(router.query.refcode);
        return totalPriceOrder * REFERRAL_DISCOUNT;
      } catch (e) {
        console.error(e.message);
      }
    }
    return 0;
  })();

  const originalPriceRaw = (order => {
    let sum = 0;
    sum += order[0] * rareHeroPackFinalCost;
    sum += order[1] * epicHeroPackFinalCost;
    sum += order[2] * legendaryHeroPackFinalCost;
    sum += order[3] * petPackFinalCost;
    sum += order[4] * energyTokenFinalCost;
    sum += order[5] * basicGuildTokenFinalCost;
    sum += order[6] * tier1GuildTokenFinalCost;
    sum += order[7] * tier2GuildTokenFinalCost;
    sum += order[8] * tier3GuildTokenFinalCost;
    return sum;
  })(getOrder());

  const orderCost = getNormalizedPrice(totalPriceOrder - referralDiscountRaw);
  const referralDiscount = getNormalizedPrice(referralDiscountRaw);
  const earlyBirdDiscount = getNormalizedPrice(originalPriceRaw - totalPriceOrder);
  const originalPrice = getNormalizedPrice(originalPriceRaw);

  const confirmPurchase = async () => {
    setTxError(false);

    try {
      const referrer = router.query.refcode
        ? ethers.utils.getAddress(router.query.refcode)
        : ethers.constants.AddressZero;
      const ethPrice = orderCost * usdToEthRate * PRICE_BUFFER;

      const tx = await writeContracts.GuildOfGuardiansPreSale.purchase(getOrder(), referrer, {
        gasPrice,
        value: ethers.utils.parseEther(ethPrice.toFixed(18)),
        gasLimit: BigNumber.from("200000"),
      });

      resetCart();

      localStorage.setItem(
        "lastTx",
        JSON.stringify({
          txHash: tx.hash,
          txData: null,
          timestamp: Date.now(),
        }),
      );

      setLatestTransaction(createTransactionInfo(TX_STATUS.MINING, null));
    } catch (err) {
      if (err.code === "INSUFFICIENT_FUNDS") {
        setTxError("Insufficient funds.");
      } else {
        setTxError("Unexpected error.");
      }
      console.error(err);
    }
  };

  const convertPriceUsdToEth = usdPrice => usdPrice * usdToEthRate;

  const totalCount =
    numRareHeroPacks +
    numEpicHeroPacks +
    numLegendaryHeroPacks +
    numPetPacks +
    numEnergyTokens +
    numBasicGuildTokens +
    numTier1GuildTokens +
    numTier2GuildTokens +
    numTier3GuildTokens;

  // Force closed when nothing inside
  if (totalCount === 0 && cartOpened) {
    setCartOpened(false);
  } else if (prevTotalCount.current === 0 && totalCount > 0) {
    setCartOpened(true);
  }
  prevTotalCount.current = totalCount;

  const cartContext = {
    numRareHeroPacks,
    setNumRareHeroPacks,
    numEpicHeroPacks,
    setNumEpicHeroPacks,
    numLegendaryHeroPacks,
    setNumLegendaryHeroPacks,
    numPetPacks,
    setNumPetPacks,
    numEnergyTokens,
    setNumEnergyTokens,
    numBasicGuildTokens,
    setNumBasicGuildTokens,
    numTier1GuildTokens,
    setNumTier1GuildTokens,
    numTier2GuildTokens,
    setNumTier2GuildTokens,
    numTier3GuildTokens,
    setNumTier3GuildTokens,
    rareHeroPackCost,
    rareHeroPackFinalCost,
    epicHeroPackCost,
    epicHeroPackFinalCost,
    legendaryHeroPackCost,
    legendaryHeroPackFinalCost,
    petPackCost,
    petPackFinalCost,
    energyPackCost,
    energyTokenFinalCost,
    basicGuildTokenCost,
    basicGuildTokenFinalCost,
    tier1GuildTokenCost,
    tier1GuildTokenFinalCost,
    tier2GuildTokenCost,
    tier2GuildTokenFinalCost,
    tier3GuildTokenCost,
    tier3GuildTokenFinalCost,
    getOrder,
    resetCart,
    confirmPurchase,
    orderCost,
    usdToEthRate,
    convertPriceUsdToEth,
    cartOpened,
    setCartOpened,
    totalCount,
    txError,
    orderSumBeforeDiscount,
    originalPrice,
    referralDiscount,
    earlyBirdDiscount,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}
