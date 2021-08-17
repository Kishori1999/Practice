import React from "react";
import Image from "next/image";
import styled from "styled-components";
import HeroBanner from "../../components/HeroBanner";
import { devices } from "../../styles/token";
import PageHeading from "../../components/PageHeading";
import LeftFooterShards from "../../components/shards/LeftFooterShards";
import HeroParallax from "../../components/animations/HeroParallax";

const Content = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 4.6em 2em;
  padding-bottom: 10em;

  @media ${devices.md} {
    max-width: 80%;
  }

  @media ${devices.xl} {
    max-width: 60%;
  }

  @media ${devices.xxl} {
    max-width: 45%;
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

const WhiteBottomLeftShards = styled.div`
  position: absolute;
  display: none;
  bottom: -11.5em;
  z-index: 1;
  height: 40em;
  width: 100%;

  @media ${devices.xl} {
    display: block;
  }
`;

const RightShards = styled.div`
  position: absolute;
  display: none;
  right: 0;
  top: -2vw;
  z-index: 1;
  height: 23em;
  width: 100%;

  @media ${devices.xl} {
    display: block;
  }
`;

const RightBannerShards = styled.div`
  position: absolute;
  width: 100%;
  height: 18em;
  bottom: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;

  @media ${devices.md} {
    display: none;
  }
`;
const parallaxData = [
  {
    start: "self",
    end: "self",
    endOffset: "150vh",
    easing: "easeOut",
    properties: [
      {
        startValue: 0,
        endValue: 4,
        unit: "em",
        property: "translateY",
      },
    ],
  },
];

const Background = (
  <Media>
    <HeroParallax parallaxData={parallaxData}>
      <Image layout="fill" objectFit="cover" objectPosition="center 27%" src="/imgs/orc.jpg" alt="banner" priority />
    </HeroParallax>
    <WhiteBottomLeftShards>
      <Image layout="fill" objectFit="contain" objectPosition="bottom left" src="/imgs/shards/white-left-shards.png" />
    </WhiteBottomLeftShards>

    <RightBannerShards>
      <Image
        layout="fill"
        objectFit="contain"
        objectPosition="bottom right"
        src="/imgs/shards/white-bottom-right-shards.png"
      />
    </RightBannerShards>
  </Media>
);

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const PageContent = styled.div`
  position: relative;
  width: 100%;
`;
const LegalPageLayout = ({ children, title }) => (
  <Container>
    <HeroBanner background={Background} height="25em">
      <PageHeading>{title}</PageHeading>
    </HeroBanner>
    <PageContent>
      <RightShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="top right"
          src="/imgs/privacy/privacy-top-right-shards.png"
        />
      </RightShards>
      <Content>{children}</Content>
    </PageContent>
    <LeftFooterShards />;
  </Container>
);

export default LegalPageLayout;
