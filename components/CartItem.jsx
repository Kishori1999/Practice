import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import token, { devices } from "../styles/token";
import QuantitySelector from "./QuantitySelector";
import { formatEth, formatUsdPrice, getNormalizedPrice, sanitizeCount } from "../helpers";
import { PRICE_BUFFER } from "../../constants";

const ItemContainer = styled.div`
  position: relative;
  background-color: ${token.palette.green.dark};
  margin: 0.2em 1em;
  padding: 1.5em;

  @media ${devices.md} {
    margin: 0.2em 0;
    padding: 1em;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 3em;
  height: 3em;
  border: none;
  font-size: 1.5rem;

  background-image: ${token.gradients.button.main};
  cursor: pointer;

  @media ${devices.md} {
    font-size: 1rem;
  }
`;
const Title = styled.div`
  font-size: ${token.fontSizes.h4};
  line-height: 1.1em;
  font-weight: bold;
  letter-spacing: -0.0675em;

  @media ${devices.md} {
  }
`;

const SelectorRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
  line-height: 1.3em;
  --count-font-size-mobile: 1.3rem;
  --selection-font-size-mobile: 1.3rem;
  --count-width-mobile: 5.4em;
`;

const Price = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 0.5em;
  font-weight: bold;
  min-width: 4em;
  width: 100%;
  overflow: hidden;
`;

const PriceValue = styled.span`
  font-size: 2.3rem;
`;

const EthPrice = styled.span`
  font-size: 0.8rem;
  line-height: 1em;
`;

const CounterInstruction = styled.div`
  color: #76787d;
  padding-top: 0.9em;
  padding-bottom: 0.3em;
  font-size: 1rem;

  @media ${devices.md} {
    font-size: 0.86rem;
  }
`;

const InfoMessage = styled.div`
  position: absolute;
  bottom: 0.3em;
  max-width: 100%;
  overflow: hidden;
  font-size: 0.8rem;
  line-height: 1em;
`;

const CartItem = ({ title, convertPriceUsdToEth, price, count, onChange, maxCountInCart = 100, availableCount }) => {
  const [infoMessage, setInfoMessage] = useState(null);

  const handleCountChange = newCount => {
    const sanitizedCount = sanitizeCount(newCount, maxCountInCart, availableCount);
    if (sanitizedCount === maxCountInCart) {
      setInfoMessage(`Maximum is ${maxCountInCart}.`);
    } else if (infoMessage) {
      setInfoMessage(null);
    }
    onChange(sanitizedCount);
  };

  const normalizedPrice = price && getNormalizedPrice(price);
  const totalPrice = normalizedPrice ? formatUsdPrice(normalizedPrice * count) : "loading";
  const ethPrice = normalizedPrice
    ? formatEth(convertPriceUsdToEth(normalizedPrice) * count * PRICE_BUFFER)
    : "loading";
  return (
    <ItemContainer>
      <DeleteButton onClick={() => onChange(0)}>
        <FontAwesomeIcon width={16} size="1x" icon={faTrashAlt} />
      </DeleteButton>
      <Title>{title}</Title>
      <CounterInstruction>Select how many packs to purchase</CounterInstruction>
      <SelectorRow>
        <QuantitySelector count={count} onChange={handleCountChange} />
        <Price>
          <PriceValue>${totalPrice}</PriceValue>
          <EthPrice>{ethPrice} ETH</EthPrice>
        </Price>
      </SelectorRow>
      {infoMessage && <InfoMessage>{infoMessage}</InfoMessage>}
    </ItemContainer>
  );
};

export default CartItem;
