import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";

const heroWidth = 80;
const Stage = styled.div`
  position: relative;
  margin: 1em 0em;
  width: ${heroWidth}em;
  height: 42em;
  text-align: center;
  left: 50%;
  transform: translate(-50%);

  @media ${devices.md} {
    transform: none;
    left: initial;
    position: relative;
    margin: 5em auto 4em;
    width: 100%;
    height: 42em;
    text-align: center;
  }
`;

const HeroTitle = styled.div`
  display: none;

  position: absolute;
  flex-flow: column nowrap;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  padding-bottom: 0;

  @media ${token.store.sliderBreak} {
    display: flex;
  }
`;

const HeroName = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-size: ${token.fontSizes.h1};
  font-weight: bold;
  letter-spacing: -0.0375em;
  color: ${token.palette.light.main};
  line-height: 1em;
  text-transform: uppercase;

  @media ${devices.md} {
    font-size: ${token.fontSizes.h1};
    margin-bottom: 6px;
  }
`;

const HeroSubtitle = styled.div`
  font-size: ${token.fontSizes.h2};
  height: 1.3em;
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  text-transform: uppercase;
  color: ${token.palette.light.main};

  @media ${devices.md} {
    font-size: 2rem;
  }
`;

const StageClipper = styled.div`
  position: relative;
  overflow: hidden;
  margin-left: 0em;
  margin-right: 0em;
`;

const HeroHider = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
  transition-delay: ${({ show }) => (show ? "150ms" : 0)};
`;

const HeroStage = ({ hero, heroes }) => {
  const { name, title } = hero;

  const heroesImgs = heroes.map(h => (
    <HeroHider key={h.name} show={hero.name === h.name}>
      <Image objectFit="contain" layout="fill" objectPosition="center bottom" src={h.imgSrc} />
    </HeroHider>
  ));

  return (
    <StageClipper>
      <Stage>
        {/*
                <Image objectFit="contain" layout="fill" objectPosition="center bottom" src={imgSrc}/>
                */}
        {heroesImgs}
        <HeroTitle>
          <HeroName>{name}</HeroName>
          <HeroSubtitle>{title}</HeroSubtitle>
        </HeroTitle>
      </Stage>
    </StageClipper>
  );
};

export default HeroStage;
