import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Plx from "react-plx";
import WhiteBottomRightShardsComponent from "../../components/shards/WhiteBottomRightShards";
import token, { devices } from "../../styles/token";
import WhiteTopRightShardsComponent from "../../components/shards/WhiteTopRightShards";
import { ActionCallButtonLinkClass } from "../../components/ActionCallButton";
import NamedSection from "../../components/NamedSection";
import { DoubleBorder } from "../../components/DoubleBorder";
import { Link } from "../../../components";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const NextGenText = styled.div`
  text-align: center;
  padding: 0 0.5em 4em;
  z-index: 10;
  line-height: 1.3;

  @media ${devices.md} {
    margin-top: 0;
  }
`;

const SubHeader = styled.div`
  text-align: center;
  padding: 0 5%;
  font-size: ${token.fontSizes.h4};
  letter-spacing: 0.4px;
  line-height: 1.3;

  @media ${devices.md} {
    line-height: 1.6;
    font-size: ${token.fontSizes.accented};
    padding: 0 20%;
  }
`;

const Content = styled(DoubleBorder)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 4.5vw;
  padding-bottom: 64vw;

  @media ${devices.sm} {
    padding-bottom: 50vw;
  }

  @media ${devices.md} {
    padding-bottom: 15.5vw;
    margin-bottom: 1em;
    margin-top: 1em;
  }
`;

const heroWidth = 88;
const height = heroWidth / 1.378930818;
const Hero = styled(motion.div)`
  position: absolute;
  width: ${heroWidth}em;
  height: ${height}em;
  bottom: 14em;
  right: -20em;
  pointer-events: none;
  z-index: 1;

  @media ${devices.sm} {
    bottom: 8em;
    right: -16em;
  }

  @media ${devices.md} {
    right: 0;
    bottom: 0em;
    width: 100%;
    height: ${80 / 1.378930818}em;
  }
`;

const Background = styled.div`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 30%;
  pointer-events: none;

  @media ${devices.md} {
    display: block;
  }
`;

const BuyButton = styled(ActionCallButtonLinkClass)`
  z-index: 3;
  margin-top: 2em;

  @media ${devices.md} {
    margin-top: 0em;
  }
`;

const SectionShade = styled.div`
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(${token.palette.dark.mainRGB}, 0.9));
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;

  @media ${devices.md} {
    display: none;
  }
`;

const StyledSection = styled(NamedSection)`
  overflow: hidden;

  @media ${devices.md} {
    overflow: visible;
  }
`;

const Heading = styled.h1`
  color: ${token.palette.light.main};
  font-weight: bold;
  margin-bottom: 0.4em;
  letter-spacing: -1.5px;
  margin-top: 2.5em;
  line-height: 1.2;

  @media ${devices.md} {
    margin-top: 0;
  }
  @media ${devices.lg} {
    margin-top: 3.2vw;
    letter-spacing: -3px;
    margin-bottom: 0.2em;
    letter-spacing: -3px;
  }
`;

const BlockShards = styled(WhiteBottomRightShardsComponent)`
  && {
    right: 0;
    bottom: -5em;
    z-index: 2;
    height: 30em;
    width: 60em;

    @media ${devices.xl} {
      right: auto;
      height: 25em;
      width: 100%;
      left: -77%;
      bottom: -6%;
    }
  }
`;

const WhiteTopRightShards = styled(WhiteTopRightShardsComponent)`
  display: none;
  @media ${devices.xl} {
    display: block;
  }
`;

const variantsContent = {
  normal: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  initial: {
    y: 80,
  },
};

const ContainerContent = styled(motion.div)`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  z-index: 3;
`;

const parallaxData = [
  {
    start: "self",
    end: "self",
    endOffset: "150vh",
    easing: "easeOut",
    properties: [
      {
        startValue: 25,
        endValue: 0,
        unit: "em",
        property: "translateY",
      },
    ],
  },
];

const HeroParallax = styled(Plx)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  transform-origin: bottom right;
`;

const OverflowHeroHider = styled.div`
  position: absolute;
  top: -10em;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const BackgroundShader = styled.div`
  position: absolute;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 98%, rgba(${token.palette.dark.mainRGB}, 1) 100%);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
`;

const GameDetails = () => {
  const controls = useAnimation();
  const [heroRef, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("normal");
    }
  }, [controls, inView]);

  return (
    <StyledSection name="Game Details" dark>
      <Background>
        <Image layout="fill" objectFit="cover" objectPosition="bottom left" src="/imgs/home/pillar.png" />
        <BackgroundShader />
      </Background>

      <Content>
        <ContainerContent animate={controls} initial="initial" variants={variantsContent}>
          <NextGenText ref={heroRef}>
            <Heading>FUTURE OF GAMING NFTS</Heading>
            <SubHeader>
              Kick &quot;pay to play&quot; off a cliff. Play and earn instead in the world&apos;s first mobile RPG where
              every item and hero is part of a real money economy.
            </SubHeader>
          </NextGenText>
          {FEATURE_IS_COMING_SOON_MODE ? (
            <BuyButton>COMING SOON</BuyButton>
          ) : (
            <Link href="/store" passHref>
              <BuyButton>BUY NOW</BuyButton>
            </Link>
          )}
        </ContainerContent>
      </Content>
      <WhiteTopRightShards />

      <OverflowHeroHider>
        <HeroParallax parallaxData={parallaxData}>
          <Hero>
            <Image layout="fill" objectFit="contain" objectPosition="bottom right" src="/imgs/home/hero-beard.png" />
          </Hero>
        </HeroParallax>
      </OverflowHeroHider>

      <SectionShade />
      <BlockShards />
    </StyledSection>
  );
};

export default GameDetails;
