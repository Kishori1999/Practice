import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Plx from "react-plx";
import token, { devices } from "../../styles/token";
import WhiteTopLeftShards from "../../components/shards/WhiteTopLeftShards";
import WhiteBottomRightShardsComponent from "../../components/shards/WhiteBottomRightShards";
import BrownBottomLeftShards from "../../components/shards/BrownBottomLeftShards";
import { Link } from "../../../components";
import { ActionCallButtonLinkClass } from "../../components/ActionCallButton";
import NamedSection from "../../components/NamedSection";
import { DoubleBorder } from "../../components/DoubleBorder";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const RewardsText = styled.div`
  text-align: center;
  z-index: 10;

  @media ${devices.md} {
    padding: 0;
    padding-top: 0.8em;
    padding-bottom: 1.4vw;
    padding-left: 2.2em;
    text-align: left;
  }
`;

const RewardsIntroText = styled.div`
  font-size: ${token.fontSizes.h4};

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
    margin-top: 0;
    line-height: 1.4;
    margin-bottom: 0;
  }
  @media ${devices.lg} {
    padding-right: 8vw;
  }
`;

const Content = styled(DoubleBorder)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-items: center;
  padding: 8em 1em 36em;
  letter-spacing: 1px;
  margin-top: 1em;
  margin-bottom: 1em;

  @media ${devices.md} {
    align-items: flex-start;
    padding: 4vw 5% 2vw 58%;
  }

  @media ${devices.xl} {
    align-items: flex-start;
    padding: 4vw 2% 2vw 58%;
  }

  @media ${devices.xxl} {
    align-items: flex-start;
    padding: 4vw 10% 2vw 58%;
  }
`;

const heroWidth = 64;
const heroAspect = 1.456015524;

const height = heroWidth / heroAspect;
const Hero = styled(motion.div)`
  position: absolute;
  width: ${heroWidth}em;
  height: ${height}em;
  bottom: 0;
  left: -24em;
  margin-left: -25vw;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;

  @media screen and (min-width: 350px) {
    margin-left: -25vw;
    left: -20em;
  }

  @media screen and (min-width: 370px) {
    left: -18em;
  }

  @media ${devices.sm} {
    margin-left: 0;
    left: -17vw;
    width: calc(${heroWidth} * 1.3) em;
    height: calc(${height} * 1.3) em;
  }

  @media ${devices.md} {
    left: -45vw;
    width: 110%;
    height: ${80 / heroAspect}em;
    overflow: auto;
  }

  @media ${devices.xl} {
    left: -20vw;
    width: 80%;
    height: ${75 / heroAspect}em;
  }

  @media ${devices.xxl} {
    left: 0.5vw;
    width: 59%;
    height: ${80 / heroAspect}em;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;

  @media ${devices.md} {
    display: block;
  }
`;

const BuyButton = styled(ActionCallButtonLinkClass)`
  position: relative;
  z-index: 3;
  margin-bottom: 10em;
  margin-top: 1em;

  @media ${devices.md} {
    margin-bottom: 2.8vw;
    margin-left: 3em;
    padding: 2em 5em;
    margin-top: 0;
    align-self: flex-start;
  }
`;
const RewardsValue = styled.h2`
  color: ${token.palette.light.main};
  font-weight: bold;
  font-size: ${token.fontSizes.h4};
  line-height: 1.3;

  @media ${devices.md} {
    letter-spacing: 0.01em;
  }
`;
const MoneyValue = styled.span`
  letter-spacing: 1px;
  font-size: 4.4rem;

  @media ${devices.xl} {
    font-size: 4.1rem;
    letter-spacing: 1px;
    font-weight: bold;
    margin-top: 0;
  }
`;

const WhiteBottomRightShards = styled(WhiteBottomRightShardsComponent)`
  height: 60vw;
  @media ${devices.md} {
    height: 30vw;
  }
`;

const LeftShards = styled(WhiteTopLeftShards)`
  height: 28em;
  margin-left: -3em;

  @media ${devices.md} {
    display: none;
  }
`;

const variantsShards = {
  normal: {
    translateX: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  initial: {
    translateX: -100,
  },
};

const parallaxData = [
  {
    start: "self",
    end: "self",
    endOffset: "150vh",
    easing: "easeOut",
    properties: [
      {
        startValue: 30,
        endValue: 0,
        unit: "em",
        property: "translateY",
      },
    ],
  },
];

const HeroParallax = styled(Plx)`
  position: absolute;
  top: 15em;
  right: 0;
  left: 0;
  bottom: 0;
  transform-origin: bottom right;
  overflow: hidden;
  pointer-events: none;
  user-select: none;

  @media ${devices.md} {
    top: -23em;
  }

  @media ${devices.xxl} {
    top: -20em;
  }
`;

const variantsContent = {
  initial: {
    translateY: 0,
  },
  initialMobile: {
    translateY: 100,
  },
  normal: {
    translateY: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const AnimationTextContainer = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-items: center;
`;

const PresaleSection = () => {
  const dimensions = useWindowDimensions();
  const controls = useAnimation();
  const controlsContent = useAnimation();
  const [shardRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start("normal");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (dimensions.width && dimensions.width < 768) {
      controlsContent.start("initialMobile");
    }
  }, [dimensions]);

  useEffect(() => {
    if (dimensions.width < 768 && inView) {
      controlsContent.start("normal");
    }
  }, [inView, dimensions]);

  return (
    <NamedSection name="Pre-sale" dark>
      <Background>
        <Image layout="fill" objectFit="cover" objectPosition="33% center" src="/imgs/home/ship.jpg" />
      </Background>

      <Content ref={shardRef} distance="0.6em">
        <AnimationTextContainer initial="initial" variants={variantsContent} animate={controlsContent}>
          <RewardsText>
            <RewardsIntroText>
              Buy <b>limited edition heroes</b> and get
            </RewardsIntroText>
            <RewardsValue>
              <MoneyValue>FREE BONUS</MoneyValue> <br />
              Guild of Guardian tokens
            </RewardsValue>
          </RewardsText>
          {FEATURE_IS_COMING_SOON_MODE ? (
            <BuyButton>COMING SOON</BuyButton>
          ) : (
            <Link href="/store" passHref>
              <BuyButton>BUY NOW</BuyButton>
            </Link>
          )}
        </AnimationTextContainer>
      </Content>
      <LeftShards />
      <WhiteBottomRightShards height="30vw" />

      <HeroParallax parallaxData={parallaxData}>
        <Hero>
          <Image layout="fill" objectFit="contain" objectPosition="bottom center" src="/imgs/home/hero-shield.png" />
        </Hero>
      </HeroParallax>
      <BrownBottomLeftShards animate={controls} initial="initial" variants={variantsShards} height="30em" />
    </NamedSection>
  );
};

export default PresaleSection;
