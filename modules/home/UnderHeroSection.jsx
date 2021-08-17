import React, { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import token, { devices } from "../../styles/token";
import MediaCard from "../../components/MediaCard";
import BlackTopLeftShards from "../../components/shards/BlackTopLeftShards";
import IntersectionBlocks from "../../components/IntersectionBlocks";
import { AbsoluteBorder } from "../../components/DoubleBorder";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const UnderHeroSectionContainer = styled.div`
  position: relative;
  padding: 0.5em;
  min-height: 25em;
  margin-bottom: 2em;

  @media ${devices.md} {
    margin-bottom: 0;
  }

  @media ${devices.lg} {
    margin-bottom: 3em;
  }
`;

// const mobileInfoCardAspect = 1.28;
const infoCardAscpect = 1.338645418;

const mobileCardWidth = 28;
const cardWidth = 60;
const InfoCard = styled(MediaCard)`
  height: ${cardWidth / infoCardAscpect}vw;
  flex: 1 0 ${mobileCardWidth}em;
  margin: 1.2em 2.5vw;
  max-width: 100%;

  @media ${devices.sm} {
    height: calc(${90 / 2}vw);
    margin: 1.2em 5vw;
  }

  @media ${devices.md} {
    height: ${18 / infoCardAscpect}em;
    flex: 0 0 ${18}em;
    margin: 0 1em;
  }

  @media screen and (min-width: 880px) {
    height: ${21 / infoCardAscpect}em;
    flex: 0 0 ${21}em;
    margin: 1em;
  }
`;

const UnderBlocks = styled(IntersectionBlocks)`
  @media ${devices.xl} {
    position: absolute;
    margin-top: 1.6em;
  }
  @media ${devices.xxl} {
    left: 0;
    right: 0;
  }
`;

const InfoCardContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  height: 100%;
  padding: 3.2em;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(${token.palette.dark.mainRGB}, 0.98));

  @media ${devices.lg} {
    padding: 2.2em;
  }

  span:nth-child(2) {
    //font-size: 4vh;
    font-size: ${token.fontSizes.h3};
    font-family: ${token.fontFamily.secondary};
    font-weight: bold;
    @media ${devices.md} {
      font-size: ${token.fontSizes.h4};
    }
  }
`;

const CardText = styled.span`
  font-size: ${token.fontSizes.accented};
  @media ${devices.md} {
    font-size: ${token.fontSizes.base};
  }
`;

const CardAccented = styled.span`
  font-size: ${token.fontSizes.h3};
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  @media ${devices.md} {
    font-size: ${token.fontSizes.h4};
  }
`;

const Highlight = styled(AbsoluteBorder)`
  @media ${devices.xl} {
    display: none;
  }
`;

const variantsUnderBlocks = {
  initial: {
    y: 100,
    opacity: 0,
  },
  slide: {
    y: "-50%",
    opacity: 1,
    transition: {
      ease: "easeOut",
      delay: token.homepage.loadingTime + 2.3,
      duration: 1,
    },
  },
  slideMobile: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 2,
    },
  },
};

const UnderHeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const dimensions = useWindowDimensions();

  useEffect(() => {
    if (dimensions.width > 768) {
      controls.start("slide");
    }
  }, [dimensions]);

  useEffect(() => {
    if (dimensions.width < 768 && inView) {
      controls.start("slideMobile");
    }
  }, [inView, dimensions]);

  return (
    <UnderHeroSectionContainer>
      <BlackTopLeftShards />
      <UnderBlocks ref={ref} initial="initial" animate={controls} variants={variantsUnderBlocks}>
        <InfoCard imgSrc="/imgs/home/hero-elemental.png" imgAlt="Registrations" priority>
          <Highlight padding="0.3em" />
          <InfoCardContent>
            <CardText>Over</CardText>
            <CardAccented>120,000</CardAccented>
            <CardText>players pre-registered</CardText>
          </InfoCardContent>
        </InfoCard>

        <InfoCard imgSrc="/imgs/home/heroes-stance.png" imgAlt="Published" priority>
          <InfoCardContent>
            <CardText>Developed by</CardText>
            <CardAccented>STEPICO</CardAccented>
            <CardText>Published by</CardText>
            <CardAccented>IMMUTABLE</CardAccented>
          </InfoCardContent>
        </InfoCard>

        <InfoCard imgSrc="/imgs/home/bird-hero.png" imgAlt="Coming in" objectPosition="50% 40%" priority>
          <InfoCardContent>
            <CardText>$150K OF NFTs</CardText>
            <CardAccented>GIVEN AWAY</CardAccented>
          </InfoCardContent>
        </InfoCard>
      </UnderBlocks>
    </UnderHeroSectionContainer>
  );
};

export default UnderHeroSection;
