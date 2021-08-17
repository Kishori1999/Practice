import { useState } from "react";
import { Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import { usePoller } from "eth-hooks";
import { DAI_ADDRESS, DEFAULT_POLL_TIME_EXCHANGE_PRICE } from "../constants";

export default function useExchangePrice(targetNetwork, mainnetProvider, pollTime) {
  const [price, setPrice] = useState(0);

  const pollPrice = () => {
    async function getPrice() {
      if (targetNetwork.price) {
        setPrice(targetNetwork.price);
      } else {
        const DAI = new Token(mainnetProvider.network ? mainnetProvider.network.chainId : 1, DAI_ADDRESS, 18);
        const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
        const route = new Route([pair], WETH[DAI.chainId]);
        setPrice(parseFloat(route.midPrice.toSignificant(6)));
      }
    }
    getPrice();
  };
  usePoller(pollPrice, pollTime || DEFAULT_POLL_TIME_EXCHANGE_PRICE);

  return price;
}
