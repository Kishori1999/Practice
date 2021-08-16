import React, { useContext, useEffect, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";
import { INFURA_ID } from "../../constants";

const Web3ModalContext = React.createContext({
  web3Modal: null,
  loadWeb3Modal: () => {},
  logoutOfWeb3Modal: () => {},
});

export function useWeb3Modal() {
  return useContext(Web3ModalContext);
}

export function Web3ModalProvider({ setInjectedProvider, children }) {
  const [web3ModalHandler, setWeb3ModalHandler] = useState({
    web3Modal: null,
    loadWeb3Modal: () => {},
    logoutOfWeb3Modal: () => {},
  });

  useEffect(() => {
    // eslint-disable-next-line global-require
    const Web3Modal = require("web3modal").default;
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: INFURA_ID,
          },
        },
      },
    });
    const loadWeb3Modal = async () => {
      const provider = await web3Modal.connect();
      setInjectedProvider(new Web3Provider(provider));
    };

    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }

    const logoutOfWeb3Modal = async () => {
      await web3Modal.clearCachedProvider();
      setTimeout(() => {
        window.location.reload();
      }, 1);
    };

    setWeb3ModalHandler({
      web3Modal,
      loadWeb3Modal,
      logoutOfWeb3Modal,
    });
  }, [setInjectedProvider]);

  return <Web3ModalContext.Provider value={web3ModalHandler}>{children}</Web3ModalContext.Provider>;
}
