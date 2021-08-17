import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import HeroVideo from "../../components/HeroVideo";
import UnderHeroSection from "./UnderHeroSection";
import PresaleSection from "./PresaleSection";
import IntroductionSection from "./IntroductionSection";
import GameDetails from "./GameDetails";
import FounderSaleSection from "./FounderSaleSection";
import token from "../../styles/token";

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${token.palette.dark.main};
  z-index: 500;
  -webkit-transform: translate3d(0, 0, 0);
`;

const variantsOverlay = {
  start: {
    opacity: 1,
  },
  normal: {
    display: "none",
    opacity: 0,
    transition: {
      delay: token.homepage.loadingTime,
      duration: 0.8,
      display: {
        delay: token.homepage.loadingTime + 1.8,
      },
    },
  },
};

const HomePage = () => {
  return (
    <>
      <LoadingOverlay initial="start" animate="normal" variants={variantsOverlay} />
      <HeroVideo />
      <UnderHeroSection />
      <PresaleSection />
      <IntroductionSection />
      <GameDetails />
      <FounderSaleSection />
    </>
  );
};

export default HomePage;
