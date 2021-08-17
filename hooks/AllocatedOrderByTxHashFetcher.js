import { useState } from "react";
import axios from "axios";
import usePoller from "./Poller";
import { DEFAULT_POLL_TIME_ALLOCATION_ORDER_TX } from "../constants";

const DEBUG = false;

export default function useAllocatedOrderByTxHashFetcher(
  backendUrl,
  owner,
  pollTime = DEFAULT_POLL_TIME_ALLOCATION_ORDER_TX,
) {
  const [value, setValue] = useState();

  let lastTx = null;
  if (process.browser) {
    lastTx = localStorage.getItem("lastTx");
    if (DEBUG) {
      console.log(`lastTx: ${lastTx}`);
    }
    if (lastTx) lastTx = JSON.parse(lastTx);
  }

  usePoller(async () => {
    if (!backendUrl || !pollTime || !lastTx) {
      setValue({});
    } else {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/addresses/${owner}/allocated-orders?filter={"transactionHash": "${lastTx.txHash}"}`,
        );
        setValue(data[0] || {});
      } catch (e) {
        console.error(e);
      }
    }
  }, pollTime);
  return value;
}
