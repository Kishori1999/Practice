import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../styles/token";
import { formatAddress } from "../helpers";
import { useWeb3Modal } from "../hooks/useWeb3Modal";

const ConnectButtonContainer = styled.div`
  position: relative;
  display: flex;
  font-size: ${token.fontSizes.base};
  min-width: 200px;
  background: ${token.gradients.button.connect};
  border: 1px solid rgba(70, 203, 229, 0.1);
  margin-bottom: 1em;
  justify-content: space-around;
  align-items: center;
  transition: border-color 300ms ease-in-out;
  cursor: pointer;
  padding: 2em 1.4em;

  ${({ variant }) =>
    variant === "light-blue"
      ? `
      background: linear-gradient(90deg, ${token.palette.blue.dark} 0%, ${token.palette.blue.light} 50%);
      color: #fff;
      border: 1px solid ${token.palette.blue.light};
    `
      : ``}

  :hover {
    border-color: ${token.palette.orange.main};
  }

  @media ${devices.xl} {
    padding: 1em 1.4em;
    margin: 9px 16px;
  }
`;

const ConnectText = styled.span`
  margin-left: 0.5em;
  letter-spacing: 3px;
  font-size: ${token.fontSizes.base};

  @media ${devices.md} {
    letter-spacing: 1.7px;
    margin-left: 0.5em;
    font-size: ${token.fontSizes.xs};
  }
`;

const ConnectButton = ({ className, address, variant }) => {
  const { web3Modal, loadWeb3Modal } = useWeb3Modal();

  let connectButtonText;
  let connectOnClick;

  if (web3Modal && web3Modal.cachedProvider && address) {
    connectButtonText = formatAddress(address, "short");
  } else {
    connectOnClick = loadWeb3Modal;
    connectButtonText = "CONNECT WALLET";
  }

  return (
    <ConnectButtonContainer variant={variant} className={className} onClick={connectOnClick}>
      {!address && (
        <Image
          objectFit="contain"
          objectPosition="center center"
          src={`/imgs/icons/icon-connect-wallet-${variant === "light-blue" ? "white" : "light-blue"}.svg`}
          alt="wallet"
          width="12"
          height="12"
        />
      )}
      <ConnectText>{connectButtonText}</ConnectText>
    </ConnectButtonContainer>
  );
};

export default ConnectButton;
