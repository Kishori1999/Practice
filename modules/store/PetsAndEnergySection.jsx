import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import NamedSection from "../../components/NamedSection";
import LearnMore from "../../components/LearnMore";
import HeroParallax from "../../components/animations/HeroParallax";

const Heading = styled.h1`
  margin-top: -0.2em;
  margin-bottom: 1em;
  letter-spacing: 2px;
  font-size: 4rem;
  color: ${token.palette.light.main};

  @media ${devices.md} {
    margin: 0;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-items: center;
  padding: 10em 1em 21.5em;
  text-align: center;
`;

const InfoText = styled.div`
  margin-bottom: 1.7em;
  font-size: ${token.fontSizes.h4};

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
  }
`;

const Shards = styled.div`
  display: none;

  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 100%;
    height: 20em;
    top: 0;
    right: 0;
    pointer-events: none;
  }
`;

const parallaxData = [
  {
    start: "self",
    end: "self",
    endOffset: "200vh",
    easing: "easeOut",
    properties: [
      {
        startValue: -7,
        endValue: 7,
        unit: "em",
        property: "translateY",
      },
    ],
  },
];
const StyledParallax = styled(HeroParallax)`
  && {
    top: -3em;
  }
`;

const PetsAndEnergySection = () => {
  return (
    <NamedSection name="PETS & ENERGY" dark>
      <Background>
        <StyledParallax parallaxData={parallaxData}>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="20% 20%"
            sizes="(max-width: 600px) 600px"
            src="/imgs/store/pets-energy-bg.jpg"
          />
        </StyledParallax>

        <Shards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top right"
            src="/imgs/shards/white-top-right-shards.png"
          />
        </Shards>
      </Background>

      <Content>
        <Heading>PET AND ENERGY BOOSTS</Heading>

        <InfoText>
          Collect pets or energy tokens which provide a permanent boost to your team.
          <br />
          More crafting materials, more items or more shards!
        </InfoText>
        <LearnMore href="https://guildofguardians.medium.com/pets-energy-boosters-guild-of-guardians-founder-sale-7a111822f97e" />
      </Content>
    </NamedSection>
  );
};

export default PetsAndEnergySection;
