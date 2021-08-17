import React from "react";
import styled from "styled-components";
import token, { devices } from "../styles/token";
import { doubleBorderCss } from "./DoubleBorder";

const HeroContainer = styled.div`
  --bottom-blur-border-opacity: var(--bottom-border-opacity, 0.65);
  position: relative;
  color: ${token.palette.light.main};

  height: ${({ height, mobileHeight, fullscreen }) =>
    fullscreen ? `calc(100vh - ${token.header.height})` : mobileHeight || height || "14em"};

  @media ${devices.md} {
    height: ${({ height, fullscreen }) => (fullscreen ? `calc(100vh - ${token.header.height})` : height || "14em")};
  }

  @media ${devices.xl} {
    height: ${({ height, fullscreen }) => (fullscreen ? `calc(100vh - ${token.header.heightXl})` : height || "20em")};
  }
`;

const HeroBlur = styled.div`
  position: absolute;

  //opacity: 0.5;
  //background: ${token.palette.dark.main};
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    opacity: inherit;
  }
`;
const blurSize = "2vw";
const HeroBlurTop = styled(HeroBlur)`
  top: 0;
  right: 0;
  left: 0;
  height: ${blurSize};
  background: rgba(${token.palette.dark.mainRGB}, 0.5);
`;
const HeroBlurRight = styled(HeroBlur)`
  top: ${blurSize};
  bottom: ${blurSize};
  right: 0;
  width: ${blurSize};
  background: linear-gradient(
    rgba(${token.palette.dark.mainRGB}, 0.5),
    rgba(${token.palette.dark.mainRGB}, var(--bottom-blur-border-opacity))
  );
`;

const HeroBlurBottom = styled(HeroBlur)`
  height: ${blurSize};
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(${token.palette.dark.mainRGB}, var(--bottom-blur-border-opacity));
`;
const HeroBlurLeft = styled(HeroBlur)`
  width: ${blurSize};
  top: ${blurSize};
  bottom: ${blurSize};
  left: 0;
  background: linear-gradient(
    rgba(${token.palette.dark.mainRGB}, 0.5),
    rgba(${token.palette.dark.mainRGB}, var(--bottom-blur-border-opacity))
  );
`;

const space = token.spaces.sm;
const HeroContent = styled.div`
  position: absolute;
  left: calc(${blurSize});
  right: calc(${blurSize});
  bottom: calc(${blurSize});
  top: calc(${blurSize});

  background: linear-gradient(
    rgba(0, 0, 0, 0.2),
    rgba(${token.palette.dark.mainRGB}, 0.1),
    rgba(${token.palette.dark.mainRGB}, 0.3) 95%
  );

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  @media ${devices.md} {
    left: calc(${blurSize} - ${space});
    right: calc(${blurSize} - ${space});
    bottom: ${blurSize};
    top: ${blurSize};
    ${doubleBorderCss}
    position: absolute;
    border-color: ${token.palette.orange.dark};

    ::before {
      border-color: ${token.palette.orange.dark};
    }
  }
`;

const HeroBanner = ({ mobileHeight, height, borderColor, background, children, fullscreen, className }) => (
  <HeroContainer height={height} mobileHeight={mobileHeight} className={className} fullscreen={fullscreen}>
    {background}
    <HeroBlurTop />
    <HeroBlurRight />
    <HeroBlurBottom />
    <HeroBlurLeft />
    <HeroContent color={borderColor}>{children}</HeroContent>
  </HeroContainer>
);

export default HeroBanner;
