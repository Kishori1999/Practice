import { useState } from "react";
import axios from "axios";
import usePoller from "./Poller";
import { DEFAULT_POLL_TIME_RESOURCE } from "../constants";

export default function useResourceFetcher(url, preCondition, extraWatch, pollTime = DEFAULT_POLL_TIME_RESOURCE) {
  const [value, setValue] = useState();

  usePoller(
    async () => {
      if (!url || !preCondition) {
        return;
      }
      try {
        const { data } = await axios.get(url);
        setValue(data);
      } catch (e) {
        console.error(e);
      }
    },
    pollTime,
    extraWatch,
  );

  return value;
}
