import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import token from "../../styles/token";
import ClipBorder from "../../components/ClipBorder";

const ButtonShell = styled(motion.button)`
  position: relative;
  border: 1px solid ${token.palette.orange.mainWithLightOpacity};
  cursor: pointer;
  z-index: 1;
  background: none;
  color: ${token.palette.light.main};
  padding: 1.9em 1.5em;

  font-size: 1.1rem;

  ::before {
    content: "";
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    background: ${token.gradients.button.main};
    box-shadow: 0 0 60px 6px ${token.palette.blue.dark};
    transition: opacity 500ms ease-out;
  }

  :hover::before {
    opacity: 1;
  }

  @media ${token.summoning.mobileBreak} {
    font-size: 1rem;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TransparentButton = ({ children, className, ...props }) => (
  <ButtonShell className={className} {...props}>
    <Content>{children}</Content>
    <ClipBorder />
  </ButtonShell>
);

export default TransparentButton;
