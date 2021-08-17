import React from "react";
import styled from "styled-components";
import MediaCard from "../../components/MediaCard";
import token from "../../styles/token";
import SummoningButton from "./SummoningButton";
import { Link } from "../../../components";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const CardContainer = styled(MediaCard)`
  display: flex;
  flex-flow: column nowrap;
  padding: 2.1em 4em 2em;
  margin-top: 1.1em;
  border: 1px solid transparent;
  z-index: 30;

  @media ${token.summoning.mobileBreak} {
    padding: 1.2em 2.5em 1.1em;
    min-width: ${token.summoning.menuCardSize};
  }

  :hover {
    border: 1px solid ${token.palette.orange.dark};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  font-size: ${token.fontSizes.accented};
`;

const UnboxButton = styled(SummoningButton)`
  && {
    margin-top: 1.8em;
    font-size: 1.4rem;
    @media ${token.summoning.mobileBreak} {
      font-size: 0.85rem;
    }
    @media ${token.summoning.mobileBreak} {
      margin-top: 1em;
    }
  }
`;

const UnboxCardText = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1.3rem;
  margin-bottom: 0.75rem;
`;

const Count = styled.span`
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  font-size: 2rem;

  @media ${token.summoning.mobileBreak} {
    font-size: 1.1rem;
  }
`;
const AssetName = styled.span`
  font-size: 2rem;
  margin-right: 1em;
  font-weight: bold;

  @media ${token.summoning.mobileBreak} {
    font-size: 1.225rem;
  }
`;

const UnboxCard = ({ name, count, imgSrc, onUnbox }) => (
  <CardContainer imgSrc={imgSrc}>
    <CardContent>
      <UnboxCardText>
        <AssetName>{name}</AssetName> <Count>{count}x</Count>
      </UnboxCardText>
      {count !== 0 ? (
        <UnboxButton onClick={onUnbox}>UNBOX</UnboxButton>
      ) : (
        <>
          {FEATURE_IS_COMING_SOON_MODE ? (
            <UnboxButton>COMING SOON</UnboxButton>
          ) : (
            <Link href="/store" passHref>
              <a>
                <UnboxButton>BUY MORE</UnboxButton>
              </a>
            </Link>
          )}
        </>
      )}
    </CardContent>
  </CardContainer>
);

export default UnboxCard;
