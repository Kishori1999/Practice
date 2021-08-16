import { useMemo, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import BurnerProvider from "burner-provider";
import { INFURA_ID } from "../constants";

const useUserProvider = (isLocalNetwork, injectedProvider, localProvider) => {
  const [prevBurnerProvider, setPrevBurnerProvider] = useState();
  return useMemo(() => {
    if (prevBurnerProvider) {
      prevBurnerProvider.stop();
    }
    if (injectedProvider) {
      console.log("🦊 Using injected provider");
      return injectedProvider;
    }
    if (!localProvider || !isLocalNetwork || typeof window === "undefined") {
      return undefined;
    }

    const burnerConfig = {};

    if (window.location.pathname && window.location.pathname.indexOf("/pk") >= 0) {
      const incomingPK = window.location.hash.replace("#", "");
      let rawPK;
      if (incomingPK.length === 64 || incomingPK.length === 66) {
        console.log("🔑 Incoming Private Key...");
        rawPK = incomingPK;
        burnerConfig.privateKey = rawPK;
        window.history.pushState({}, "", "/");
        const currentPrivateKey = window.localStorage.getItem("metaPrivateKey");
        if (currentPrivateKey && currentPrivateKey !== rawPK) {
          window.localStorage.setItem("metaPrivateKey_backup" + Date.now(), currentPrivateKey);
        }
        window.localStorage.setItem("metaPrivateKey", rawPK);
      }
    }

    console.log("🔥 Using burner provider", burnerConfig);
    if (localProvider.connection && localProvider.connection.url) {
      burnerConfig.rpcUrl = localProvider.connection.url;
    } else {
      const networkName = localProvider._network && localProvider._network.name;
      burnerConfig.rpcUrl = `wss://${networkName || "mainnet"}.infura.io/ws/v3/${INFURA_ID}`;
    }
    const burnerProvider = new BurnerProvider(burnerConfig);
    setPrevBurnerProvider(burnerProvider);
    return new Web3Provider(burnerProvider);
  }, [isLocalNetwork, injectedProvider, localProvider]);
};

export default useUserProvider;
