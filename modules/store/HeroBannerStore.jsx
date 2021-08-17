import React from "react";
import Image from "next/image";
import styled from "styled-components";
import HeroParallax from "../../components/animations/HeroParallax";
import ActionCallButton from "../../components/ActionCallButton";
import token, { devices } from "../../styles/token";
import HeroBanner from "../../components/HeroBanner";

const BuyButton = styled(ActionCallButton)`
  display: none;
  margin-top: 3.5em;
  margin-bottom: 4em;
  margin-left: 1em;
  margin-right: 1em;
  padding-top: 2em;
  padding-bottom: 2em;

  @media ${devices.md} {
    display: block;
  }
`;

const Media = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
`;

const BottomLeftShards = styled.div`
  display: none;

  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 100%;
    height: 40em;
    bottom: -11em;
    left: 0;
    pointer-events: none;
    z-index: 2;
  }
`;
const BottomRightShards = styled.div`
  position: absolute;
  height: 60em;
  width: 55em;
  bottom: 0;
  right: 0;
  pointer-events: none;
  z-index: 2;
  @media ${devices.md} {
    display: none;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(${token.palette.dark.mainRGB}, 0.1) 0,
    rgba(${token.palette.dark.mainRGB}, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Heading = styled.h1`
  color: ${token.palette.light.main};
  font-size: ${token.fontSizes.h1};
  letter-spacing: -0.04125em;

  text-align: center;
  max-height: 450px;
  min-height: 50px;
  margin-bottom: 0;
  margin-top: 0em;
`;
const SubHeading = styled.h2`
  color: ${token.palette.light.main};
  font-size: 2.2rem;
  text-align: center;
  margin-top: 0;
  letter-spacing: 0;
  padding: 1em 2em;

  @media ${devices.md} {
    padding: 0;
    letter-spacing: -1px;
  }
`;

const StyledHeroBanner = styled(HeroBanner)`
  --bottom-border-opacity: 1;
  z-index: 1;
`;

const BuyButtonsRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: stretch;
  width: 100%;
`;

const Background = (
  <Media>
    <HeroParallax>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center top"
        src="/imgs/store/hero-image.jpg"
        sizes="(max-width: 800px) 1000px"
        alt="banner"
        priority
      />
    </HeroParallax>
    <Shader />

    <BottomLeftShards>
      <Image layout="fill" objectFit="contain" objectPosition="bottom left" src="/imgs/shards/white-left-shards.png" />
    </BottomLeftShards>
    <BottomRightShards>
      <Image
        layout="fill"
        objectFit="contain"
        objectPosition="bottom right"
        src="/imgs/shards/white-bottom-right-shards.png"
      />
    </BottomRightShards>
  </Media>
);

const HeroBannerStore = () => (
  <StyledHeroBanner background={Background} height="52em" mobileHeight="48em">
    <Heading>FOUNDER SALE</Heading>
    <SubHeading>UP TO 20% DISCOUNT FOR A LIMITED TIME ONLY</SubHeading>
    <BuyButtonsRow>
      <BuyButton
        onClick={() => {
          document.getElementById("hero_buy_section").scrollIntoView({ behavior: "smooth" });
        }}
      >
        BUY HEROES
      </BuyButton>
      <BuyButton
        onClick={() => {
          document.getElementById("pets_and_energy_section").scrollIntoView({ behavior: "smooth" });
        }}
      >
        BUY PETS AND ENERGY
      </BuyButton>

      <BuyButton
        onClick={() => {
          document.getElementById("guild_section").scrollIntoView({ behavior: "smooth" });
        }}
      >
        BUY GUILDS
      </BuyButton>
    </BuyButtonsRow>
  </StyledHeroBanner>
);

export default HeroBannerStore;
