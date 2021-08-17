import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { Parallax } from "react-scroll-parallax";
import token, { devices, breakpoints } from "../../styles/token";
import MediaCard from "../../components/MediaCard";
import VerticalStripMark from "../../components/VerticalStripMark";
import Particles from "../../components/Particles";
import { ActionCallButtonLinkClass } from "../../components/ActionCallButton";
import BlackTopLeftShardsComponent from "../../components/shards/BlackTopLeftShards";
import MdBreakline from "../../components/MdBreakline";
import ParallaxAbsolute from "../../components/animations/ParallaxAbsolute";
import SlideUpWhenVisible from "../../components/animations/SlideUpWhenVisible";
import NewsletterSign from "../../components/NewsletterSign";
import { Link } from "../../../components";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const PhoneSectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: ${token.palette.dark.main};
`;

const PhoneImageContainer = styled.div`
  position: relative;
  z-index: 1;
  height: ${90 / 2.003816794}vw;
  width: 90vw;
  margin-top: 0;
  margin-bottom: 3em;
  @media ${devices.xl} {
    margin-bottom: 0;
    bottom: -1.5vw;
    height: ${50 / 2.003816794}vw;
    width: 50vw;
  }
`;

const PhoneStrip = styled.div`
  position: relative;
  color: ${token.palette.light.main};

  @media ${devices.xl} {
    height: ${70 / 3.762}vw;
  }
`;

const StripText = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 2.2rem;

  @media ${devices.xl} {
    width: 65%;
    font-size: ${token.fontSizes.h3};
  }
`;

const PurpleStripContent = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100%;
  padding: 1em;
  font-size: ${token.fontSizes.h4};
  font-weight: bold;
  color: ${token.palette.light.main}
  z-index: 1;
`;

const BuyNowButton = styled(ActionCallButtonLinkClass)`
  @media ${devices.xl} {
    position: absolute;
    top: 0;
    left: 50%;
    min-width: 255px;
    transform: translate(-50%, -50%);
  }
`;
const BuyNowButtonFirst = styled(ActionCallButtonLinkClass)`
  && {
    @media ${devices.md} {
      display: none;
    }
  }
`;

const PurpleParticlesContainer = styled(Particles)`
  display: none;
  top: auto;
  left: auto;

  @media ${devices.xl} {
    display: block;
    bottom: -5em;
    right: -2em;
    width: 15vw;
    height: 18vw;
  }
`;

const BrownParticlesContainer = styled(Particles)`
  top: auto;
  bottom: -2em;
  left: -1em;
  width: 9em;
  height: 10em;
  pointer-events: none;
  user-select: none;

  @media ${devices.xl} {
    left: -14vw;
    width: 12vw;
    height: 15vw;
  }
`;

const BrownParticlesContainerRightTop = styled(Particles)`
  top: -2em;
  bottom: auto;
  left: auto;
  right: -3em;
  width: 15em;
  height: 15em;

  @media ${devices.xl} {
    display: none;
  }
`;

const Heading = styled.div`
  position: relative;
  text-align: center;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 3em;
  margin-bottom: 5em;

  h3 {
    font-family: ${token.fontFamily.secondary};
  }

  @media ${devices.xl} {
    max-width: 40vw;
    margin-top: 19em;
    margin-bottom: 5em;
    letter-spacing: -1.5px;
  }
`;

const Subheading = styled.div`
  font-size: ${token.fontSizes.h4};
  padding-bottom: 2em;
  margin-top: 0;

  @media ${devices.md} {
    padding-left: 0;
    padding-right: 0;
    font-size: ${token.fontSizes.accented};
    letter-spacing: 0px;
    padding-bottom: 1.6em;
  }
`;

const StyledMark = styled(VerticalStripMark)``;

const InfoCard = styled(MediaCard)`
  height: 61vw;
  min-height: 200px;
  flex-basis: 100%;
  flex-grow: 0;
  margin: 1em;

  @media ${devices.md} {
    width: 19em;
    flex-basis: 19em;
    height: 24em;
    flex-grow: 0;
  }

  @media ${devices.lg} {
    width: 21em;
    flex-basis: 21em;
  }
`;

const InfoCardContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  height: 100%;
  padding: 3em;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(${token.palette.dark.mainRGB}, 1));
  @media ${devices.md} {
    padding: 2em;
    box-shadow: none;
  }

  span:nth-of-type(1) {
    font-size: ${token.fontSizes.h3};
    font-family: ${token.fontFamily.secondary};
    font-weight: bold;
    margin-top: 0.2em;
    @media ${devices.md} {
      font-size: ${token.fontSizes.h4};
      margin-bottom: 0.6em;
    }
  }

  span:nth-of-type(2) {
    font-size: ${token.fontSizes.accented};
    @media ${devices.md} {
      font-size: ${token.fontSizes.base};
    }
  }
`;

const BuyContainer = styled.div`
  margin-top: 3em;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${devices.md} {
    margin-top: 0;
  }
`;

const Media = styled.div`
  display: none;
  @media ${devices.xl} {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
  }
`;

const ParticlesRight = styled(Particles)`
  position: absolute;
  top: -1em;
  left: auto;
  right: 0em;
  width: 6em;
  height: 8em;
  pointer-events: none;
  z-index: 1;

  @media ${devices.md} {
    top: -2em;
    right: 0em;
    width: 15em;
    height: 15em;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 7.5em;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const IntersectionBlocksContainer = styled.div`
  position: relative;
  display: flex;
  top: -15em;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  color: ${token.palette.light.main};
  margin: 0 auto;
  margin-bottom: -15em;
  padding: 1.4em;
  z-index: 2;

  @media ${devices.md} {
    margin-top: 5vw;
  }

  @media ${devices.lg} {
    margin-top: 2vw;
  }

  @media ${devices.xl} {
    margin-bottom: 0;
    margin-top: 0;
    position: absolute;
    top: 0;
    transform: translateY(-60%);
  }

  @media ${devices.xxxl} {
    top: 0;
    max-width: 70%;
    transform: translateY(-70%);
  }
`;

const HeadingTitle = styled.h3`
  font-weight: bold;
  font-size: 4rem;
  line-height: 1.1;
  margin-top: 0;

  @media ${devices.md} {
    font-size: ${token.fontSizes.h3};
    margin-bottom: 14px;
    line-height: 1.3;
  }
`;

const UpperBrownParticles = styled(Particles)`
  && {
    @media ${devices.md} {
      top: -6em;
      left: -6em;
      height: 15em;
      width: 15em;
    }
  }
`;

const mountainOffsetBottom = 40;
const BottomLandscape = styled.div`
  position: absolute;
  bottom: ${mountainOffsetBottom}em;
  left: 0;
  right: 0;
  height: 45em;
`;

const MistyLandscape = styled.div`
  position: absolute;
  bottom: 40em;
  left: 0;
  right: 0;
  height: 55em;
  user-select: none;
  pointer-events: none;
`;

const footerSlideCompensation = 8;
const mountainParallaxCompensation = 7;
const DarkBottomFill = styled.div`
  position: absolute;
  user-select: none;
  pointer-events: none;
  bottom: -6em;
  left: 0;
  right: 0;
  height: ${mountainOffsetBottom + footerSlideCompensation + mountainParallaxCompensation}em;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 95%, rgba(0, 0, 0, 0) 5%);
`;

const Break = styled.br`
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

const BlackTopLeftShards = styled(BlackTopLeftShardsComponent)`
  user-select: none;
  pointer-events: none;
  @media ${devices.md} {
    display: none;
  }
`;

const LeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 20em;
  top: -3em;
  left: -2em;
  pointer-events: none;
  user-select: none;
`;

const RightShards = styled.div`
  position: absolute;
  width: 100%;
  height: 30em;
  top: 23em;
  right: 0;
  pointer-events: none;
  user-select: none;
  z-index: 1;

  @media ${devices.md} {
    top: 10em;
    z-index: 0;
  }
`;

const ParticleHider = styled.div`
  position: absolute;
  top: -2em;
  bottom: auto;
  left: auto;
  right: 0;
  width: 100%;
  height: 15em;
  overflow: hidden;
  z-index: 6;
  user-select: none;
  pointer-events: none;
`;

const PhoneContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 3em;
  border-radius: 5rem;
`;

const PhoneImageDesktop = styled.div`
  display: none;
  background-color: black;
  border-radius: 120px;
  width: 100%;
  height: 100%;

  @media ${devices.md} {
    display: block;
  }

  @media screen and (min-width: 1800px) {
    border-radius: 130px;
  }
`;
const PhoneImageMobile = styled.div`
  @media ${devices.md} {
    display: none;
  }
`;

const SlideUp = styled(SlideUpWhenVisible)`
  display: flex;
  flex-flow: row wrap;
`;

const EmbedIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media ${devices.md} {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 95%;
    height: 90%;
    border-radius: 10px;
  }
  @media ${devices.xxl} {
    width: 92%;
    height: 83%;
  }

  @media ${devices.xxxl} {
    width: 92%;
    height: 86%;
  }
`;

const Peaks = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  top: 0;
  height: 40em;
  pointer-events: none;
  @media ${devices.md} {
    top: -11em;
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

const PhoneFrameContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
  pointer-events: none;
`;

const FounderSaleSection = () => {
  return (
    <PhoneSectionContainer>
      <StyledMark top="20vh" dark={false}>
        Founder Sale
      </StyledMark>

      <BlackTopLeftShards />

      <IntersectionBlocksContainer>
        <SlideUp duration={2} fromOpacity={0} translateYStart={100}>
          <InfoCard imgSrc="/imgs/home/hero-priest.png" objectPosition="center 30%" imgAlt="Priest">
            <InfoCardContent>
              <span>
                EPIC <Break />
                FANTASY RPG
              </span>
              <span>
                Explore a rich world of dungeons, <MdBreakline />
                magic, orcs, elves, and more.
              </span>
            </InfoCardContent>
            <UpperBrownParticles src="/imgs/particles/brown-particles-1.png" />
          </InfoCard>

          <InfoCard imgSrc="/imgs/home/hero-goblin.png" imgAlt="Goblin">
            <InfoCardContent>
              <span>
                LOOT <Break /> & TRADE
              </span>
              <span>
                Own your loot for real, forever.
                <br />
                Trade any item to other players.
              </span>
            </InfoCardContent>
          </InfoCard>

          <InfoCard imgSrc="/imgs/home/hero-orc.png" imgAlt="Orc" objectPosition="50% 40%">
            <InfoCardContent>
              <span>
                GUILD
                <MdBreakline /> MULTIPLAYER
              </span>
              <span>
                Play with friends. Work together
                <MdBreakline /> to take down tough bosses.
              </span>
              <ParticlesRight src="/imgs/particles/brown-particles-2.png" />
            </InfoCardContent>
          </InfoCard>
        </SlideUp>
      </IntersectionBlocksContainer>

      <Content>
        <MistyLandscape>
          <Image
            layout="fill"
            src="/imgs/mountains-transparent-crop.png"
            objectPosition="center bottom"
            objectFit="cover"
          />
        </MistyLandscape>

        <ParallaxAbsolute y={[10, -10]}>
          <BottomLandscape>
            <Image layout="fill" src="/imgs/landscape-bottom.png" objectPosition="15% bottom" objectFit="cover" />
            <Shader />

            <ParallaxAbsolute y={[20, -30]}>
              <LeftShards>
                <Image
                  layout="fill"
                  objectFit="contain"
                  objectPosition="top left"
                  src="/imgs/shards/white-left-shards-trim.png"
                />
              </LeftShards>

              <RightShards>
                <Image
                  layout="fill"
                  objectFit="contain"
                  objectPosition="top right"
                  src="/imgs/shards/white-right-shards-trim.png"
                />
              </RightShards>
            </ParallaxAbsolute>
          </BottomLandscape>
        </ParallaxAbsolute>
        <DarkBottomFill>
          <Peaks>
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition="top right"
              src="/imgs/home/transparent-peaks.png"
            />
          </Peaks>
        </DarkBottomFill>

        <Heading>
          <Parallax y={[60, -40]}>
            <HeadingTitle>
              STOP WASTING MONEY
              <br />
              ON SUMMONS YOU DON’T OWN.
            </HeadingTitle>
            <Subheading>
              Play and earn instead
              <MdBreakline /> in the world’s first mobile RPG
              <br />
              with a real world economy!
            </Subheading>

            {FEATURE_IS_COMING_SOON_MODE ? (
              <BuyNowButtonFirst>COMING SOON</BuyNowButtonFirst>
            ) : (
              <Link href="/store" passHref>
                <BuyNowButtonFirst>BUY NOW</BuyNowButtonFirst>
              </Link>
            )}
          </Parallax>
        </Heading>

        <Parallax y={[10, -10]} styleOuter={{ zIndex: 5 }}>
          <PhoneContainer>
            <PhoneImageContainer>
              <PhoneImageDesktop>
                <EmbedIframe
                  src="https://www.youtube.com/embed/yHQUnA8B7os?autoplay=1&controls=0&loop=1&playlist=yHQUnA8B7os&playsinline=1&mute=1"
                  frameBorder="0"
                  width="560"
                  height="315"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <PhoneFrameContainer>
                  <Image layout="fill" objectFit="contain" src="/imgs/home/phone-frame.png" />
                </PhoneFrameContainer>
              </PhoneImageDesktop>
              <PhoneImageMobile>
                <EmbedIframe
                  src="https://www.youtube.com/embed/yHQUnA8B7os?autoplay=1&controls=0&loop=1&playlist=yHQUnA8B7os&playsinline=1&mute=1"
                  frameBorder="0"
                  width="560"
                  height="315"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </PhoneImageMobile>

              <ParallaxAbsolute y={[30, -30]}>
                <BrownParticlesContainer src="/imgs/home/shards-brown.png" />
              </ParallaxAbsolute>
            </PhoneImageContainer>
            <ParticleHider>
              <BrownParticlesContainerRightTop src="/imgs/home/shards-brown.png" />
            </ParticleHider>
          </PhoneContainer>
        </Parallax>

        <Parallax y={[20, -40]}>
          <PhoneStrip>
            <Media>
              <Image layout="fill" objectFit="cover" objectPosition="center" src="/imgs/home/purple-strip.png" />
            </Media>
            <PurpleStripContent>
              <StripText>Buy founder NFTs which will NEVER be sold again!</StripText>
              <PurpleParticlesContainer src="/imgs/home/shards-purple.png" />
            </PurpleStripContent>
          </PhoneStrip>
          <BuyContainer>
            {FEATURE_IS_COMING_SOON_MODE ? (
              <BuyNowButton>COMING SOON</BuyNowButton>
            ) : (
              <Link href="/store" passHref>
                <BuyNowButton>BUY NOW</BuyNowButton>
              </Link>
            )}
          </BuyContainer>
          <NewsletterSign />
        </Parallax>
      </Content>
    </PhoneSectionContainer>
  );
};

export default FounderSaleSection;
