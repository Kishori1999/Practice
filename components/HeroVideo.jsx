import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "../../components";
import { ActionCallButtonLinkClass } from "./ActionCallButton";
import token, { devices } from "../styles/token";
import { AbsoluteBorder } from "./DoubleBorder";
import WatchTrailerSection from "./WatchTrailerSection";
import { FEATURE_IS_COMING_SOON_MODE } from "../../constants";

const HeroContainer = styled(motion.div)`
  position: relative;
  //width: 100%;
  //height: auto;
  color: ${token.palette.light.main};
  overflow: hidden;
  height: calc(100vh - ${token.header.height});

  @media ${devices.xl} {
    height: calc(100vh - ${token.header.heightXl});
  }
`;

const HeroBlur = styled.div`
  position: absolute;

  //opacity: 0.5;
  //background: ${token.palette.dark.main};
  /*
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    opacity: inherit;
  }
   */
`;
const blurSize = "2.2vw";
const opacityBottom = 0.98;
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
    rgba(${token.palette.dark.mainRGB}, ${opacityBottom})
  );
`;

const HeroBlurBottom = styled(HeroBlur)`
  height: ${blurSize};
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(${token.palette.dark.mainRGB}, ${opacityBottom});
`;
const HeroBlurLeft = styled(HeroBlur)`
  width: ${blurSize};
  top: ${blurSize};
  bottom: ${blurSize};
  left: 0;
  background: linear-gradient(
    rgba(${token.palette.dark.mainRGB}, 0.5),
    rgba(${token.palette.dark.mainRGB}, ${opacityBottom})
  );
`;

const HeroCover = styled(motion.div)`
  position: absolute;
  left: ${blurSize};
  right: ${blurSize};
  bottom: ${blurSize};
  top: ${blurSize};

  padding: 2em;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  @media ${devices.md} {
    position: absolute;
    padding: 3em;
    border-color: ${token.palette.orange.dark};

    ::before {
      border-color: ${token.palette.orange.dark};
    }
  }
`;
const distance = "0.6em";
const DoubleBorder = styled(AbsoluteBorder)`
  display: none;
  -webkit-transform: translate3d(0, 0, 0);
  @media ${devices.md} {
    display: block;
    border-color: ${token.palette.orange.dark};
    top: 0;
    bottom: 0;
    left: -${distance};
    right: -${distance};

    ::before {
      border-color: ${token.palette.orange.dark};
    }
  }
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  height: 18vw;
  width: 100%;
  max-height: 450px;
  min-height: 50px;
  margin-bottom: 2em;
  margin-top: 10.5em;
  z-index: 500;

  @media ${devices.lg} {
    height: 14vw;
    margin-top: 9vw;
    margin-bottom: 1em;
  }

  @media ${devices.xl} {
    height: 8.6vw;
    width: 41.55vw;
  }
`;

const SubHeader = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  font-size: ${token.fontSizes.h3};
  font-family: ${token.fontFamily.secondary};
  font-weight: 700;
  align-items: center;
  text-align: center;
  margin-bottom: 1.2em;
  margin-top: 0.5em;
  letter-spacing: 1.2px;
  line-height: 1.35;

  @media ${devices.xl} {
    display: none;
  }
`;

const SubHeaderDesktop = styled.div`
  display: none;

  @media ${devices.xl} {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    font-size: ${token.fontSizes.h4};
    font-family: ${token.fontFamily.secondary};
    font-weight: 700;
    align-items: center;
    text-align: center;
    margin-bottom: 1em;
    margin-top: 0.4em;
    letter-spacing: 1px;
    height: 2.7em;
  }
`;

const Video = styled.video`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(-45%, -50%);

  height: 100%;
  width: 177.77777778vh; /* 100 * 16 / 9 */
  min-width: 100%;
  min-height: 56.25vw; /* 100 * 9 / 16 */

  @media (orientation: landscape) {
    left: 45%;
  }

  @media screen and (min-width: 460px) {
    left: 80%;
    @media (orientation: landscape) {
      left: 45%;
    }
  }

  @media ${devices.sm} {
    left: 60%;

    @media (orientation: landscape) {
      left: 45%;
    }
  }

  @media ${devices.md} {
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Loadbg = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  height: 100%;
  width: 177.77777778vh; /* 100 * 16 / 9 */
  min-width: 100%;
  min-height: 56.25vw; /* 100 * 9 / 16 */
`;

const BuyButton = styled(ActionCallButtonLinkClass)`
  font-size: ${token.fontSizes.base};

  margin-bottom: 4em;

  @media ${devices.md} {
    font-size: 0.9rem;
    padding: 2.4em 5.5em;
    margin-top: 0.5rem;
  }

  @media ${devices.lg} {
    padding: 2em 5em;
    margin-bottom: 2em;
    height: 5.5em;
  }
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const contentDelay = token.homepage.loadingTime + 0.7;
const logoVariants = {
  start: {
    y: "5em",
  },
  normal: {
    y: 0,
    ease: "easeIn",
    zIndex: 100,
    transition: {
      duration: 0.5,
      delay: contentDelay,
      zIndex: {
        delay: contentDelay,
      },
    },
  },
};

const variantsSubheader = {
  start: {
    opacity: 0,
    y: -80,
  },
  normal: {
    y: 0,
    opacity: 1,
    ease: "easeOut",
    transition: {
      duration: 1,
      delay: contentDelay,
    },
  },
};

const startOpacity = 0.2;
const variantsBorder = {
  start: {
    opacity: 0,
  },
  normal: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      delay: token.homepage.loadingTime + 0.5,
      duration: 1,
    },
  },
};

const blurDuration = 0.5;
const variantsBlur = {
  start: {
    opacity: startOpacity,
  },
  normal: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      delay: 0,
      duration: blurDuration,
      opacity: {
        delay: token.homepage.loadingTime + 0.5,
        duration: 2,
      },
    },
  },
};

const SubheadingBlock = styled(motion.div)`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  -webkit-transform: translate3d(0, 0, 0);
`;

const LoaderImage = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Logo = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
`;

const variantsLoaderImage = {
  start: {
    clipPath: "inset(-2px 0px 0px 0%)",
  },
  normal: {
    clipPath: "inset(0px 0px 0px 100%)",
    transition: {
      duration: token.homepage.loadingTime,
      display: {
        delay: token.homepage.loadingTime,
      },
    },
  },
};

const BlurAnimationsContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  -webkit-transform: translate3d(0, 0, 0);
`;

const MainLogo = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const logoStyle = `
.logo {
fill: #f3f7f8;
}
`;

const logoDarkStyle = `
.darklogo {
fill: #192333;
stroke: #192333;
stroke-width:3;
}
`;
const HeroVideoContainer = () => {
  return (
    <HeroContainer>
      <svg style={{ display: "none" }}>
        <defs>
          <g id="logo">
            <g id="Layer_1">
              <path
                className="cls-1"
                d="M320,239.42V383.56a4.35,4.35,0,0,1-2.2,4,4,4,0,0,1-4.41,0l-20.28-10.14-22-11a100.86,100.86,0,0,1-12.78,6.17q-6.62,2.64-13.22,4.85A224.42,224.42,0,0,1,176.32,388q-44.08,0-77.14-13.89T44.08,337.5A149.65,149.65,0,0,1,11,285.7a165,165,0,0,1,0-118.57,149.75,149.75,0,0,1,33.06-51.8q22-22.69,55.1-36.58t77.14-13.89A231.89,231.89,0,0,1,247.51,76.1,155.93,155.93,0,0,1,309,112.91a5.37,5.37,0,0,1,0,7l-65.24,55.1c-1.18,1.18-2.35,1.48-3.52.88a5.2,5.2,0,0,1-3.09-2.64,155.22,155.22,0,0,0-20.28-28.87,91.34,91.34,0,0,0-27.77-21.38,76.31,76.31,0,0,0-25.34-7.94,63.21,63.21,0,0,0-26.67,2.21,59,59,0,0,0-23.14,13A72.45,72.45,0,0,0,97.86,151.7,92.37,92.37,0,0,0,87.5,187.85a191.27,191.27,0,0,0,.66,37.9q5.3,42.33,36.15,72.3a148.48,148.48,0,0,0,51.57,32.17,172.52,172.52,0,0,0,60.83,11V239l-12.34-32.62a3.84,3.84,0,0,1,.44-4,4.32,4.32,0,0,1,4-2.2h100.5a4.32,4.32,0,0,1,4,2.2,3.84,3.84,0,0,1,.45,4Z"
              />
              <path
                className="cls-1"
                d="M405.47,125.39V272.87a22.9,22.9,0,0,0,5.84,15.85,34.07,34.07,0,0,0,14.51,9.51,59.93,59.93,0,0,0,18.69,3.17,49.36,49.36,0,0,0,18.68-3.17,38.73,38.73,0,0,0,14.52-9.51q5.84-6.18,5.84-15.85V125.39L474.21,102a2.88,2.88,0,0,1,.33-3,3.29,3.29,0,0,1,3-1.67h76.08a3.29,3.29,0,0,1,3,1.67,2.88,2.88,0,0,1,.33,3l-9.34,23.36V271.53a46.77,46.77,0,0,1-8.84,28.2,70.27,70.27,0,0,1-23.36,20.19,124.9,124.9,0,0,1-32.86,12.17,172.55,172.55,0,0,1-75.41,0,125,125,0,0,1-32.87-12.17,70.24,70.24,0,0,1-23.35-20.19,46.71,46.71,0,0,1-8.84-28.2V125.39L332.73,102a2.88,2.88,0,0,1,.34-3,3.28,3.28,0,0,1,3-1.67h76.07a3.29,3.29,0,0,1,3,1.67,2.9,2.9,0,0,1,.33,3Z"
              />
              <path
                className="cls-1"
                d="M603.84,267.53l21.35,58.39a2.92,2.92,0,0,1-.33,3,3,3,0,0,1-2.67,1.67H538.44a3.25,3.25,0,0,1-3-1.67,2.88,2.88,0,0,1-.34-3l78.41-200.2-6.67-24a3.91,3.91,0,0,1,.67-3,3.16,3.16,0,0,1,2.67-1.34h78.07c1.34,0,2.45.79,3.34,2.34L780,325.92a2.92,2.92,0,0,1-.33,3,3.27,3.27,0,0,1-3,1.67H715.61a3.4,3.4,0,0,1-3.33-2.33l-23.69-60.73Zm6.67-38h63.06l-31.36-80.41Z"
              />
              <path
                className="cls-1"
                d="M786.34,102a2.88,2.88,0,0,1,.34-3,3.26,3.26,0,0,1,3-1.67H903.79a143.07,143.07,0,0,1,40.54,5.84,91.59,91.59,0,0,1,35.54,19.86,78.72,78.72,0,0,1,19.18,25.69,81.29,81.29,0,0,1,7.51,31.36,77,77,0,0,1-3.34,24.69,82.77,82.77,0,0,1-10.67,22.36,88.21,88.21,0,0,1-17.86,19,94.88,94.88,0,0,1-22.18,13l24.69,38.7,19.35,27a3.6,3.6,0,0,1,0,3.67,3.2,3.2,0,0,1-3,2H922.14a3.27,3.27,0,0,1-3-1.67l-40-60.72H859.41v34l9.35,23.36a2.9,2.9,0,0,1-.34,3,3.25,3.25,0,0,1-3,1.67H789.35a3.27,3.27,0,0,1-3-1.67,2.9,2.9,0,0,1-.33-3l9.34-23.36V125.39Zm73.07,127.46h28.37q17.67,0,29.52-6.84T935,205.3a46.34,46.34,0,0,0,0-45q-5.85-10.51-17.69-17.35t-29.52-6.84H859.41Z"
              />
              <path
                className="cls-1"
                d="M1003.73,102a2.88,2.88,0,0,1,.33-3,3.29,3.29,0,0,1,3-1.67h118.79q25.68,0,45,10a97.31,97.31,0,0,1,32.2,26.36,112.52,112.52,0,0,1,19.18,37.37,148.14,148.14,0,0,1,0,85.75,112.33,112.33,0,0,1-19.18,37.37,96.94,96.94,0,0,1-32.2,26.36q-19.35,10-45,10H1007.06a3.27,3.27,0,0,1-3-1.67,2.81,2.81,0,0,1-.33-3l9.34-23.36V125.73Zm73.4,189.86h33.37q17.67,0,29.52-11.53t17.69-28.93a123,123,0,0,0,0-74.9q-5.85-17.4-17.69-28.92t-29.52-11.54h-33.37Z"
              />
              <path
                className="cls-1"
                d="M1298.35,125.72V302.57l9.34,23.35a2.9,2.9,0,0,1-.33,3,3.27,3.27,0,0,1-3,1.67h-76.08a3.26,3.26,0,0,1-3-1.67,2.9,2.9,0,0,1-.34-3l9.35-23.35V125.72l-9.35-23.35a2.9,2.9,0,0,1,.34-3,3.26,3.26,0,0,1,3-1.67h76.08a3.27,3.27,0,0,1,3,1.67,2.9,2.9,0,0,1,.33,3Z"
              />
              <path
                className="cls-1"
                d="M1382.43,267.53l21.35,58.39a2.92,2.92,0,0,1-.33,3,3,3,0,0,1-2.67,1.67H1317a3.25,3.25,0,0,1-3-1.67,2.88,2.88,0,0,1-.34-3l78.41-200.2-6.67-24a4,4,0,0,1,.67-3,3.16,3.16,0,0,1,2.67-1.34h78.07c1.34,0,2.45.79,3.34,2.34l88.42,226.22a2.92,2.92,0,0,1-.33,3,3.27,3.27,0,0,1-3,1.67H1494.2a3.4,3.4,0,0,1-3.33-2.33l-23.69-60.73Zm6.67-38h63.06l-31.36-80.41Z"
              />
              <path
                className="cls-1"
                d="M1749.11,261.19V134.73l-13-32.7a2.88,2.88,0,0,1,.34-3,3.26,3.26,0,0,1,3-1.67h57.72a3.29,3.29,0,0,1,3,1.67,2.93,2.93,0,0,1,.33,3l-13,32.7V326.92c0,2.45-1.23,3.67-3.67,3.67h-68.74a3.27,3.27,0,0,1-3-1.67l-96.43-162.16V293.22l13,32.7a2.88,2.88,0,0,1-.33,3,3.27,3.27,0,0,1-3,1.67H1567.6a3.27,3.27,0,0,1-3-1.67,2.88,2.88,0,0,1-.33-3l13-32.7V125.72l-9.34-23.35a2.88,2.88,0,0,1,.33-3,3.27,3.27,0,0,1,3-1.67h78.41a3.27,3.27,0,0,1,3,1.67Z"
              />
              <path
                className="cls-1"
                d="M2055.89,97.92a3.67,3.67,0,0,1-.88,3.53L2010.93,164a4.66,4.66,0,0,1-7.93,0,145.82,145.82,0,0,0-16.09-23.14,139.1,139.1,0,0,0-21.16-20.28,101.81,101.81,0,0,0-25.12-14.32,75.77,75.77,0,0,0-28-5.29,34.78,34.78,0,0,0-12.78,2.42,19,19,0,0,0-9.7,8.6,20.54,20.54,0,0,0-3.3,10.36,29.93,29.93,0,0,0,1.54,10.8,38.8,38.8,0,0,0,8.38,13.66,68.29,68.29,0,0,0,12.34,10.58q7.48,4.86,15.65,9.48t16.09,9l18.51,9.7,18.51,9.7q11.46,6.18,24.91,13.88a250.9,250.9,0,0,1,25.78,17,139.89,139.89,0,0,1,22.05,20.49,72.36,72.36,0,0,1,14.1,24.47,71.2,71.2,0,0,1,3.09,14.54,68.32,68.32,0,0,1-6,34.17,105.47,105.47,0,0,1-20.06,28.87,99.3,99.3,0,0,1-26.67,19.83,153.21,153.21,0,0,1-30.85,11.69,207.71,207.71,0,0,1-32.84,5.73q-16.77,1.53-33.06,1.54a208.28,208.28,0,0,1-67.45-11.24,304.58,304.58,0,0,1-61.71-28.87,5.19,5.19,0,0,1-2.64-3.09c-.6-1.17-.3-2.35.88-3.53l42.76-60.39a4,4,0,0,1,3.52-2.2,4.78,4.78,0,0,1,3.53,1.32,210.38,210.38,0,0,0,21.16,20.06,221.05,221.05,0,0,0,23.36,17A253.75,253.75,0,0,0,1908.89,332a139.73,139.73,0,0,0,28.87,10.58,116,116,0,0,0,21.38,2.64,32.57,32.57,0,0,0,20.5-5.73,22.94,22.94,0,0,0,7-7.93,13.18,13.18,0,0,0,1.76-6.62,23.94,23.94,0,0,0-.88-6.61,33.33,33.33,0,0,0-4.63-10.8,77.89,77.89,0,0,0-7.27-9.47,120.23,120.23,0,0,0-25.35-19.84q-14.77-8.82-30.85-17.19t-32.62-16.53A261.92,261.92,0,0,1,1856,226.64a150.47,150.47,0,0,1-25.34-21.38,69.17,69.17,0,0,1-15.87-27.11,66.07,66.07,0,0,1-3.09-31.3,71.25,71.25,0,0,1,11.46-30.63,100.14,100.14,0,0,1,22.48-24A126.52,126.52,0,0,1,1890.81,71a205.73,205.73,0,0,1,49.6-6.17q31.72,0,58,7.94a281.47,281.47,0,0,1,53.56,22.92,5.82,5.82,0,0,1,2.64,2.64Z"
              />
              <path
                className="cls-1"
                d="M564.9,61.19h-.61l-4.72-2.3a55.27,55.27,0,0,1-16.5,2.22c-18.16,0-36.14-11.11-36.14-31C506.93,10.56,525.7,0,542.81,0c7.68,0,14.49.87,20.6,3.65V14.92H563L552.06,4.13a37.32,37.32,0,0,0-9.34-1.19c-16.06,0-27.41,10.47-27.41,26.82,0,16.19,10.65,28.57,28.28,28.57A41.3,41.3,0,0,0,557,56.43V35.71l-7.16-3.65v-.47h21.3v.47l-6.28,3.73Z"
              />
              <path
                className="cls-1"
                d="M678.92,40V5.08l-6.29-3.81V.79h20.7v.48l-6.47,3.81V40.32c0,14.76,10,17.69,19.47,17.69,7.16,0,18.51-2.14,18.51-16.9V5.63l-6.72-4.36V.79h16.76v.48l-6.37,4.29v34c0,15.08-8.21,21.59-24.45,21.59C693.15,61.11,678.92,57.38,678.92,40Z"
              />
              <path
                className="cls-1"
                d="M837.29,1.27V.79h20.43v.48l-6.28,3.81v51l6.28,3.73v.48H837.29v-.48l6.29-3.73v-51Z"
              />
              <path
                className="cls-1"
                d="M961.1,59.84l6.28-3.73v-51L961.1,1.27V.79h20.51v.48l-6.37,3.81v52.3h23.22L1007.8,46h.44V60.32H961.1Z"
              />
              <path
                className="cls-1"
                d="M1174,30.4c0,19.12-16.24,29.92-36.76,29.92h-26.71v-.48l6.28-3.73v-51l-6.28-3.81V.79h24.27C1160.15.79,1174,12.38,1174,30.4ZM1124.71,3.73V57.46h12.83c17.38,0,28.12-10,28.12-26.19s-8.91-27.54-32.13-27.54Z"
              />
              <path
                className="cls-1"
                d="M1399.64,30.79c0-19.44,16.5-30.79,33.44-30.79,17.81,0,33.52,12.14,33.52,30.4,0,19.44-16.32,30.71-33.52,30.71C1414.57,61.11,1399.64,49,1399.64,30.79Zm58.49,1c0-16.58-10.65-28.88-25.4-28.88-14.5,0-24.71,10.23-24.71,26.27,0,16.74,10.56,29.12,25.32,29.12C1447.92,58.33,1458.13,48.09,1458.13,31.82Z"
              />
              <path
                className="cls-1"
                d="M1592.85,60.32h-22.09v-.48l6.29-3.73v-51l-6.29-3.81V.79h48.54V14.13h-.44l-9.08-10.24H1584.9V29.13h21.48l5.94-6.91h.43V39.84h-.43l-5.94-7.7H1584.9v24l7.95,3.73Z"
              />
              <path
                className="cls-1"
                d="M1664.57,378.69v-1H1116l-12.5,12.5h-15.7l-21.6,21.6-21.05-21.05h-14.78l-13-13.05H468.67v1h548.19l12.05,12.05H534.23v1h495.68l36.71,36.71,37.26-37.26H1599v-1H1104.88l11.5-11.5ZM1066.62,427l-35.29-35.3h13.36l21.47,21.46,22-22h14.29Z"
              />
            </g>
          </g>
        </defs>
      </svg>
      <Loadbg>
        <Image objectFit="cover" layout="fill" src="/imgs/home/small_thumbnail.png" quality={1} priority />
      </Loadbg>

      <Video id="hero-video-blur" playsInline autoPlay loop muted width="100%" height="auto">
        <source src="/vids/gog-dark.mp4" type="video/mp4" />
        {/*
                <source
                    src="/vids/gog.h264.mp4"
                    type="video/mp4; codecs=avc1.4D401E"/>
                <source
                    src="/vids/gog.hevc.mp4"
                    type="video/mp4; codecs=hevc"/>
                    */}
      </Video>

      <BlurAnimationsContainer initial="start" animate="normal" variants={variantsBlur}>
        <HeroBlurTop />
        <HeroBlurRight />
        <HeroBlurBottom />
        <HeroBlurLeft />
      </BlurAnimationsContainer>
      <HeroCover>
        <DoubleBorder distance={distance} initial="start" animate="normal" variants={variantsBorder} />
        <Filler />
        <LogoContainer initial="start" animate="normal" variants={logoVariants}>
          <Logo>
            <MainLogo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2068 428.45">
              <defs>
                <style>{logoStyle}</style>
              </defs>
              <use className="logo" href="#logo" />
            </MainLogo>
          </Logo>
          <LoaderImage initial="start" animate="normal" variants={variantsLoaderImage}>
            <MainLogo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2068 428.45">
              <defs>
                <style>{logoDarkStyle}</style>
              </defs>
              <use className="darklogo" href="#logo" />
            </MainLogo>
          </LoaderImage>
        </LogoContainer>
        <SubheadingBlock initial="start" animate="normal" variants={variantsSubheader}>
          <SubHeader>
            <span>TURN YOUR</span>
            <span>GAMING PASSION</span>
            <span>INTO NFTS</span>
          </SubHeader>
          <SubHeaderDesktop>
            <span>TURN YOUR GAMING</span>
            <span>PASSION INTO NFTS</span>
          </SubHeaderDesktop>
          {FEATURE_IS_COMING_SOON_MODE ? (
            <BuyButton>COMING SOON</BuyButton>
          ) : (
            <Link href="/store" passHref>
              <BuyButton>BUY NOW</BuyButton>
            </Link>
          )}

          <WatchTrailerSection />
        </SubheadingBlock>
      </HeroCover>
    </HeroContainer>
  );
};

export default HeroVideoContainer;
