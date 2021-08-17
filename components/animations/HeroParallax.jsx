import React from "react";
import styled from "styled-components";
import Plx from "react-plx";

const HeroParallaxContainer = styled(Plx)`
  position: absolute;
  top: -2em;
  right: 0;
  left: 0;
  bottom: -2em;
`;

const HeroParallaxHider = styled(Plx)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
`;

const defaultParallaxData = [
  {
    start: "self",
    end: "self",
    endOffset: "150vh",
    easing: "easeOut",
    properties: [
      {
        startValue: -2,
        endValue: 2,
        unit: "em",
        property: "translateY",
      },
    ],
  },
];

const HeroParallax = ({ children, parallaxData, className }) => (
  <HeroParallaxHider>
    <HeroParallaxContainer parallaxData={parallaxData || defaultParallaxData} className={className}>
      {children}
    </HeroParallaxContainer>
  </HeroParallaxHider>
);

export default HeroParallax;
