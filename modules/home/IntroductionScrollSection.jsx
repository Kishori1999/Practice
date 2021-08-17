import React, { useCallback, useRef } from "react";
import Image from "next/image";
import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";
import token, { devices } from "../../styles/token";
import SimpleArrow from "../../components/SimpleArrow";
import NamedSection from "../../components/NamedSection";
import SliderMenu from "../../components/SliderMenu";
import Particles from "../../components/Particles";
import { ActionCallButtonLinkClass } from "../../components/ActionCallButton";
import { Link } from "../../../components";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const InfoText = styled.div`
  margin: 0 auto;

  padding: 3em 0.5em 1.8em 0.5em;
  z-index: 10;

  font-size: ${token.fontSizes.h4};

  @media ${devices.md} {
    height: 12em;
    margin: 0;
    width: 100%;
    padding: 1.5em 0 0 0;
    font-size: 1.5rem;
    letter-spacing: 0.7px;
    line-height: 1.7;

    margin-top: 0.6em;
  }
`;

const Phone = styled.div`
  position: relative;
  padding-top: 100%;
  width: 100%;
  margin: 0 auto;
  @media ${devices.lg} {
    right: 1em;
    width: 93%;
  }
`;

const BuyButton = styled(ActionCallButtonLinkClass)`
  margin: 0 auto;

  @media ${devices.md} {
    margin: 0;
    align-self: flex-start;
  }
`;

const BrownParticlesLeft = styled(Particles)`
  position: absolute;
  top: auto;
  bottom: 4em;
  left: 3%;
  right: auto;
  width: 18em;
  height: 18em;
  pointer-events: none;
  z-index: 1;
`;

const ParticleHider = styled.div`
  position: absolute;
  top: -1em;
  bottom: auto;
  left: 0;
  right: 0;
  height: 18em;
  z-index: 1;
  overflow: hidden;

  user-select: none;
  pointer-events: none;
`;

const BrownParticlesRight = styled(Particles)`
  && {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 60%;
    right: 0;
    height: 15em;
    transform: rotate(-45deg);

    @media ${token.homepage.introduction.sliderBreak} {
      display: none;
    }
  }
`;

const StyledSliderMenu = styled(SliderMenu)`
  position: absolute;
  display: flex;
  justify-content: center;
  //bottom: 14px;
  top: 0;
  left: 50%;
  transform: translate(-50%, -68%);
  max-width: 100%;
  z-index: 200;

  @media ${devices.md} {
    position: relative;
    max-width: initial;
    transform: none;
    top: 0;
    left: 0;
  }
`;

const fadeInBottom = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  70% {
    opacity: 1;
    transform: scale(2);
  }

  99% {
    opacity: 0;
    transform: scale(2);
  }

  100% {
    scale(0);
  }
`;

const PhoneContainer = styled.div`
  position: relative;
  margin-top: 45vw;

  @media ${devices.sm} {
    margin-top: 25vw;
  }

  @media ${devices.md} {
    margin-top: 10em;
    order: 2;
    margin-right: 7vw;
  }
  @media ${devices.lg} {
    margin-top: 0;
    order: 2;
    margin-right: 7vw;
  }
`;

const LightImage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  animation: ${({ active }) =>
    active
      ? css`
          ${fadeInBottom} forwards
        `
      : "none"};
  animation-duration: 600ms;
`;

const CircleImage = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 3em;
  left: 5vw;
  right: 5vw;
  opacity: 0;

  @media ${devices.md} {
    left: 10vw;
    right: 10vw;
  }
`;

const BarbarImage = styled(motion.div)`
  position: absolute;
  top: -24vw;
  bottom: 18vw;
  left: 0;
  right: 0;
  opacity: 0;
  max-width: 100%;

  @media ${devices.md} {
    top: -10vw;
    bottom: 10vw;
  }

  @media ${devices.lg} {
    top: 6vw;
    bottom: 4vw;
  }
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  justify-items: center;
  margin-bottom: 5em;

  @media ${devices.md} {
    text-align: left;
    justify-items: flex-start;
    margin-top: 11em;
    margin-left: 10.5vw;
    margin-bottom: 0;
  }

  @media ${devices.lg} {
    margin-left: 21vw;
  }
`;

const menuItems = [
  {
    id: "01",
    text: "Players spend $100 billion each year on in‑game items which they don't truly own.",
  },
  {
    id: "02",
    text: "This is wrong. Players deserve to be able to own and trade their assets for real money.",
  },
  {
    id: "03",
    text: "This is why we are building a free to play mobile RPG where players can turn their passion into NFTs.",
  },
];

const ArrowSelector = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 5;
  top: 0;
  bottom: 0;

  @media ${token.homepage.introduction.sliderBreak} {
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
  position: relative;
  height: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr;
  text-align: center;

  @media ${devices.md} {
    padding-left: 0;
    padding-top: 3em;
    padding-bottom: 4em;
    text-align: left;
    grid-template-columns: 1fr 1fr;
  }
`;
const variantsBarbar = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: {
    y: -30,
    opacity: 1,
    transition: {
      opacity: {
        duration: 1,
        ease: "easeInOut",
      },
      y: {
        ease: "linear",
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  },
};
const variantsPortal = {
  hidden: {
    y: 20,
    rotate: 0,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.5,
        ease: "easeOut",
      },
      rotate: {
        duration: 0,
      },
      y: {
        duration: 0,
      },
    },
  },
  visible: {
    rotate: [0, 10, -10],
    opacity: 1,
    y: 0,
    originX: "center",
    originY: 0.7,
    transition: {
      opacity: {
        duration: 1,
        ease: "easeInOut",
      },
      rotate: {
        type: "spring",
        duration: 2,
        delay: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
      y: {
        ease: "easeIn",
        duration: 0.5,
      },
    },
  },
};
const IntroductionScrollSection = ({ selectedIndex, setSelectedIndex }) => {
  const phoneRef = useRef(null);

  const selectPrevious = useCallback(() => {
    setSelectedIndex(selectedIndexOld => (selectedIndexOld > 0 ? selectedIndexOld - 1 : 0));
  }, []);
  const selectNext = useCallback(() => {
    setSelectedIndex(selectedIndexOld =>
      selectedIndexOld < menuItems.length - 1 ? selectedIndexOld + 1 : menuItems.length - 1,
    );
  }, []);

  const selectedItem = menuItems[selectedIndex];
  return (
    <NamedSection name="Introduction" topMark="38vh">
      <Content>
        <PhoneContainer>
          <LeftArrowSelector onClick={selectPrevious}>
            <SimpleArrow />
          </LeftArrowSelector>
          <Phone>
            <Image layout="fill" objectFit="contain" objectPosition="center bottom" src="/imgs/home/phone-basic.png" />

            <CircleImage
              initial="hidden"
              animate={selectedIndex === 1 ? "visible" : "hidden"}
              variants={variantsPortal}
            >
              <Image
                layout="fill"
                objectFit="contain"
                objectPosition="center bottom"
                src="/imgs/home/summoning-circle.png"
              />
            </CircleImage>

            <BarbarImage
              initial="hidden"
              animate={selectedIndex === 2 ? "visible" : "hidden"}
              variants={variantsBarbar}
            >
              <Image
                layout="fill"
                objectFit="contain"
                objectPosition="center bottom"
                src="/imgs/home/hero-barbar.png"
              />
            </BarbarImage>
            <LightImage active={selectedIndex === 2}>
              <Image layout="fill" objectFit="contain" objectPosition="center bottom" src="/imgs/home/light.png" />
            </LightImage>
            <BrownParticlesLeft
              src="/imgs/particles/brown-particles-1.png"
              animate={{ y: 50 }}
              transition={{
                ease: "easeInOut",
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <ParticleHider>
              <BrownParticlesRight src="/imgs/particles/brown-particles-2.png" />
            </ParticleHider>
          </Phone>
          <RightArrowSelector onClick={selectNext}>
            <SimpleArrow right />
          </RightArrowSelector>
        </PhoneContainer>
        <MenuContainer>
          <StyledSliderMenu selectedIndex={selectedIndex} onSelect={id => setSelectedIndex(id)} items={menuItems} />
          <InfoText id="text" ref={phoneRef}>
            {selectedItem.text}
          </InfoText>
          {FEATURE_IS_COMING_SOON_MODE ? (
            <BuyButton>COMING SOON</BuyButton>
          ) : (
            <Link href="/store" passHref>
              <BuyButton>BUY NOW</BuyButton>
            </Link>
          )}
        </MenuContainer>
      </Content>
    </NamedSection>
  );
};

export default IntroductionScrollSection;
