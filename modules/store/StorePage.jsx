import React from "react";
import styled from "styled-components";
import Image from "next/image";
import HeroBuySection from "./HeroBuySection";
import PetsAndEnergySection from "./PetsAndEnergySection";
import GuildSection from "./GuildSection";
import ShareSection from "./ShareSection";
import token, { devices } from "../../styles/token";
import SlideUpWhenVisible from "../../components/animations/SlideUpWhenVisible";

import CartBar from "../../components/CartBar";
import HeroSummons from "./HeroSummons";
import HeroBannerStore from "./HeroBannerStore";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../../constants";

const DarkFill = styled.div`
  position: relative;
  height: 14em;
  background: ${token.palette.dark.main};
`;

const Container = styled.div`
  position: relative;
`;

const BlackBottomLeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 25em;
  bottom: -2em;
  left: 0;
  pointer-events: none;
  @media ${devices.md} {
    bottom: 0;
    height: 30em;
  }
`;

const getAvailableAmount = (stocks, product) => (stocks && stocks[product] ? stocks[product].availableAmount : -1);
const getOriginalAmount = (stocks, product) => (stocks && stocks[product] ? stocks[product].originalAmount : -1);

const StorePage = ({ stocks, referralUrl }) => {
  const {
    numRareHeroPacks: rareHeroPackAmount,
    setNumRareHeroPacks: setRareHeroPackAmount,
    numLegendaryHeroPacks: legendaryHeroPackAmount,
    setNumLegendaryHeroPacks: setLegendaryHeroPackAmount,
    numEpicHeroPacks: epicHeroPackAmount,
    setNumEpicHeroPacks: setEpicHeroPackAmount,
    numPetPacks: petPackAmount,
    setNumPetPacks: setPetPackAmount,
    numEnergyTokens: energyTokenAmount,
    setNumEnergyTokens: setEnergyTokenAmount,
    numBasicGuildTokens: basicGuildTokenAmount,
    setNumBasicGuildTokens: setBasicGuildTokenAmount,
    numTier1GuildTokens: tier1GuildTokenAmount,
    setNumTier1GuildTokens: setTier1GuildTokenAmount,
    numTier2GuildTokens,
    setNumTier2GuildTokens,
    numTier3GuildTokens,
    setNumTier3GuildTokens: setTier3GuildTokenAmount,
    convertPriceUsdToEth,
    orderCost,
    confirmPurchase,
    rareHeroPackCost,
    rareHeroPackFinalCost,
    epicHeroPackCost,
    epicHeroPackFinalCost,
    legendaryHeroPackCost,
    legendaryHeroPackFinalCost,
    petPackCost,
    petPackFinalCost,
    energyPackCost: energyTokenCost,
    energyTokenFinalCost,
    basicGuildTokenCost,
    basicGuildTokenFinalCost,
    tier1GuildTokenCost,
    tier1GuildTokenFinalCost,
    tier2GuildTokenCost,
    tier2GuildTokenFinalCost,
    tier3GuildTokenCost,
    tier3GuildTokenFinalCost,
    cartOpened,
    txError,
    originalPrice,
    referralDiscount,
    earlyBirdDiscount,
  } = useCart();

  const rareHeroPackAvailableAmount = getAvailableAmount(stocks, Product.RareHeroPack);
  const rareHeroPackOriginalAmount = getOriginalAmount(stocks, Product.RareHeroPack);
  const epicHeroPackAvailableAmount = getAvailableAmount(stocks, Product.EpicHeroPack);
  const epicHeroPackOriginalAmount = getOriginalAmount(stocks, Product.EpicHeroPack);
  const legendaryHeroPackAvailableAmount = getAvailableAmount(stocks, Product.LegendaryHeroPack);
  const legendaryHeroPackOriginalAmount = getOriginalAmount(stocks, Product.LegendaryHeroPack);
  const petPackAvailableAmount = getAvailableAmount(stocks, Product.PetPack);
  const petPackOriginalAmount = getOriginalAmount(stocks, Product.PetPack);
  const energyTokenAvailableAmount = getAvailableAmount(stocks, Product.EnergyToken);
  const energyTokenOriginalAmount = getOriginalAmount(stocks, Product.EnergyToken);
  const basicGuildTokenAvailableAmount = getAvailableAmount(stocks, Product.BasicGuildToken);
  const basicGuildTokenOriginalAmount = getOriginalAmount(stocks, Product.BasicGuildToken);
  const tier1GuildTokenAvailableAmount = getAvailableAmount(stocks, Product.Tier1GuildToken);
  const tier1GuildTokenOriginalAmount = getOriginalAmount(stocks, Product.Tier1GuildToken);
  const tier2GuildTokenAvailableAmount = getAvailableAmount(stocks, Product.Tier2GuildToken);
  const tier2GuildTokenOriginalAmount = getOriginalAmount(stocks, Product.Tier2GuildToken);
  const tier3GuildTokenAvailableAmount = getAvailableAmount(stocks, Product.Tier3GuildToken);
  const tier3GuildTokenOriginalAmount = getOriginalAmount(stocks, Product.Tier3GuildToken);

  return (
    <Container>
      <HeroBannerStore />
      <HeroSummons />
      <HeroBuySection
        rareHeroPackAvailableAmount={rareHeroPackAvailableAmount}
        rareHeroPackOriginalAmount={rareHeroPackOriginalAmount}
        rareHeroPackCost={rareHeroPackCost}
        rareHeroPackFinalCost={rareHeroPackFinalCost}
        rareHeroPackAmount={rareHeroPackAmount}
        setRareHeroPackAmount={setRareHeroPackAmount}
        legendaryHeroPackAvailableAmount={legendaryHeroPackAvailableAmount}
        legendaryHeroPackOriginalAmount={legendaryHeroPackOriginalAmount}
        legendaryHeroPackCost={legendaryHeroPackCost}
        legendaryHeroPackFinalCost={legendaryHeroPackFinalCost}
        legendaryHeroPackAmount={legendaryHeroPackAmount}
        setLegendaryHeroPackAmount={setLegendaryHeroPackAmount}
        epicHeroPackAvailableAmount={epicHeroPackAvailableAmount}
        epicHeroPackOriginalAmount={epicHeroPackOriginalAmount}
        epicHeroPackCost={epicHeroPackCost}
        epicHeroPackFinalCost={epicHeroPackFinalCost}
        epicHeroPackAmount={epicHeroPackAmount}
        setEpicHeroPackAmount={setEpicHeroPackAmount}
      />
      <PetsAndEnergySection />
      <GuildSection
        petPackAvailableAmount={petPackAvailableAmount}
        petPackOriginalAmount={petPackOriginalAmount}
        petPackCost={petPackCost}
        petPackFinalCost={petPackFinalCost}
        petPackAmount={petPackAmount}
        setPetPackAmount={setPetPackAmount}
        energyTokenAvailableAmount={energyTokenAvailableAmount}
        energyTokenOriginalAmount={energyTokenOriginalAmount}
        energyTokenCost={energyTokenCost}
        energyTokenFinalCost={energyTokenFinalCost}
        energyTokenAmount={energyTokenAmount}
        setEnergyTokenAmount={setEnergyTokenAmount}
      />
      <DarkFill />
      <ShareSection
        basicGuildTokenAvailableAmount={basicGuildTokenAvailableAmount}
        basicGuildTokenOriginalAmount={basicGuildTokenOriginalAmount}
        basicGuildTokenCost={basicGuildTokenCost}
        basicGuildTokenFinalCost={basicGuildTokenFinalCost}
        basicGuildTokenAmount={basicGuildTokenAmount}
        setBasicGuildTokenAmount={setBasicGuildTokenAmount}
        tier1GuildTokenAvailableAmount={tier1GuildTokenAvailableAmount}
        tier1GuildTokenOriginalAmount={tier1GuildTokenOriginalAmount}
        tier1GuildTokenCost={tier1GuildTokenCost}
        tier1GuildTokenFinalCost={tier1GuildTokenFinalCost}
        tier1GuildTokenAmount={tier1GuildTokenAmount}
        setTier1GuildTokenAmount={setTier1GuildTokenAmount}
        tier2GuildTokenAvailableAmount={tier2GuildTokenAvailableAmount}
        tier2GuildTokenOriginalAmount={tier2GuildTokenOriginalAmount}
        tier2GuildTokenCost={tier2GuildTokenCost}
        tier2GuildTokenFinalCost={tier2GuildTokenFinalCost}
        tier2GuildTokenAmount={numTier2GuildTokens}
        setTier2GuildTokenAmount={setNumTier2GuildTokens}
        tier3GuildTokenAvailableAmount={tier3GuildTokenAvailableAmount}
        tier3GuildTokenOriginalAmount={tier3GuildTokenOriginalAmount}
        tier3GuildTokenCost={tier3GuildTokenCost}
        tier3GuildTokenFinalCost={tier3GuildTokenFinalCost}
        tier3GuildTokenAmount={numTier3GuildTokens}
        setTier3GuildTokenAmount={setTier3GuildTokenAmount}
        referralUrl={referralUrl}
      />

      <SlideUpWhenVisible>
        <BlackBottomLeftShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="bottom left"
            src="/imgs/shards/black-bottom-left-shards-footer.png"
            alt="shards"
          />
        </BlackBottomLeftShards>
      </SlideUpWhenVisible>
      <CartBar
        visible={cartOpened}
        totalPrice={orderCost}
        convertPriceUsdToEth={convertPriceUsdToEth}
        onConfirmOrder={() => confirmPurchase()}
        numRareHeroPacks={rareHeroPackAmount}
        setNumRareHeroPacks={setRareHeroPackAmount}
        numEpicHeroPacks={epicHeroPackAmount}
        setNumEpicHeroPacks={setEpicHeroPackAmount}
        numLegendaryHeroPacks={legendaryHeroPackAmount}
        setNumLegendaryHeroPacks={setLegendaryHeroPackAmount}
        numPetPacks={petPackAmount}
        setNumPetPacks={setPetPackAmount}
        numEnergyTokens={energyTokenAmount}
        setNumEnergyTokens={setEnergyTokenAmount}
        numBasicGuildTokens={basicGuildTokenAmount}
        setNumBasicGuildTokens={setBasicGuildTokenAmount}
        numTier1GuildTokens={tier1GuildTokenAmount}
        setNumTier1GuildTokens={setTier1GuildTokenAmount}
        numTier2GuildTokens={numTier2GuildTokens}
        setNumTier2GuildTokens={setNumTier2GuildTokens}
        numTier3GuildTokens={numTier3GuildTokens}
        setNumTier3GuildTokens={setTier3GuildTokenAmount}
        rareHeroPackCost={rareHeroPackCost}
        epicHeroPackCost={epicHeroPackCost}
        legendaryHeroPackCost={legendaryHeroPackCost}
        petPackCost={petPackCost}
        energyPackCost={energyTokenCost}
        basicGuildTokenCost={basicGuildTokenCost}
        tier1GuildTokenCost={tier1GuildTokenCost}
        tier2GuildTokenCost={tier2GuildTokenCost}
        tier3GuildTokenCost={tier3GuildTokenCost}
        txError={txError}
        rareHeroPackAvailableAmount={rareHeroPackAvailableAmount}
        legendaryHeroPackAvailableAmount={legendaryHeroPackAvailableAmount}
        epicHeroPackAvailableAmount={epicHeroPackAvailableAmount}
        petPackAvailableAmount={petPackAvailableAmount}
        energyTokenAvailableAmount={energyTokenAvailableAmount}
        basicGuildTokenAvailableAmount={basicGuildTokenAvailableAmount}
        tier1GuildTokenAvailableAmount={tier1GuildTokenAvailableAmount}
        tier2GuildTokenAvailableAmount={tier2GuildTokenAvailableAmount}
        tier3GuildTokenAvailableAmount={tier3GuildTokenAvailableAmount}
        originalPrice={originalPrice}
        referralDiscount={referralDiscount}
        earlyBirdDiscount={earlyBirdDiscount}
      />
    </Container>
  );
};

export default StorePage;
