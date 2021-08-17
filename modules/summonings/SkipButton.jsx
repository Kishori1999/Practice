import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import TransparentButton from "./TransparentButton";
import token, { devices } from "../../styles/token";

const SkipAllButton = styled(TransparentButton)`
  position: relative;
  color: ${token.palette.light.main};
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  line-height: 1em;
  padding: 1.5em;
  width: 12em;
  cursor: pointer;
  background: ${({ transparent }) => (transparent ? "transparent" : token.gradients.button.main)};

  @media ${devices.md} {
    width: 16em;
  }
`;

const Icon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;

  @media ${token.summoning.mobileBreak} {
    right: -1.5em;
  }
`;

const ButtonText = styled.div`
  padding-left: 1.5em;
`;

const SkipButton = ({ text = "SKIP ALL", className, transparent = true, onClick }) => (
  <SkipAllButton className={className} transparent={transparent} onClick={onClick}>
    <ButtonText>{text}</ButtonText>
    <Icon>
      <FontAwesomeIcon size="1x" width={16} icon={faStepForward} />
    </Icon>
  </SkipAllButton>
);

export default SkipButton;
