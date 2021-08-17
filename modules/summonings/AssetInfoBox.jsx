import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AssetAttributes from "../../components/AssetAttributes";
import token, { devices } from "../../styles/token";
import TransparentButton from "./TransparentButton";
import SummoningButton from "./SummoningButton";
import { Chroma } from "../../constants";
import { Link } from "../../../components";

const AfterContainer = styled(motion.div)`
  display: flex;
  position: absolute;
  bottom: 7em;
  left: 50%;
  transform: translate(-50%);
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: ${token.palette.light.main};
  z-index: 11;

  @media ${token.summoning.mobileBreak} {
    bottom: 1.8em;
  }

  @media ${devices.md} {
    bottom: 4.7em;
  }
`;
const Name = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-size: ${token.fontSizes.h2};
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1em;
  text-align: center;
  @media ${token.summoning.mobileBreak} {
    font-size: ${token.fontSizes.h3};
  }
`;

const ChromaText = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1em;

  @media ${token.summoning.mobileBreak} {
    font-size: ${token.fontSizes.xs};
  }

  @media ${devices.md} {
    margin-bottom: 1.8em;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 2.5em;

  @media ${devices.md} {
    margin-top: 4.2em;
  }

  & > * {
    margin: 0 0.5em;
  }
`;

const ContinueButton = styled(SummoningButton)`
  && {
    width: 17em;
    font-size: 1rem;
  }
`;

const ShareButton = styled(TransparentButton)`
  font-size: 0.85rem;
  padding: 1.5em 1em;
  letter-spacing: 0.1em;
  line-height: 1em;
  font-weight: 600;
  width: 12em;
`;

const AssetInfoBox = ({ asset, withBuy = false, onContinue, onShare, nextAvailable, videoFinished, ...props }) => {
  return (
    <AfterContainer {...props}>
      {videoFinished && <Name>{asset.name}</Name>}
      <ChromaText>{asset.chroma === Chroma.Normal ? "" : "Special Edition"}</ChromaText>

      <AssetAttributes
        product={asset.product}
        rarity={asset.rarity}
        faction={asset.faction}
        element={asset.element}
        petClass={asset.petClass}
      />
      <ButtonRow>
        {withBuy && (
          <Link href="/store">
            <a>
              <ContinueButton>BUY HEROES</ContinueButton>
            </a>
          </Link>
        )}
        <ShareButton onClick={onShare}>SHARE</ShareButton>
        {nextAvailable && <ContinueButton onClick={onContinue}>CONTINUE</ContinueButton>}
      </ButtonRow>
    </AfterContainer>
  );
};

export default AssetInfoBox;
