import React from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { CallButtonStyles } from "./ActionCallButton";
import token, { devices } from "../styles/token";
import ClipBorder from "./ClipBorder";
import CartItem from "./CartItem";
import { Product, CART_ASSETS_LIMIT, PRICE_BUFFER } from "../../constants";
import { formatEth, formatUsdPrice } from "../helpers";
import { useWeb3Modal } from "../hooks/useWeb3Modal";
import { showTopBar } from "../../helpers/showTopBar";

const CartContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  font-size: ${token.fontSizes.big};
  justify-content: flex-start;
  padding: 0.5em;
  overflow-y: auto;
  flex-grow: 3;
`;

const PricesWrapper = styled.div`
  box-sizing: border-box;
  padding: 1.25em 1.5em;
  background-color: ${token.palette.green.semidark};
`;

const variantsTransactionBar = {
  hidden: {
    opacity: 0,
    translateX: "100%",
  },
  visible: {
    opacity: 1,
    translateX: "0em",
    transition: {
      duration: 0.3,
    },
  },
};

const CartBarContainer = styled(motion.div)`
  display: flex;
  position: fixed;
  height: calc(100% - ${token.header.height} - ${({ hasTopBar }) => (hasTopBar ? "50px" : 0)});
  flex-flow: column nowrap;
  justify-content: stretch;
  top: ${({ hasTopBar }) => (hasTopBar ? "105px" : token.header.height)};
  bottom: 0;
  right: 0;
  box-shadow: -1px 0 30px rgba(0, 0, 0, 0.2);
  z-index: 400;
  margin: 0 auto;
  background: ${token.palette.dark.main};
  color: ${token.palette.light.main};
  overflow: hidden;
  min-width: 25em;
  padding-top: 4em;
  width: 100%;
  max-width: 100%;

  @media ${devices.md} {
    padding-top: 0;
    width: auto;
    top: ${({ hasTopBar }) => (hasTopBar ? "103px" : token.header.height)};
    height: calc(100% - ${token.header.height} - ${({ hasTopBar }) => (hasTopBar ? "35px" : "0px")});
  }

  @media ${devices.xl} {
    top: ${({ hasTopBar }) => (hasTopBar ? "103px" : token.header.heightXl)};
    height: calc(100% - ${token.header.heightXl} - ${({ hasTopBar }) => (hasTopBar ? "35px" : "0px")});
  }

  @media ${devices.xxxl} {
    top: ${({ hasTopBar }) => (hasTopBar ? "124px" : token.header.heightXXl)};
    height: calc(100% - ${token.header.heightXXl} - ${({ hasTopBar }) => (hasTopBar ? "35px" : "0px")});
  }

  @media ${token.store.cartBarBreak} {
    flex-flow: column nowrap;
    align-items: stretch;
    justify-items: center;
  }
`;

const TotalPrice = styled.div`
  font-size: 2.325rem;
  line-height: 1em;
  font-weight: 700;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 0.75rem;
`;

const CallButton = styled.button`
  ${CallButtonStyles};

  position: relative;
  padding: 1.5em 2.3em;
  width: 100%;
  max-width: 100%;

  @media ${token.store.cartBarBreak} {
    padding: 1em 2.3em;
  }
`;

const NotMobile = styled.div`
  display: none;

  @media ${token.store.cartBarBreak} {
    display: block;
  }
`;

const TransactionErrorMessage = styled.div`
  position: relative;
  padding: 1.5em 2.3em;
  width: 100%;
  max-width: 100%;
  font-size: ${token.fontSizes.accented};
  color: red;
`;

const PriceRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  font-size: 1em;
  line-height: 1.8em;
`;

const PriceRowIndented = styled(PriceRow)`
  margin-top: 1.25rem;
`;

const PriceLabelCol = styled.div`
  margin-right: 1rem;
`;

const PriceLabelSmallCol = styled(PriceLabelCol)`
  font-size: 0.725em;
`;

const PriceAmountCol = styled.div`
  text-align: right;
  font-weight: 600;
`;

const DiscountAmountCol = styled(PriceAmountCol)`
  color: ${token.palette.orange.main};
`;

const EthereumAmountCol = styled(PriceAmountCol)`
  font-size: 1.125em;
  font-weight: 400;
`;

const ConfirmOrderButton = ({ children, ...props }) => {
  return (
    <CallButton {...props}>
      {children}
      <NotMobile>
        <ClipBorder />
      </NotMobile>
    </CallButton>
  );
};

const CartBar = ({
  className,
  visible,
  totalPrice,
  convertPriceUsdToEth,
  onConfirmOrder,
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
  rareHeroPackAvailableAmount,
  epicHeroPackCost,
  epicHeroPackAvailableAmount,
  legendaryHeroPackCost,
  legendaryHeroPackAvailableAmount,
  petPackCost,
  petPackAvailableAmount,
  energyPackCost,
  energyTokenAvailableAmount,
  basicGuildTokenCost,
  basicGuildTokenAvailableAmount,
  tier1GuildTokenCost,
  tier1GuildTokenAvailableAmount,
  tier2GuildTokenCost,
  tier2GuildTokenAvailableAmount,
  tier3GuildTokenCost,
  tier3GuildTokenAvailableAmount,
  txError,
  originalPrice,
  earlyBirdDiscount,
  referralDiscount,
}) => {
  const controls = useAnimation();
  const { web3Modal, loadWeb3Modal } = useWeb3Modal();

  let connectButtonText;
  let connectOnClick;

  if (web3Modal && web3Modal.cachedProvider) {
    connectOnClick = onConfirmOrder;
    connectButtonText = "FINISH PURCHASE";
  } else {
    connectOnClick = loadWeb3Modal;
    connectButtonText = "CONNECT WALLET";
  }

  if (visible) {
    controls.start("visible");
  } else {
    controls.start("hidden");
  }

  const normalizedPrice = totalPrice || 0;
  const ethPrice = convertPriceUsdToEth(normalizedPrice) * PRICE_BUFFER;

  const cartItems = [];
  if (numRareHeroPacks !== 0) {
    cartItems.push(
      <CartItem
        key={Product.RareHeroPack}
        title="RARE HERO"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={rareHeroPackCost}
        count={numRareHeroPacks}
        onChange={setNumRareHeroPacks}
        availableCount={rareHeroPackAvailableAmount}
      />,
    );
  }
  if (numEpicHeroPacks !== 0) {
    cartItems.push(
      <CartItem
        key={Product.EpicHeroPack}
        convertPriceUsdToEth={convertPriceUsdToEth}
        title="EPIC HERO"
        price={epicHeroPackCost}
        count={numEpicHeroPacks}
        onChange={setNumEpicHeroPacks}
        availableCount={epicHeroPackAvailableAmount}
      />,
    );
  }
  if (numLegendaryHeroPacks !== 0) {
    cartItems.push(
      <CartItem
        key={Product.LegendaryHeroPack}
        title="LEGENDARY HERO"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={legendaryHeroPackCost}
        count={numLegendaryHeroPacks}
        onChange={setNumLegendaryHeroPacks}
        maxCountInCart={CART_ASSETS_LIMIT.LEGENDARY_HERO}
        availableCount={legendaryHeroPackAvailableAmount}
      />,
    );
  }
  if (numPetPacks !== 0) {
    cartItems.push(
      <CartItem
        key={Product.PetPack}
        title="PET SUMMON"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={petPackCost}
        count={numPetPacks}
        onChange={setNumPetPacks}
        availableCount={petPackAvailableAmount}
      />,
    );
  }
  if (numEnergyTokens !== 0) {
    cartItems.push(
      <CartItem
        key={Product.EnergyToken}
        title="ENERGY BOOSTER"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={energyPackCost}
        count={numEnergyTokens}
        onChange={setNumEnergyTokens}
        availableCount={energyTokenAvailableAmount}
      />,
    );
  }
  if (numBasicGuildTokens !== 0) {
    cartItems.push(
      <CartItem
        key={Product.BasicGuildToken}
        title="ADVENTURERS GUILD"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={basicGuildTokenCost}
        count={numBasicGuildTokens}
        onChange={setNumBasicGuildTokens}
        maxCountInCart={CART_ASSETS_LIMIT.ADVENTURERS_GUILD}
        availableCount={basicGuildTokenAvailableAmount}
      />,
    );
  }
  if (numTier1GuildTokens !== 0) {
    cartItems.push(
      <CartItem
        key={Product.Tier1GuildToken}
        title="WARRIORS GUILD"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={tier1GuildTokenCost}
        count={numTier1GuildTokens}
        onChange={setNumTier1GuildTokens}
        maxCountInCart={CART_ASSETS_LIMIT.WARRIORS_GUILD}
        availableCount={tier1GuildTokenAvailableAmount}
      />,
    );
  }
  if (numTier2GuildTokens !== 0) {
    cartItems.push(
      <CartItem
        key={Product.Tier2GuildToken}
        title="LEGENDS GUILD"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={tier2GuildTokenCost}
        count={numTier2GuildTokens}
        onChange={setNumTier2GuildTokens}
        maxCountInCart={CART_ASSETS_LIMIT.LEGENDS_GUILD}
        availableCount={tier2GuildTokenAvailableAmount}
      />,
    );
  }
  if (numTier3GuildTokens !== 0) {
    cartItems.push(
      <CartItem
        key={Product.Tier3GuildToken}
        title="MYTHIC GUILD"
        convertPriceUsdToEth={convertPriceUsdToEth}
        price={tier3GuildTokenCost}
        count={numTier3GuildTokens}
        onChange={setNumTier3GuildTokens}
        maxCountInCart={CART_ASSETS_LIMIT.MYTHIC_GUILD}
        availableCount={tier3GuildTokenAvailableAmount}
      />,
    );
  }

  return (
    <CartBarContainer
      className={className}
      initial="hidden"
      animate={controls}
      variants={variantsTransactionBar}
      visible={!Number.isNaN(totalPrice) && totalPrice != null && visible}
      hasTopBar={showTopBar}
    >
      <CartContent>{cartItems}</CartContent>
      {txError && <TransactionErrorMessage>{txError}</TransactionErrorMessage>}
      <PricesWrapper>
        {normalizedPrice !== originalPrice && (
          <PriceRow>
            <PriceLabelCol>Original</PriceLabelCol>
            <PriceAmountCol>${formatUsdPrice(originalPrice)}</PriceAmountCol>
          </PriceRow>
        )}
        {earlyBirdDiscount && (
          <PriceRow>
            <PriceLabelCol>Early Bird Discount</PriceLabelCol>
            <DiscountAmountCol>- ${formatUsdPrice(earlyBirdDiscount)}</DiscountAmountCol>
          </PriceRow>
        )}
        {referralDiscount > 0 && (
          <PriceRow>
            <PriceLabelCol>Referal Discount</PriceLabelCol>
            <DiscountAmountCol>- ${formatUsdPrice(referralDiscount)}</DiscountAmountCol>
          </PriceRow>
        )}
        <PriceRowIndented>
          <PriceLabelCol>Total</PriceLabelCol>
          <TotalPrice>${formatUsdPrice(normalizedPrice)}</TotalPrice>
        </PriceRowIndented>
        <PriceRow>
          <PriceLabelSmallCol>(In ETH)</PriceLabelSmallCol>
          <EthereumAmountCol>{formatEth(ethPrice)} ETH</EthereumAmountCol>
        </PriceRow>
        <ButtonRow>
          <ConfirmOrderButton target="_blank" onClick={connectOnClick}>
            {connectButtonText}
          </ConfirmOrderButton>
        </ButtonRow>
      </PricesWrapper>
    </CartBarContainer>
  );
};

export default CartBar;
