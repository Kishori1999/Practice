import React from "react";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import TransparentButton from "./TransparentButton";
import SocialShareRow from "../../components/SocialShareRow";

const BoxContainer = styled.div`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: ${token.palette.dark.main};
  border: 1px solid ${token.palette.orange.dark};
  color: ${token.palette.light.main};
  padding: 3em 2em;
  z-index: 31;

  min-width: 80%;

  @media ${devices.md} {
    padding: 5em 3em;
    min-width: 50%;
  }

  ::after {
    position: absolute;
    font-size: 1rem;
    bottom: -1em;
    content: "";
    width: 2em;
    height: 2em;
    background: ${token.palette.dark.main};
    transform: rotate(45deg);
    border-style: solid;
    border-color: ${token.palette.orange.dark};
    border-width: 0 1px 1px 0;
    z-index: -1;
  }
`;

const Header = styled.div`
  font-size: ${token.fontSizes.h3};
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
`;
const InfoText = styled.div`
  font-size: ${token.fontSizes.base};
  text-align: center;
  margin-bottom: 2em;

  @media ${devices.md} {
    margin-bottom: 2em;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 3em;

  @media ${devices.md} {
    margin-top: 3em;
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
  padding: 1.5em;
`;

const ShareBox = ({ link = "https://www.guildofguardians.com", visible = true, onClose }) => (
  <BoxContainer visible={visible}>
    <Header>SHARE UNBOXING</Header>
    <InfoText>Show your new hero to friends!</InfoText>
    <SocialShareRow
      link={link}
      message={`Look what I just pulled in the @GuildofGuardian Founder Sale!\n\nI also get free $GOG tokens for buying NFTs.\n\nRetweet this and tag @guildofguardian plus 2 friends to enter a $5,000 NFT giveaway!\n\n${link}`}
    />
    <ButtonRow>
      <CloseButton onClick={onClose}>CLOSE</CloseButton>
    </ButtonRow>
  </BoxContainer>
);
export default ShareBox;
