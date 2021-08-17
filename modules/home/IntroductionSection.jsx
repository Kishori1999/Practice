import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import token, { devices } from "../../styles/token";
import BlackTopLeftShardsComponent from "../../components/shards/BlackTopLeftShards";
import HorizontalScroll from "../../components/animations/HorizontalScroll";
import IntroductionScrollSection from "./IntroductionScrollSection";

const BlackTopLeftShards = styled(BlackTopLeftShardsComponent)`
  z-index: 1;
  @media ${devices.md} {
    display: none;
  }
`;

const HorizontalSection = styled.section`
  @media ${token.homepage.introduction.sliderBreak} {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }
`;

const Partners = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 30px;
  margin: 1em 0;

  @media ${devices.xl} {
    margin: 0;
    grid-template-columns: repeat(3, 270px);
    gap: 60px;
    // grid-template-columns: repeat(2, 270px);
  }
`;

const Partnership = styled.div`
  position: relative;
  border-top: 1px solid #70707030;
  margin: 0 auto;
  text-align: center;
  padding: 1em;
  padding-bottom: 3em;

  @media ${devices.md} {
    border: none;
    padding-bottom: 5.4em;
  }
`;
const PartnershipText = styled.div`
  font-size: ${token.fontSizes.big};

  @media ${devices.md} {
    margin-bottom: 1.6em;
    margin-top: -3.1em;
    font-size: ${token.fontSizes.base};
  }
`;

const ComingSoonText = styled.div`
  font-size: ${token.fontSizes.big};

  @media ${devices.md} {
    margin-top: 1.6em;
    font-size: ${token.fontSizes.base};
  }
`;

const VerticalStripMarkContainer = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 7.5em;
  background: rgba(${token.palette.dark.mainRGB}, 0.02);
  z-index: 10;

  @media ${devices.xl} {
    display: flex;
    align-items: center;
  }
`;

const partners = [
  {
    href: "https://www.immutable.com/",
    src: "/imgs/home/immutable-logo.png",
    width: 265,
  },
  {
    href: "https://blockchaingamealliance.org/",
    src: "/imgs/logos/blockchain-game-alliance.png",
    width: 190,
    height: 35,
  },
  {
    href: "https://www.ubisoft.com/",
    src: "/imgs/logos/ubisoft.png",
    height: 100,
  },
];

const IntroductionSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const partnersList = partners.map(p => (
    <a key={p.href} target="_blank" rel="noreferrer" href={p.href}>
      <Image width={p.width || 265} height={p.height || 53} objectFit="contain" src={p.src} />
    </a>
  ));

  return (
    <>
      <HorizontalSection>
        <HorizontalScroll setIndex={setSelectedIndex}>
          <BlackTopLeftShards />
          <IntroductionScrollSection selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        </HorizontalScroll>
      </HorizontalSection>
      <Partnership>
        <VerticalStripMarkContainer />
        <PartnershipText>Partners</PartnershipText>
        <Partners>{partnersList}</Partners>

        <ComingSoonText>More coming soon...</ComingSoonText>
      </Partnership>
    </>
  );
};

export default IntroductionSection;
