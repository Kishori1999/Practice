import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import ShareBox from "../../components/ShareBox2";
import AssetBuyCard from "../../components/AssetBuyCard";
import BlackTopRightShardsComponent from "../../components/shards/BlackTopRightShards";
import { AssetCartId } from "../../constants";
import { CART_ASSETS_LIMIT } from "../../../constants";

const SectionContent = styled.div`
  text-align: center;
  margin-top: 40em;

  @media screen and (min-width: 1093px) {
    margin-top: 5em;
  }
`;

const SectionContainer = styled.div`
  position: relative;
  padding: 29.5em 0 12em;
`;

const AssetCards = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  top: -38em;
  height: 235em;
  z-index: 1;
  width: 100%;
  flex-flow: row wrap;

  @media ${devices.md} {
    position: absolute;
    height: auto;
    top: -12em;
  }
`;

const TopLandscapeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30em;
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 5%);
  pointer-events: none;
`;

const BlackTopRightShards = styled(BlackTopRightShardsComponent)`
  display: none;
  @media ${devices.md} {
    display: block;
    top: 6em;
    height: 39em;
  }
`;
const LeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 48em;
  top: -14em;
  left: 0;
  pointer-events: none;
`;

const ShareSection = ({
  basicGuildTokenAvailableAmount,
  basicGuildTokenCost,
  basicGuildTokenFinalCost,
  basicGuildTokenAmount,
  basicGuildTokenOriginalAmount,
  setBasicGuildTokenAmount,
  tier1GuildTokenAvailableAmount,
  tier1GuildTokenOriginalAmount,
  tier1GuildTokenCost,
  tier1GuildTokenFinalCost,
  tier1GuildTokenAmount,
  setTier1GuildTokenAmount,
  tier2GuildTokenAmount,
  setTier2GuildTokenAmount,
  tier2GuildTokenCost,
  tier2GuildTokenFinalCost,
  tier2GuildTokenAvailableAmount,
  tier2GuildTokenOriginalAmount,
  tier3GuildTokenAmount,
  setTier3GuildTokenAmount,
  tier3GuildTokenCost,
  tier3GuildTokenFinalCost,
  tier3GuildTokenAvailableAmount,
  tier3GuildTokenOriginalAmount,
  referralUrl,
}) => {
  return (
    <SectionContainer>
      <TopLandscapeContainer>
        <BlackTopRightShards />
        <Image layout="fill" src="/imgs/cropped-landscape-top.png" objectPosition="center top" objectFit="cover" />

        <Shader />
        <LeftShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top left"
            src="/imgs/store/landscape-white-left-shards.png"
          />
        </LeftShards>
      </TopLandscapeContainer>
      <AssetCards id="guild_section">
        <AssetBuyCard
          id={AssetCartId.ADVENTURERS}
          title={
            <span>
              ADVENTURERS
              <br /> GUILD
            </span>
          }
          hoverText="Note: We reserve the right to issue additional adventurer guilds if needed to support new players in the future"
          infoList={["Max 20 members", "1% of guild crafting sales"]}
          availableTotal={basicGuildTokenOriginalAmount}
          imgSrc="/imgs/store/boxes/adventurers-guild.jpg"
          cost={basicGuildTokenCost}
          finalCost={basicGuildTokenFinalCost}
          availableCount={basicGuildTokenAvailableAmount}
          onCartUpdate={setBasicGuildTokenAmount}
          cartCount={basicGuildTokenAmount}
          type2
          maxCountInCart={CART_ASSETS_LIMIT.ADVENTURERS_GUILD}
        />
        <AssetBuyCard
          id={AssetCartId.HEROES}
          title={
            <span>
              WARRIORS <br /> GUILD
            </span>
          }
          infoList={["Max 30 members", "2.5% of guild crafting sales"]}
          availableTotal={tier1GuildTokenOriginalAmount}
          imgSrc="/imgs/store/boxes/heroes-guild.jpg"
          cost={tier1GuildTokenCost}
          finalCost={tier1GuildTokenFinalCost}
          availableCount={tier1GuildTokenAvailableAmount}
          onCartUpdate={setTier1GuildTokenAmount}
          cartCount={tier1GuildTokenAmount}
          type2
          maxCountInCart={CART_ASSETS_LIMIT.WARRIORS_GUILD}
        />
        <AssetBuyCard
          id={AssetCartId.LEGENDS}
          title={
            <span>
              LEGENDS
              <br /> GUILD
            </span>
          }
          infoList={["Max 40 members", "5% of guild crafting sales"]}
          availableTotal={tier2GuildTokenOriginalAmount}
          imgSrc="/imgs/store/boxes/legends-guild.jpg"
          cost={tier2GuildTokenCost}
          finalCost={tier2GuildTokenFinalCost}
          availableCount={tier2GuildTokenAvailableAmount}
          onCartUpdate={setTier2GuildTokenAmount}
          cartCount={tier2GuildTokenAmount}
          type2
          maxCountInCart={CART_ASSETS_LIMIT.LEGENDS_GUILD}
        />
        <AssetBuyCard
          id={AssetCartId.MYTHIC}
          title={
            <span>
              MYTHIC <br /> GUILD
            </span>
          }
          infoList={["Max 50 members", "10% of guild crafting sales"]}
          availableTotal={tier3GuildTokenOriginalAmount}
          imgSrc="/imgs/store/boxes/mythic-guild.jpg"
          cost={tier3GuildTokenCost}
          finalCost={tier3GuildTokenFinalCost}
          availableCount={tier3GuildTokenAvailableAmount}
          onCartUpdate={setTier3GuildTokenAmount}
          cartCount={tier3GuildTokenAmount}
          type2
          maxCountInCart={CART_ASSETS_LIMIT.MYTHIC_GUILD}
        />
      </AssetCards>
      <SectionContent>
        <ShareBox referralUrl={referralUrl} />
      </SectionContent>
      ;
    </SectionContainer>
  );
};

export default ShareSection;
