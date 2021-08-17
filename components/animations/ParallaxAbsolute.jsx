import React from "react";
import { Parallax } from "react-scroll-parallax";

const ParallaxAbsolute = ({ children, ...props }) => (
  <Parallax
    styleOuter={{
      position: "absolute",
      pointerEvents: "none",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }}
    styleInner={{
      position: "absolute",
      pointerEvents: "none",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }}
    {...props}
  >
    {children}
  </Parallax>
);

export default ParallaxAbsolute;
