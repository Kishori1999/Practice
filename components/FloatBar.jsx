import React from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import token, { devices } from "../styles/token";

const FloatBarContainer = styled(motion.div)`
  display: flex;
  position: fixed;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: stretch;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: -1px 0 30px rgba(0, 0, 0, 0.2);
  background-color: white;
  z-index: 1000;
  margin: 0 auto;

  @media ${token.store.floatBarBreak} {
    width: 75%;
    height: 7.5em;
    flex-flow: row nowrap;
    padding: 0 2em;
  }

  @media ${devices.lg} {
    width: 70%;
  }
`;

const variantsTransactionBar = {
  hidden: {
    opacity: 0,
    translateY: "100%",
  },
  visible: {
    opacity: 1,
    translateY: "0em",
    transition: {
      duration: 0.3,
    },
  },
};

const FloatBar = ({ className, children, visible }) => {
  const controls = useAnimation();

  if (visible) {
    controls.start("visible");
  } else {
    controls.start("hidden");
  }

  return (
    <FloatBarContainer className={className} initial="hidden" animate={controls} variants={variantsTransactionBar}>
      {children}
    </FloatBarContainer>
  );
};

export default FloatBar;
