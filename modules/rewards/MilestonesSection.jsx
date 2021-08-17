import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import LearnMore from "../../components/LearnMore";
import { ActionCallButtonLinkClass } from "../../components/ActionCallButton";
import NamedSection from "../../components/NamedSection";
import RewardsBox from "./RewardsBox";
import Milestones from "../../components/Milestones";
import { Link } from "../../../components";
import { FEATURE_IS_COMING_SOON_MODE } from "../../../constants";

const MilestoneRewardsContent = styled.div`
  position: relative;
  text-align: center;
  margin-top: -7em;
  padding-bottom: 20rem;
  z-index: 1;

  h1 {
    margin-bottom: 10px;
  }

  @media ${devices.md} {
    margin-top: 0;
    padding-top: 11em;
    padding-bottom: 15em;
  }
`;

const BottomLandscape = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45em;
`;

const WhiteBackgroundShards = styled.div`
  display: none;

  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 32em;
    height: 33em;
    left: -5em;
    top: -28em;
    pointer-events: none;
    z-index: 1;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 5%);
  pointer-events: none;
`;

const Heading = styled.h1`
  letter-spacing: -3px;
`;

const InfoText = styled.div`
  font-size: 2rem;
  line-height: 1.15em;
  margin-top: 0.6em;
  margin-bottom: 1.6em;
  padding: 0 1em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
  }
`;

const LeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 30em;
  top: -5.5em;
  left: -3em;
  pointer-events: none;
  transition: all 5s ease-in-out;
`;

const RightMobileShards = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 32em;
  right: 0;
  pointer-events: none;
  bottom: 0;
  z-index: 0;

  @media ${devices.md} {
    display: none;
  }
`;
const RightShards = styled.div`
  display: none;
  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 100%;
    height: 31em;
    right: 0;
    pointer-events: none;
    top: 8em;
    z-index: 0;
  }
`;

const MistyLandscape = styled.div`
  position: absolute;
  bottom: 12em;
  left: 0;
  right: 0;
  height: 55em;
`;

const BuyButton = styled(ActionCallButtonLinkClass)`
  margin-top: 0.75em;
`;

const TopLeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 20em;
  top: 0;
  left: 0;
  pointer-events: none;

  @media ${devices.md} {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MilestonesSection = ({ address, customer, milestones, referrerBonuses, tokenBalance }) => {
  return (
    <NamedSection name="Milestone Rewards" topMark="28em" overflowHidden={false} sideMargin={false}>
      <MistyLandscape>
        <Image
          layout="fill"
          src="/imgs/mountains-transparent-crop.png"
          objectPosition="center bottom"
          objectFit="cover"
        />
      </MistyLandscape>
      <BottomLandscape>
        <Image layout="fill" src="/imgs/landscape-bottom.png" objectPosition="center bottom" objectFit="cover" />
        <Shader />
        <LeftShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top left"
            src="/imgs/shards/white-left-shards-trim.png"
          />
        </LeftShards>
        <RightShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top right"
            src="/imgs/shards/white-right-shards-trim.png"
          />
        </RightShards>

        <RightMobileShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top right"
            src="/imgs/rewards/rewards-black-right-shards.png"
          />
        </RightMobileShards>
      </BottomLandscape>
      <WhiteBackgroundShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
          src="/imgs/rewards/rewards-banner-shards.png"
          priority
        />
      </WhiteBackgroundShards>

      <TopLeftShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="top left"
          src="/imgs/shards/black-top-left-shards.png"
          priority
        />
      </TopLeftShards>
      <RewardsBox address={address} customer={customer} referrerBonuses={referrerBonuses} tokenBalance={tokenBalance} />
      <MilestoneRewardsContent>
        <Heading>COMMUNITY MILESTONES</Heading>
        <InfoText>
          ~1.4% of total Gem supply will be given for free as a bonus for buying in the presale.
          <br />
          Spend more and spend first to earn more!
        </InfoText>
        <LearnMore href="https://guildofguardians.medium.com/initial-gem-distribution-free-gems-for-founder-nft-purchase-milestones-5240e3ae936e" />
        <Milestones milestones={milestones} />
        <ButtonContainer>
          {FEATURE_IS_COMING_SOON_MODE ? (
            <BuyButton>COMING SOON</BuyButton>
          ) : (
            <Link href="/store" passHref>
              <BuyButton>BUY NOW</BuyButton>
            </Link>
          )}
        </ButtonContainer>
      </MilestoneRewardsContent>
    </NamedSection>
  );
};

export default MilestonesSection;
