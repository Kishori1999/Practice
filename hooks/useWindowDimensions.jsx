import React, { useContext, useEffect, useState } from "react";
import { throttle } from "lodash";

const DimensionsContext = React.createContext({ width: null, height: null });

export function useWindowDimensions() {
  return useContext(DimensionsContext);
}

export function WindowDimensionsProvider({ children }) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 16);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <DimensionsContext.Provider value={windowDimensions}>{children}</DimensionsContext.Provider>;
}
