import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import NamedSection from "../../components/NamedSection";
import HeroStage from "./HeroStage";
import LearnMore from "../../components/LearnMore";

const Subheading = styled.div`
  font-size: ${token.fontSizes.h4};
  margin-bottom: 2em;
  padding: 0.5em 2em 0;

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
    line-height: 1.6;
  }
`;
const Heading = styled.h1`
  padding-top: 2.5em;
  margin-top: 0px;
  margin-bottom: 0.35em;
  line-height: 1.1em;

  @media ${devices.md} {
    padding-top: 2.2em;
    margin-top: 0;
    letter-spacing: -3px;
    line-height: 0.93em;
  }
`;

const HeroesContent = styled.div`
  position: relative;
  text-align: center;
`;

const TopRightShards = styled.div`
  display: none;

  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 100%;
    height: 32em;
    top: -2.3em;
    right: 0;
    pointer-events: none;
  }
`;

const TopLeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 32em;
  top: 0;
  right: 0;
  pointer-events: none;

  @media ${devices.md} {
    display: none;
  }
`;

const BottomLandscapeContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75em;

  @media ${devices.md} {
    height: 55em;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 5%);
  pointer-events: none;
`;

const BottomDarkLandscape = () => (
  <BottomLandscapeContainer>
    <Image layout="fill" src="/imgs/store/mountains-dark-bottom.png" objectPosition="60% bottom" objectFit="cover" />
    <Shader />
  </BottomLandscapeContainer>
);

const HeroesSection = ({ selectedHero, heroes }) => {
  return (
    <NamedSection name="HEROES" topMark="27em" overflowHidden={false} sideMargin={false}>
      <TopLeftShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="top right"
          src="/imgs/shards/black-top-left-shards.png"
        />
      </TopLeftShards>
      <TopRightShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="top right"
          src="/imgs/store/black-top-right-shards.png"
        />
      </TopRightShards>
      <BottomDarkLandscape />
      <HeroesContent>
        <Heading>
          HERO
          <br />
          SUMMONS
        </Heading>
        <Subheading>
          Collect Guardians and build your dream team.
          <br />
          Each hero is unique and offers deep, strategic combinations for you and your Guild.
          <br />
        </Subheading>

        <LearnMore href="https://guildofguardians.medium.com/heroes-guild-of-guardians-founder-sale-393cd0dc33fd" />

        <HeroStage heroes={heroes} hero={selectedHero} />
      </HeroesContent>
    </NamedSection>
  );
};

export default HeroesSection;
