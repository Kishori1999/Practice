import React from "react";
import styled from "styled-components";
import token from "../../styles/token";

const Status = styled.div`
  position: relative;
  max-width: 20rem;
  width: 100%;
  padding: 0.75rem 2.25rem;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(${token.palette.blue.darkRGB}, 10%) 0%,
    rgba(${token.palette.blue.lightRGB}, 10%) 50%
  );
  border: 1px solid rgba(${token.palette.blue.darkRGB}, 10%);
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.25px;

  > span {
    display: inline-block;
    vertical-align: middle;
  }
`;

const Loading = styled.img`
  height: 18px;
  width: 18px;

  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: center;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  vertical-align: middle;
  margin-right: 1rem;
`;

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;

  ${({ color }) => (color === "green" ? `background-color: ${token.palette.green.light}` : "")}
  ${({ color }) => (color === "orange" ? `background-color: ${token.palette.orange.light}` : "")}
`;

const walletShortcut = walletNumber => {
  return `${walletNumber.substr(0, 6)}…${walletNumber.substr(-4, walletNumber.length)}`;
};

function WalletStatus({ connecting, address }) {
  if (!connecting && !address) {
    return <></>;
  }

  return (
    <Status>
      <StatusDot color={connecting ? "orange" : "green"} />
      {connecting ? (
        <>
          <Loading src="/imgs/icons/icon-loading-light.svg" />
          <span>Connecting...</span>
        </>
      ) : (
        <>Current web wallet: {walletShortcut(address)}</>
      )}
    </Status>
  );
}

export default WalletStatus;
