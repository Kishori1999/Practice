import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import DiamondWithArrow from "../../components/DiamondWithArrow";
import DoubleDiamond from "../../components/DoubleDiamond";
import SimpleArrow from "../../components/SimpleArrow";

const Section = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 12.5em;
  background: ${token.palette.dark.main};

  padding-top: 3em;
  @media ${devices.md} {
    padding-top: 0.8em;
  }
`;

const HeroesContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 2em;

  @media ${devices.md} {
    padding: 0 5em 5em;
  }
`;

const SelectionMobile = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  @media ${token.store.sliderBreak} {
    display: none;
  }
`;
const DisplayDesktop = styled.div`
  display: none;
  @media ${token.store.sliderBreak} {
    display: block;
  }
`;

const UpperLine = styled.div`
  position: absolute;
  height: 1px;
  background: ${token.palette.orange.main};
  top: 55%;
  left: 0;
  right: 0;
`;

const BottomLine = styled.div`
  position: absolute;
  height: 1px;
  background: ${token.palette.orange.main};
  top: 44%;
  left: 0;
  right: 0;
`;

const HeroTitle = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  top: -105%;
  right: 0;
  left: 0;
  padding-bottom: 0;
`;

const HeroName = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  letter-spacing: -0.0375em;
  color: ${token.palette.light.main};
  line-height: 1em;
  text-transform: uppercase;
  margin-bottom: 0.06em;
  font-size: 3rem;

  @media ${devices.xs} {
    font-size: 4rem;
  }

  @media ${devices.md} {
    font-size: ${token.fontSizes.h1};
    margin-bottom: 6px;
  }
`;

const HeroSubtitle = styled.div`
  height: 1.3em;
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  text-transform: uppercase;
  color: ${token.palette.light.main};
  letter-spacing: 1px;
  font-size: ${token.fontSizes.h4};

  @media ${devices.xs} {
    font-size: ${token.fontSizes.h3};
  }

  @media ${devices.md} {
    font-size: 2rem;
  }
`;

const ArrowSelector = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  pointer-events: auto;
  z-index: 10;
  top: 0;
  bottom: 0;
  padding: 0 2em;
  cursor: pointer;

  @media ${token.store.sliderBreak} {
    display: none;
  }
`;

const LeftArrowSelector = styled(ArrowSelector)`
  left: 0;
`;
const RightArrowSelector = styled(ArrowSelector)`
  right: 0;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const HeroSelection = ({ heroes, selectedHero, onSelect }) => {
  const heroesList = heroes.map(hero => (
    <DiamondWithArrow
      key={hero.name}
      selected={hero.name === selectedHero.name}
      onClick={() => onSelect(hero)}
      scaleOnSelect
      containerWidth={195}
      width={110}
      color="black"
      gapWidth={2}
    >
      <Image objectFit="cover" layout="fill" src={hero.avatarSrc} />
    </DiamondWithArrow>
  ));

  const selectedIndex = heroes.findIndex(h => h.name === selectedHero.name);
  const leftHero = heroes[selectedIndex === 0 ? heroes.length - 1 : selectedIndex - 1];
  const rightHero = heroes[selectedIndex === heroes.length - 1 ? 0 : selectedIndex + 1];

  return (
    <Section>
      <DisplayDesktop>
        <HeroesContainer>{heroesList}</HeroesContainer>
      </DisplayDesktop>
      <SelectionMobile>
        <HeroTitle>
          <LeftArrowSelector onClick={() => onSelect(leftHero)}>
            <SimpleArrow />
          </LeftArrowSelector>
          <Content>
            <HeroName>{selectedHero.name}</HeroName>
            <HeroSubtitle>{selectedHero.title}</HeroSubtitle>
          </Content>
          <RightArrowSelector onClick={() => onSelect(rightHero)}>
            <SimpleArrow right />
          </RightArrowSelector>
        </HeroTitle>
        <UpperLine />
        <BottomLine />
        <DoubleDiamond color={token.palette.dark.main} width={70} onClick={() => onSelect(leftHero)}>
          <Image objectFit="cover" layout="fill" src={leftHero.avatarSrc} />
        </DoubleDiamond>

        <DoubleDiamond color={token.palette.dark.main} gapWidth={6} width={104} onClick={() => onSelect(selectedHero)}>
          <Image objectFit="cover" layout="fill" src={selectedHero.avatarSrc} />
        </DoubleDiamond>

        <DoubleDiamond color={token.palette.dark.main} width={70} onClick={() => onSelect(rightHero)}>
          <Image objectFit="cover" layout="fill" src={rightHero.avatarSrc} />
        </DoubleDiamond>
      </SelectionMobile>
    </Section>
  );
};

export default HeroSelection;
