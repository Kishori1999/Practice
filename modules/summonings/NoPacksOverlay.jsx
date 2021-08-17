import React from "react";
import styled from "styled-components";
import { DoubleBorder } from "../../components/DoubleBorder";
import token, { devices } from "../../styles/token";
import { ActionCallButtonLinkClass } from "../../components/ActionCallButton";
import AfterMdBreakline from "../../components/AfterMdBreakline";
import TransparentButton from "./TransparentButton";
import { Link } from "../../../components";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const ShareBoxContainer = styled.div`
  display: block;
  position: absolute;
  background: ${token.palette.dark.main};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${token.palette.light.main};
  padding: 1em;
  max-width: 100%;
  min-width: 48%;
  width: 53.5em;
  font-family: ${token.fontFamily.secondary};

  @media ${devices.md} {
    padding: 2.5em;
    box-shadow: 0 0 2px 1px rgba(240, 163, 68, 0.75);
  }
`;

const InnerBorder = styled(DoubleBorder)`
  padding: 2.5em 3em;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: ${token.fontSizes.h3};
  text-align: center;
  font-weight: bold;
  line-height: 1.4em;
  margin-bottom: 0.7em;
  padding: 0.2em 2em 0;
`;

const BuyButton = styled(ActionCallButtonLinkClass)`
  font-weight: 600;
  font-family: ${token.fontFamily.main};
  padding: 1.75em 5.5em;
  font-size: 1.125em;

  @media ${token.summoning.mobileBreak} {
    font-size: 1em;
  }

  @media ${token.summoning.menuBreak} {
    font-size: 0.875rem;
    padding: 1.75em 3.75em;
  }
`;

const InfoText = styled.div`
  margin-top: 1em;
  font-size: ${token.fontSizes.xs};
`;

const CollectionButton = styled(TransparentButton)`
  letter-spacing: 0.1em;
  position: relative;
  font-family: ${token.fontFamily.main};
  background: ${token.gradients.button.secondary};
  border: 1px solid rgba(70, 203, 229, 0.1);
  transition: border-color 300ms ease-in-out;
  cursor: pointer;
  font-size: 1.125em;
  padding: 1.75em 4em;
  margin-top: 1.5em;

  :hover {
    border-color: ${token.palette.orange.main};
  }

  @media ${token.summoning.mobileBreak} {
    font-size: 1em;
    margin-left: 1em;
    padding: 1.75em 3.75em;
    margin-top: 0;
  }

  @media ${token.summoning.menuBreak} {
    font-size: 0.875rem;
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;

  @media ${token.summoning.mobileBreak} {
    flex-flow: row nowrap;
  }
`;

const NoPacksOverlay = () => (
  <ShareBoxContainer>
    <InnerBorder>
      <Text>
        YOU HAVE NO
        <AfterMdBreakline /> UNOPENED PACKS
      </Text>
      {FEATURE_IS_COMING_SOON_MODE ? (
        <Link href="/" passHref>
          <BuyButton>COMING SOON</BuyButton>
        </Link>
      ) : (
        <SocialRow>
          <Link href="/store" passHref>
            <BuyButton>BUY NOW</BuyButton>
          </Link>

          <Link href="/collections" passHref>
            <CollectionButton>MY COLLECTION</CollectionButton>
          </Link>
        </SocialRow>
      )}
      <InfoText>
        Note that only Heroes and Pets are summoned, other purchased NFTs go straight to your collection!
      </InfoText>
    </InnerBorder>
  </ShareBoxContainer>
);

export default NoPacksOverlay;
