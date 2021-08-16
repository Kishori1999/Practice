import { useCallback, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";

const useWeb3ModalLoader = (web3Modal, setInjectedProvider) => {
  if (process.browser) {
    const loadWeb3Modal = useCallback(async () => {
      if (web3Modal) {
        const provider = await web3Modal.connect();
        setInjectedProvider(new Web3Provider(provider));
      }
    }, [setInjectedProvider, web3Modal]);

    useEffect(() => {
      if (web3Modal && web3Modal.cachedProvider) {
        loadWeb3Modal();
      }
    }, [loadWeb3Modal, web3Modal]);
    return loadWeb3Modal;
  }

  return null;
};

export default useWeb3ModalLoader;
