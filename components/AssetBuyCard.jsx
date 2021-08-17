import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faSync } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import token, { devices } from "../styles/token";
import ActionCallButton from "./ActionCallButton";
import QuantitySelector from "./QuantitySelector";
import { formatNumberWithCommas, getNormalizedPrice, sanitizeCount } from "../helpers";

// Makes hook work on SSR without warnings
const useBrowserLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

const infoCardAspect = 1.996763754;
const cardWidth = 19.12;
const mobileWidth = 32.0;
const Container = styled.div`
  position: relative;
  color: ${token.palette.light.main};
  width: ${mobileWidth}em;
  max-width: 100%;
  height: ${mobileWidth * 2.2}em;
  margin: 2em 0.4em 4.5em;

  @media ${devices.md} {
    margin: 1.5em 1em 0.5em;
    width: ${cardWidth}em;
    height: ${cardWidth * infoCardAspect}em;
  }
`;

const CardContent = styled.div`
  position: relative;
  height: 100%;
  padding: ${({ topPadding }) => topPadding * 2.2}em 3em 8em 3.5em;
  display: flex;
  flex-flow: column nowrap;
  text-align: left;

  @media ${devices.md} {
    padding: ${({ topPadding }) => topPadding}em 1.5em 2em 2.3em;
  }
`;

const ItemText = styled.span`
  font-size: 1.5rem;
  padding-left: 5px;
  font-weight: bold;

  @media ${devices.md} {
    font-size: ${token.fontSizes.xs};
  }
`;

const ListItemContainer = styled.li`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
`;

const MobileIcon = styled.span`
  font-size: 0.7rem;
  margin-top: 0.6em;

  @media ${devices.md} {
    display: none;
  }
`;
const DesktopIcon = styled.span`
  font-size: 0.7rem;
  display: none;

  @media ${devices.md} {
    display: inline;
    margin-top: 2px;
  }
`;

const ListItem = ({ text }) => (
  <ListItemContainer>
    <MobileIcon>
      <FontAwesomeIcon size="lg" color={token.palette.blue.main} icon={faArrowRight} />
    </MobileIcon>
    <DesktopIcon>
      <FontAwesomeIcon size="1x" color={token.palette.blue.main} icon={faArrowRight} />
    </DesktopIcon>
    <ItemText>{text}</ItemText>
  </ListItemContainer>
);

const InfoList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-left: -0.7em;
  margin-top: ${({ topMargin }) => topMargin}em;
  margin-bottom: 0;
  flex-grow: 1;
  text-align: left;
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 53%, rgba(0, 0, 0, 0) 60%);
  pointer-events: none;
`;

const Media = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 30%;
`;

const Title = styled.div`
  font-size: ${token.fontSizes.h2};
  line-height: 1em;
  font-weight: bold;
  letter-spacing: -0.0675em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.h4};
  }
`;
const Subtitle = styled.div`
  font-size: 2.2rem;
  margin-top: 0.2em;

  @media ${devices.md} {
    margin: 0;
    font-size: ${token.fontSizes.xs};
  }
`;

const AddButton = styled(ActionCallButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 2em 1em;
  width: 17em;
  margin-left: 0.3em;
  font-size: ${token.fontSizes.base};

  @media ${devices.md} {
    padding: 1.3em 1em;
    width: 16em;
    margin-left: 0.3em;
    font-size: ${token.fontSizes.xs};
  }
`;

const AffirmedButton = styled(AddButton)`
  && {
    background-image: none;
    background-color: ${token.palette.green.main};
    cursor: initial;

    :hover,
    :focus {
      background-image: none;
      background-color: ${token.palette.green.main};
    }

    :hover::before {
      opacity: 0;
    }
  }
`;

const UpdateButton = styled(AddButton)`
  && {
    background-image: ${token.gradients.button.orange};
  }
`;

const Price = styled.div`
  font-size: 4.6rem;
  font-weight: bold;
  line-height: 1em;
  margin-top: 6px;
  margin-bottom: 4px;
  ${({ showDiscount }) => (showDiscount ? `color: ${token.palette.orange.main};` : ``)}

  @media ${devices.md} {
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 2px;
  }
`;

const OriginalPrice = styled.span`
  font-size: 2.3rem;
  font-weight: normal;
  text-decoration: line-through;
  position: relative;
  color: ${token.palette.light.main};

  @media ${devices.md} {
    font-size: 1.25rem;
  }
`;

const PriceSection = styled.div`
  text-align: center;
  margin-bottom: 1em;
`;
const Scarcity = styled.div`
  font-size: ${token.fontSizes.accented};
  @media ${devices.md} {
    font-size: ${token.fontSizes.xs};
  }
`;

const CounterInstruction = styled.div`
  color: #76787d;
  padding-bottom: 0.2em;
  font-size: 1.4rem;
  text-align: center;

  @media ${devices.md} {
    font-size: 0.86rem;
    padding-bottom: 0.4em;
  }
`;

const Counter = styled.div`
  margin: 1em auto;
  display: flex;

  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 0.7rem;
  text-align: center;
`;

const DiscountSticker = styled.div`
  font-size: 1.4rem;
  text-transform: uppercase;
  background-color: ${token.palette.orange.main};
  position: absolute;
  top: 1em;
  left: -20px;
  height: 2.5em;
  padding: 0.5em 0.5em;
  z-index: 1;

  @media ${devices.md} {
    font-size: 1.2rem;
  }
`;

const DiscountStickerBottomLeftTriangle = styled.div`
  position: absolute;
  top: 4.9em;
  left: -20px;
  width: 0;
  height: 0;
  border-top: 20px solid rgb(${token.palette.orange.mainRGB}, 0.4);
  border-left: 20px solid transparent;
  z-index: 10;

  @media ${devices.md} {
    top: 4.2em;
  }
`;

function getScarcityText(availableAmount, originalAmount) {
  if (originalAmount === 0) {
    return "COMING SOON";
  }
  if (originalAmount > 0) {
    if (availableAmount === 0) {
      return "SOLD OUT";
    }
    if (availableAmount > 0) {
      return `
${formatNumberWithCommas(availableAmount)} of ${formatNumberWithCommas(originalAmount)} Remaining`;
    }
  }
  return null;
}

const AssetBuyCard = ({
  id,
  title,
  hoverText,
  subtitle,
  infoList,
  availableCount,
  availableTotal,
  cost,
  finalCost,
  cartCount,
  onCartUpdate,
  imgSrc,
  particles,
  type2 = false,
  maxCountInCart = 100,
}) => {
  const [count, setCount] = useState(1);
  const [maxItemsCountMessage, setMaxItemsCountMessage] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discount, setDiscount] = useState(0);
  const normalizedCost = getNormalizedPrice(cost);
  const normalizedFinalCost = getNormalizedPrice(finalCost);
  const [scarcityText, setScarcityText] = useState(false);
  const list = infoList.map(li => <ListItem key={li} text={li} />);

  useBrowserLayoutEffect(() => {
    setCount(cartCount || (availableCount <= 0 ? 0 : 1));
  }, [cartCount, availableCount]);

  useEffect(() => {
    if (normalizedCost >= normalizedFinalCost || normalizedFinalCost === undefined) {
      setShowDiscount(false);
      setDiscount(0);
    } else {
      setShowDiscount(true);
      const discountValue = (((normalizedFinalCost - normalizedCost) / normalizedFinalCost) * 100).toFixed(0);
      setDiscount(discountValue);
    }
  }, [cost, normalizedFinalCost]);

  useEffect(() => {
    setScarcityText(getScarcityText(availableCount, availableTotal));
  }, [availableCount, availableTotal]);

  let topPadding = 9.1;
  let topMargin = 1.8;
  if (type2) {
    topPadding = 15;
    topMargin = 2.7;
  }

  const handleCountChange = newCount => {
    const sanitizedCount = sanitizeCount(newCount, maxCountInCart, availableCount);
    if (sanitizedCount === maxCountInCart) {
      setMaxItemsCountMessage(`Maximum is ${maxCountInCart}.`);
    }
    setCount(sanitizedCount);
    setMaxItemsCountMessage(null);
  };

  const updateCart = () => onCartUpdate(count);

  let price;

  if (!cost) {
    price = "";
  } else if (cost === -1) {
    price = 0;
  } else {
    price = formatNumberWithCommas(normalizedCost);
  }

  let button;

  if (cartCount === 0) {
    button = <AddButton onClick={updateCart}>ADD TO CART</AddButton>;
  } else if (cartCount === count) {
    button = (
      <AffirmedButton>
        <FontAwesomeIcon width={16} size="1x" icon={faCheck} />
      </AffirmedButton>
    );
  } else {
    button = <UpdateButton onClick={updateCart}>UPDATE THE CART</UpdateButton>;
  }

  return (
    <Container title={hoverText}>
      {showDiscount && (
        <>
          <DiscountSticker>You save {discount}%</DiscountSticker>
          <DiscountStickerBottomLeftTriangle />
        </>
      )}

      <Media>
        <Image layout="fill" src={imgSrc} objectPosition="center top" objectFit="contain" alt="asset background" />
      </Media>
      <Shader />
      <CardContent topPadding={topPadding}>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <InfoList topMargin={topMargin}>{list}</InfoList>

        <Counter>
          <CounterInstruction>Select how many packs to purchase</CounterInstruction>
          {maxItemsCountMessage && <Text>{maxItemsCountMessage}</Text>}
          <QuantitySelector name={id} count={count} onChange={handleCountChange} />
        </Counter>

        <PriceSection>
          <Price showDiscount={showDiscount}>
            ${price} {showDiscount && <OriginalPrice>${formatNumberWithCommas(normalizedFinalCost)}</OriginalPrice>}
          </Price>
          {scarcityText ? (
            <Scarcity>{scarcityText}</Scarcity>
          ) : (
            <FontAwesomeIcon size="1x" width={6} icon={faSync} spin />
          )}
        </PriceSection>
        {(availableTotal === 0 || availableCount === 0) && <AddButton>NOT AVAILABLE</AddButton>}
        {availableTotal > 0 && availableCount > 0 && button}
      </CardContent>
      {particles}
    </Container>
  );
};

export default AssetBuyCard;
