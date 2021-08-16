import { useState } from "react";
import { usePoller } from "eth-hooks";
import axios from "axios";
import { DEFAULT_POLL_TIME_GAS_PRICE } from "../constants";

export default function useGasPrice(targetNetwork, speed) {
  const [gasPrice, setGasPrice] = useState();
  const loadGasPrice = async () => {
    if (targetNetwork.gasPrice) {
      setGasPrice(targetNetwork.gasPrice);
    } else {
      axios
        .get("https://ethgasstation.info/json/ethgasAPI.json")
        .then(response => {
          const newGasPrice = response.data[speed || "fast"] * 100000000;
          if (newGasPrice !== gasPrice) {
            setGasPrice(newGasPrice);
          }
        })
        .catch(error => console.log(error));
    }
  };

  usePoller(loadGasPrice, DEFAULT_POLL_TIME_GAS_PRICE);
  return gasPrice;
}
