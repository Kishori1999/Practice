import React from "react";
import { Button } from "antd";
import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";
import { useWeb3Modal } from "../src/hooks/useWeb3Modal";

export default function Account({
  address,
  userProvider,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  blockExplorer,
}) {
  const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const modalButtons = [];
  if (web3Modal && web3Modal.cachedProvider) {
    modalButtons.push(
      <Button
        key="logoutbutton"
        style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
        shape="round"
        size="large"
        onClick={logoutOfWeb3Modal}
      >
        logout
      </Button>,
    );
  } else {
    modalButtons.push(
      <Button
        key="loginbutton"
        style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
        shape="round"
        size="large"
        /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
        onClick={loadWeb3Modal}
      >
        connect
      </Button>,
    );
  }

  const display = minimized ? (
    ""
  ) : (
    <span>
      {address ? (
        <Address value={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
      ) : (
        "Connecting..."
      )}
      <Balance address={address} provider={localProvider} dollarMultiplier={price} />
      <Wallet address={address} provider={userProvider} ensProvider={mainnetProvider} price={price} />
    </span>
  );

  return (
    <div>
      {display}
      {modalButtons}
    </div>
  );
}
