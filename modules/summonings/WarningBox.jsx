import React from "react";
import styled from "styled-components";
import TransparentButton from "./TransparentButton";
import SkipButton from "./SkipButton";
import MdBreakline from "../../components/MdBreakline";
import token, { devices } from "../../styles/token";

const BoxContainer = styled.div`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%);
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: ${token.palette.dark.main};
  border: 1px solid ${token.palette.orange.dark};
  color: ${token.palette.light.main};
  z-index: 31;
  padding: 4em 1em 4em;

  @media ${token.summoning.mobileBreak} {
    top: 25%;
    padding: 10em 9em 10em;
  }
`;

const Header = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  font-size: 3.5rem;

  @media ${token.summoning.mobileBreak} {
    font-size: ${token.fontSizes.h3};
  }
`;
const InfoText = styled.div`
  text-align: center;
  font-size: 1.8rem;
  line-height: 1.1em;
  @media ${token.summoning.mobileBreak} {
    font-size: ${token.fontSizes.xs};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 4em;

  @media ${token.summoning.mobileBreak} {
    margin-top: 1em;
  }

  & > * {
    margin: 0 0.5em;
  }
`;

const CloseButton = styled(TransparentButton)`
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  line-height: 1em;
  width: 16em;
  margin-right: 0.8em;
`;

const SkipButtonX = styled(SkipButton)`
  && {
    width: 100%;
    padding: 1.8em 3em 1.8em 1.4em;

    @media ${devices.lg} {
      width: 16em;
    }
  }
`;

const WarningBox = ({ visible, onClose, onConfirm }) => (
  <BoxContainer visible={visible}>
    <Header>WARNING</Header>
    <InfoText>
      Are you sure you <MdBreakline /> want to skip ALL Summoning Animations?
      <br /> These will be available for viewing in Collections.
    </InfoText>
    <ButtonRow>
      <CloseButton onClick={onClose}>CLOSE</CloseButton>
      <SkipButtonX transparent={false} onClick={onConfirm}>
        SKIP ALL
      </SkipButtonX>
    </ButtonRow>
  </BoxContainer>
);
export default WarningBox;
