import { useEffect, useState } from "react";
import axios from "axios";
import usePoller from "./Poller";
import { DEFAULT_POLL_TIME_RESOURCE } from "../constants";

export default function useResourceFetcher(url, preCondition, extraWatch, pollTime = DEFAULT_POLL_TIME_RESOURCE) {
  const [value, setValue] = useState();

  async function fetchResource() {
    if (!url || !preCondition) {
      return;
    }
    try {
      const { data } = await axios.get(url);
      setValue(data);
    } catch (e) {
      console.error(e);
    }
  }

  if (pollTime !== null && pollTime > 0) {
    usePoller(fetchResource, pollTime, extraWatch);
  } else {
    useEffect(fetchResource, [extraWatch]);
  }

  return value;
}
