import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import { AbsoluteBorder } from "../../components/DoubleBorder";
import ActionCallButton from "../../components/ActionCallButton";
import { formatAddress, formatEth, formatGems } from "../../helpers";
import { useWeb3Modal } from "../../hooks/useWeb3Modal";

const topBoxPadding = "5.2rem";
const InfoCardContent = styled.div`
  position: relative;
  padding-top: 2em;
  padding-bottom: 2em;
  margin: 3em 0.5em 0;
  text-align: center;
  --double-border-color: ${token.palette.orange.main};

  @media ${devices.md} {
    width: 24rem;
    margin: 0;
    text-align: center;
    padding: ${topBoxPadding} 2em 0 2em;
    --double-border-color: ${token.palette.orange.mainWithOpacity};
  }
`;

const CardCount = styled.div`
  position: relative;
  font-size: ${token.fontSizes.h1};
  font-family: ${token.fontFamily.secondary};
  line-height: 1;
`;

const EtherIcon = styled.div`
  position: absolute;
  top: 0.1em;
  bottom: 0;
  right: -0.7em;
  width: 0.7em;
  height: 0.7em;
  background: url("/imgs/rewards/ethereum-logo.png") no-repeat;
  background-position: 80% 20%;
  background-size: contain;
`;

const Unit = styled.div`
  font-size: ${token.fontSizes.accented};
  margin-top: 0.3em;
  color: ${token.palette.light.main};
`;

const Source = styled.div`
  display: none;
  @media ${devices.md} {
    display: block;
    margin-top: 2.8em;
    color: ${token.palette.light.main};
  }
`;

const CountValue = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 auto;
`;

const InfoCard = ({ children, count, unit, source }) => {
  return (
    <InfoCardContent>
      {children}
      <CardCount>
        <CountValue>
          {count}
          {unit === "ETH" && <EtherIcon />}
        </CountValue>
      </CardCount>
      <Unit>{unit}</Unit>
      <Source>From {source}</Source>
      <AbsoluteBorder />
    </InfoCardContent>
  );
};

const HeaderCardContent = styled.div`
  font-family: ${token.fontFamily.secondary};
  font-size: ${token.fontSizes.h3};
  text-align: center;
  padding: 6rem 2rem 3rem;

  @media ${devices.md} {
    width: 10.5em;
    padding: 2rem 2rem 2rem;
    padding-top: ${topBoxPadding};
    padding-bottom: 0;
    line-spacing: 1.5;
    font-size: 2.2rem;
    margin: 0 0.6em;
  }
`;

const WalletButton = styled(ActionCallButton)`
  && {
    position: relative;
    padding: 2em 7.5em;
    margin: 0 2em;

    @media ${devices.md} {
      position: absolute;
      min-width: 14em;
      padding: 2em 3em;
      margin: 0;
      transform: translate(-50%, 50%);
      bottom: -3.5em;
      left: 50%;
    }
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  float: left;
  padding-left: 2em;

  @media ${devices.md} {
    position: relative;
    padding-right: 1em;
    padding-left: 0;
    top: initial;
    left: initial;
    transform: none;
  }
`;

const WhiteBottomRightShards = styled.div`
  display: none;

  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 100%;
    height: 14em;
    bottom: 0;
    right: -1px;
    pointer-events: none;
    user-select: none;
  }
`;

const HeadingCard = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-items: center;
  align-items: center;
  order: -1;
  height: 100%;
  padding: 0 1.8em 3em;

  @media ${devices.md} {
    order: 0;
    padding: 0 1.8em;
  }
`;

const MediaCardHeading = styled.div`
  position: relative;
  height: 100%;
`;

const Media = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
  pointer-events: none;
  user-select: none;

  @media ${devices.md} {
    display: block;
  }
`;

const RewardBoxContainer = styled.div`
  position: relative;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  max-width: 100%;
  top: -14em;
  background-color: ${token.palette.dark.main};
  z-index: 5;
  padding: 1rem 1rem 1.5rem 1rem;
  //height: 16em;
  margin: 0.2em;

  @media ${devices.md} {
    position: absolute;
    top: -19.4em;
    left: 50%;
    height: 22.5em;
    transform: translateX(-50%);
    padding: 3em;
    flex-flow: row nowrap;
  }
`;

// TODO: Use props.tokenBalance to get the token balance
const RewardsBox = ({ address, customer, referrerBonuses }) => {
  const { web3Modal, loadWeb3Modal } = useWeb3Modal();
  let connectButtonText = "Connect";
  let connectOnClick;

  if (web3Modal && web3Modal.cachedProvider) {
    connectButtonText = formatAddress(address, "short");
  } else {
    connectOnClick = loadWeb3Modal;
    connectButtonText = "Connect";
  }

  return (
    <RewardBoxContainer>
      <InfoCard count={formatGems(customer ? customer.tokenRewardTotal : 0)} source="Community Milestones" unit="Gems">
        <Media>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            src="/imgs/rewards/pillar-transparent.png"
            priority
          />
        </Media>
      </InfoCard>
      <HeadingCard>
        <MediaCardHeading>
          <HeaderCardContent>YOUR TOTAL REWARDS ARE:</HeaderCardContent>
        </MediaCardHeading>
        <WalletButton onClick={connectOnClick}>
          <Icon>
            <FontAwesomeIcon size="lg" icon={faUser} color="white" />
          </Icon>
          {connectButtonText}
        </WalletButton>
      </HeadingCard>
      <InfoCard count={referrerBonuses ? formatEth(referrerBonuses) : 0} unit="ETH" source="referrals" />
      <WhiteBottomRightShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
          src="/imgs/shards/white-bottom-right-shards.png"
          priority
        />
      </WhiteBottomRightShards>
    </RewardBoxContainer>
  );
};
export default RewardsBox;
