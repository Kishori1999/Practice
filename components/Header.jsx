import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion, useViewportScroll } from "framer-motion";
import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import token, { devices } from "../styles/token";
import Button from "./Button";
import Burger from "./Burger";
import MenuItem from "./MenuItem";
import ConnectButton from "./ConnectButton";
import { Link } from "../../components";
import { useCart } from "../hooks/useCart";
import { formatEth, formatUsdPrice } from "../helpers";
import {
  FEATURE_IS_COMING_SOON_MODE,
  FEATURE_MINTING,
  FEATURE_SHOW_PROMOTION_TOPBAR,
  PRICE_BUFFER,
} from "../../constants";
import CountdownTopBar, { showCountdownTopBar } from "./CountDownTopBar";
import PromotionTopBar from "./PromotionTopBar";
import { showTopBar } from "../../helpers/showTopBar";

const StyledHeader = styled(motion.header)`
  position: fixed;
  top: 0;
  display: flex;
  color: ${token.palette.light.main};
  z-index: ${token.header.zIndex};
  width: 100%;
  flex-flow: row nowrap;
  align-items: stretch;
  background: ${token.palette.dark.main};
  padding-top: ${({ hasTopBar }) => (hasTopBar ? token.topBar.height : "0px")};
  height: ${({ hasTopBar }) => (hasTopBar ? token.headerWithTopBar.height : token.header.height)};
  box-sizing: border-box;
  transition: transform 300ms;
  transform: ${({ visible, hasTopBar }) =>
    visible ? "translateY(0)" : `translateY(-${hasTopBar ? "200px" : "140px"})`};
  @media ${devices.xl} {
    padding-top: ${({ hasTopBar }) => (hasTopBar ? token.topBar.heightXl : "0px")};
    height: ${({ hasTopBar }) => (hasTopBar ? token.headerWithTopBar.heightXl : token.header.heightXl)};
    z-index: 200;
  }

  @media ${devices.xxxl} {
    padding-top: ${({ hasTopBar }) => (hasTopBar ? token.topBar.heightXXl : "0px")};
    height: ${({ hasTopBar }) => (hasTopBar ? token.headerWithTopBar.heightXXl : token.header.heightXXl)};
  }
`;

// 1.20 aspect ratio
const Logo = styled.div`
  position: relative;
  user-select: none;
  z-index: 300;
  margin: 0 0 10px -8px;
  left: 0;
  right: 0;
  width: 140px;
  height: 120px;
  min-width: 140px;

  @media ${devices.xl} {
    position: relative;
    margin: 0 0 10px 5px;
  }
`;

const Navigation = styled.nav`
  position: absolute;
  display: flex;
  background: ${({ open }) => (open ? "#06132d" : `rgba(${token.palette.dark.mainRGB}, 0)`)};
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.2s linear;
  z-index: 100;
  width: 100%;
  min-height: ${({ open }) => (open ? "100vh" : 0)};
  padding-top: 8em;
  flex-flow: column;
  align-items: center;

  @media ${devices.xl} {
    position: relative;
    background: transparent;
    opacity: 1;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: stretch;
    visibility: visible;
    height: 100%;
    min-height: auto;
    padding-top: 0;
    margin-left: 1.5em;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  list-style: none;
  padding: 0 0 0 0;
  margin: 0;
  font-size: 1rem;

  @media screen and (min-width: 370px) {
    padding: 0 0 2rem 0;
  }

  @media ${devices.xl} {
    flex-flow: row nowrap;
    font-size: 1rem;
    padding: 0;
  }
`;

const ButtonStack = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-bottom: 10px;
  padding-top: 0;

  @media screen and (min-width: 370px) {
    padding-top: 4em;
  }

  @media ${devices.xl} {
    flex-flow: row;
    margin-right: ${({ withCart }) => (withCart ? "0" : "2.25em")};
    align-items: stretch;
    padding-bottom: 0;
    padding-top: 0;
  }
`;

const BuyButton = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${token.fontSizes.base};
    letter-spacing: 3px;
    min-width: 180px;
    padding: 2em 1.5em;
    box-shadow: 0 0 30px 4px ${token.palette.blue.dark};

    @media ${devices.xl} {
      font-size: ${token.fontSizes.xs};
      padding: 0.5em 1.5em;
      border: none;
      box-shadow: none;
      letter-spacing: 1.7px;
    }
  }
`;

const CartStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: ${token.gradients.button.main};
  cursor: pointer;
  font-size: ${token.fontSizes.accented};

  padding: 0 0 0 1.5em;

  @media ${token.header.break} {
    font-size: ${token.fontSizes.base};
  }
`;

const CartButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ open }) => (open ? token.palette.light.main : token.palette.dark.main)};
  cursor: pointer;
  background-color: ${({ open }) => (open ? token.palette.orange.main : "transparent")};
  border: none;

  padding: 0 1em;
  height: 100%;
  width: 54px;
  font-size: ${token.fontSizes.big};

  &:active,
  &:focus {
    outline: none;
  }

  @media ${token.header.break} {
    font-size: ${token.fontSizes.base};
    width: 3.3em;
  }
`;
const CartCount = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  border-radius: 50%;
  padding: 0 0.5em;
  color: ${token.palette.light.main};
  background-color: ${token.palette.orange.main};
  font-size: 0.8rem;

  @media ${devices.md} {
    font-size: 0.6rem;
  }
`;

const CartText = styled.div`
  margin-right: 1em;
`;
const CartPrice = styled.div`
  display: none;
  height: 80%;
  border-radius: 8px;
  padding: 0.5em 0.5em;
  background-color: ${token.palette.dark.main};
  margin: 0 1em 0 0;

  overflow: hidden;
  text-overflow: clip;
  max-width: 2rem;

  @media screen and (min-width: 370px) {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-flow: column nowrap;
    overflow: hidden;
    text-overflow: clip;
    max-width: 6rem;
  }

  @media screen and (min-width: 400px) {
    max-width: initial;
    padding: 0 1em;
  }
`;

const CartUsdPrice = styled.span`
  line-height: 1em;
`;
const CartEthPrice = styled.span`
  line-height: 1em;
  color: ${token.palette.light.lightGrey};
`;

const MobileHeaderStack = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;

  @media ${devices.xl} {
    display: none;
  }
`;

const MobileBuyButton = styled(BuyButton)`
  && {
    height: ${token.header.height};
    padding: 0 2em;
    min-width: 0;
    box-shadow: none;
    border: none;

    @media ${devices.xl} {
      display: none;
    }
  }
`;
const MobileBackground = styled.div`
  position: absolute;
  top: 4em;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: ${({ open }) => (!open ? "opacity 0 ease-in-out" : "opacity 0.3s ease-in-out")};
  transition-delay: 0.1s;

  @media ${token.header.break} {
    display: none;
  }
`;

const SummoningsSignifier = styled.div`
  position: absolute;
  top: calc(50% - 0.55em);
  right: -0.3em;
  height: 0.45em;
  width: 0.45em;
  background: white;
  border-radius: 50%;
  border: 2px solid ${token.palette.orange.main};
`;

const MenuItemDisabled = styled.div`
  position: relative;
  display: inline-flex;
  color: ${token.palette.light.grey};
  border-bottom: ${({ active }) => (active ? "3px solid #28b0d5" : "none")};
  font-size: ${token.fontSizes.h2};
  line-height: 1;
  border-bottom: 3px solid transparent;
  margin-bottom: 0.6em;

  :hover {
    border-bottom: 3px solid #28b0d5;
  }

  @media ${token.header.break} {
    height: 100%;
    margin: 0 1.3em;
    align-items: center;
    font-size: ${token.fontSizes.xs};
  }
`;

const MenuItemBadge = styled.div`
  position: relative;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  color: #fff;
  padding: 7px 3px 8px 7px;
  box-sizing: border-box;
  margin-left: 4px;
  font-size: 9px;
  width: 32px;
  height: 23px;
  font-weight: 600;
  background-image: url(/imgs/icons/icon-menu-badge.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Header = ({ address, assets, autoHideHeader = true, showCart = false }) => {
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(null);
  const { scrollY } = useViewportScroll();
  const [scrollingUp, setScrollingUp] = useState(true);
  const { orderCost, convertPriceUsdToEth, cartOpened, setCartOpened, totalCount } = useCart();

  useEffect(() => {
    function checkDirection(v) {
      const scrollingUpCurrent = lastScroll && lastScroll.current > v;
      lastScroll.current = v;
      if (v <= 20 || scrollingUpCurrent !== scrollingUp) {
        setScrollingUp(scrollingUpCurrent);
      }
    }

    const unsub = scrollY.onChange(checkDirection);
    return () => unsub();
  }, [scrollY, scrollingUp]);

  if (typeof document !== "undefined") {
    if (open) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  const boxedAssets = assets && assets.filter(asset => asset.boxed);
  const hasBoxedAssets = boxedAssets && boxedAssets.length > 0;

  const withCart = showCart && totalCount !== 0;

  const cartStrip = (
    <CartStrip onClick={() => setCartOpened(!cartOpened)}>
      <CartText>CART</CartText>
      <CartPrice>
        <CartUsdPrice>${formatUsdPrice(orderCost)}</CartUsdPrice>
        <CartEthPrice>{formatEth(convertPriceUsdToEth(orderCost) * PRICE_BUFFER)} ETH</CartEthPrice>
      </CartPrice>
      <CartButton open={cartOpened}>
        <FontAwesomeIcon width={16} icon={cartOpened ? faTimes : faShoppingBasket} size="1x" />
        {!cartOpened && totalCount !== 0 && <CartCount>{totalCount}</CartCount>}
      </CartButton>
    </CartStrip>
  );

  return (
    <StyledHeader id="header" hasTopBar={showTopBar} visible={!autoHideHeader || scrollingUp}>
      {showTopBar && showCountdownTopBar && !FEATURE_SHOW_PROMOTION_TOPBAR && <CountdownTopBar />}
      {showTopBar && FEATURE_SHOW_PROMOTION_TOPBAR && (
        <PromotionTopBar
          text="Only 7% of Guilds Remain. Earn up to 10% of your Guilds crafting sales."
          page="store"
          anchor="guild_section"
        />
      )}
      <Logo>
        <Link href="/">
          <a>
            <Image
              objectFit="contain"
              objectPosition="center top"
              src="/imgs/logo-flag.png"
              alt="logo"
              width="200"
              height="180"
            />
          </a>
        </Link>
      </Logo>
      <Navigation open={open}>
        <MobileBackground open={open}>
          <Image layout="fill" objectFit="contain" objectPosition="right bottom" src="/imgs/menu-bg-hero.png" />
        </MobileBackground>
        <Menu>
          <MenuItem onClick={() => setOpen(false)} href="/">
            HOME
          </MenuItem>
          <MenuItem onClick={() => setOpen(false)} href="/faq">
            ABOUT
          </MenuItem>
          {FEATURE_IS_COMING_SOON_MODE && <MenuItemDisabled>STORE</MenuItemDisabled>}
          {!FEATURE_IS_COMING_SOON_MODE && (
            <MenuItem onClick={() => setOpen(false)} href="/store">
              STORE
            </MenuItem>
          )}
          <MenuItem onClick={() => setOpen(false)} href="/collections">
            COLLECTIONS
          </MenuItem>
          <MenuItem onClick={() => setOpen(false)} href="/rewards">
            REWARDS
          </MenuItem>
          {address && (
            <MenuItem onClick={() => setOpen(false)} href="/summonings">
              SUMMONING
              {hasBoxedAssets && <SummoningsSignifier />}
            </MenuItem>
          )}
          <MenuItem onClick={() => setOpen(false)} href="https://whitepaper.guildofguardians.com/">
            WHITEPAPER
          </MenuItem>
          {FEATURE_MINTING && (
            <MenuItem onClick={() => setOpen(false)} href="/mint">
              MINT
              <MenuItemBadge>New</MenuItemBadge>
            </MenuItem>
          )}
        </Menu>
        <ButtonStack withCart={withCart}>
          <ConnectButton address={address} />
          {open || !withCart ? (
            <>
              {FEATURE_IS_COMING_SOON_MODE ? (
                <BuyButton as="a">COMING SOON</BuyButton>
              ) : (
                <Link href="/store" passHref>
                  <BuyButton as="a">BUY NOW</BuyButton>
                </Link>
              )}
            </>
          ) : (
            cartStrip
          )}
        </ButtonStack>
      </Navigation>
      <MobileHeaderStack>
        {!withCart ? (
          <>
            {FEATURE_IS_COMING_SOON_MODE ? (
              <MobileBuyButton as="a">COMING SOON</MobileBuyButton>
            ) : (
              <Link href="/store" passHref>
                <MobileBuyButton as="a">BUY NOW</MobileBuyButton>
              </Link>
            )}
          </>
        ) : (
          cartStrip
        )}
        <Burger open={open} setOpen={() => setOpen(!open)} />
      </MobileHeaderStack>
    </StyledHeader>
  );
};
export default Header;
