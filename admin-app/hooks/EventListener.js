import { useState, useEffect } from "react";

export default function useEventListener(contracts, contractName, eventName, provider, startBlock) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (typeof provider !== "undefined" && typeof startBlock !== "undefined") {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      provider.resetEventsBlock(startBlock);
    }
    if (contracts && contractName && contracts[contractName]) {
      try {
        contracts[contractName].on(eventName, (...params) => {
          const { blockHash, blockNumber, transactionHash } = params[params.length - 1];
          setUpdates(messages => [{ blockHash, blockNumber, transactionHash, ...params.pop().args }, ...messages]);
        });
        return () => {
          contracts[contractName].removeListener(eventName);
        };
      } catch (e) {
        console.log(e);
      }
    }
    return undefined;
  }, [provider, startBlock, contracts, contractName, eventName]);

  return updates;
}
