import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "antd";
import HeroBanner from "../../components/HeroBanner";
import MdBreakline from "../../components/MdBreakline";
import MilestonesSection from "./MilestonesSection";
import ShareSection from "./ShareSection";
import NewsSection from "./NewsSection";
import token, { devices } from "../../styles/token";
import SlideUpWhenVisible from "../../components/animations/SlideUpWhenVisible";
import HeroParallax from "../../components/animations/HeroParallax";
import { FEATURE_ADD_WITHDRAW_BONUS } from "../../../constants";

const Media = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
`;

const Heading = styled.h1`
  font-size: ${token.fontSizes.h1};
  line-height: 1.2em;
  font-weight: bold;
  margin-top: 1.3em;
  color: ${token.palette.light.main};
  max-height: 450px;
  min-height: 50px;
  text-align: center;
  margin-bottom: 0;

  @media ${devices.md} {
    letter-spacing: -3px;
    margin-top: 0.55em;
    font-size: ${token.fontSizes.h1};
  }
`;
const SubHeading = styled.h2`
  color: ${token.palette.light.main};
  font-size: ${token.fontSizes.h3};
  text-align: center;
  margin-top: 0.7em;
  letter-spacing: 1px;

  @media ${devices.md} {
    margin-top: 0;
    font-size: ${token.fontSizes.h4};
  }
`;

const HeroesContent = styled.div`
  text-align: center;
  padding: 1em 1em 15em;
`;

const Background = (
  <Media>
    <HeroParallax>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="20% 0%"
        src="/imgs/rewards/goblin.jpg"
        sizes="(max-width: 600px) 600px"
        alt="banner"
        priority
      />
    </HeroParallax>
  </Media>
);

const CustomBlackBottomLeftShards = styled.div`
  position: absolute;
  width: 100%;
  bottom: -2em;
  left: 0;
  height: 25em;
  pointer-events: none;

  @media ${devices.md} {
    bottom: 0;
    height: 30em;
  }
`;
const Container = styled.div`
  position: relative;
  height: 100%;
`;

const RewardsPage = ({ address, customer, milestones, referrerBonuses, referralUrl, tokenBalance, writeContracts }) => {
  const confirmWithdrawBonus = () => {
    writeContracts.GuildOfGuardiansPreSale.withdrawBonus();
  };
  return (
    <Container>
      <HeroBanner height="52em" background={Background}>
        <HeroesContent>
          <Heading>
            EARN
            <MdBreakline /> REWARDS
          </Heading>
          <SubHeading>
            FOR A LIMITED
            <MdBreakline /> TIME ONLY
          </SubHeading>
        </HeroesContent>
      </HeroBanner>
      <MilestonesSection
        address={address}
        customer={customer}
        milestones={milestones}
        tokenBalance={tokenBalance}
        referrerBonuses={referrerBonuses}
      />
      {FEATURE_ADD_WITHDRAW_BONUS && (
        <Button
          type="primary"
          style={{ margin: "20", align: "centre" }}
          name="withdraw"
          block
          size="large"
          onClick={() => confirmWithdrawBonus()}
        >
          WITHDRAW BONUS
        </Button>
      )}
      <ShareSection referralUrl={referralUrl} />
      <NewsSection />

      <SlideUpWhenVisible>
        <CustomBlackBottomLeftShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="bottom left"
            src="/imgs/shards/black-bottom-left-shards-footer.png"
            alt="shards"
          />
        </CustomBlackBottomLeftShards>
      </SlideUpWhenVisible>
    </Container>
  );
};

export default RewardsPage;
