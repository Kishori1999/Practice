import React from "react";
import Image from "next/image";
import styled from "styled-components";
import AssetBuyCard from "../../components/AssetBuyCard";
import token, { devices } from "../../styles/token";
import BlackTopRightShardsComponent from "../../components/shards/BlackTopRightShards";
import { AssetCartId } from "../../constants";
import { CART_ASSETS_LIMIT } from "../../../constants";

const SectionContent = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 0.5em;
  top: -9.5em;
`;

const SectionContainer = styled.div`
  position: relative;
  margin-bottom: -3em;
  @media ${devices.md} {
    margin-bottom: 0;
  }
`;

const UpperBrownParticles = styled.div`
  && {
    display: none;
    position: absolute;
    top: -3em;
    left: -3em;
    width: 10em;
    height: 10em;
    pointer-events: none;
    z-index: 1;

    @media ${devices.md} {
      display: block;
      top: -5em;
      left: -15em;
      height: 15em;
      width: 15em;
    }
  }
`;

const ParticlesRight = styled.div`
  position: absolute;
  display: none;
  left: auto;
  right: 0;
  top: 12em;
  width: 6em;
  height: 8em;
  pointer-events: none;
  z-index: 1;

  @media ${devices.xl} {
    display: block;
    top: 12em;
    right: -5em;
    width: 15em;
    height: 15em;
    transform: rotate(30deg);
  }
`;

const TopLandscapeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120em;

  @media ${devices.md} {
    height: 30em;
  }
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
  left: -12em;
  pointer-events: none;

  @media ${devices.md} {
    top: -14em;
    left: 0;
  }
`;

const HeroBuySection = ({
  rareHeroPackAvailableAmount,
  rareHeroPackOriginalAmount,
  rareHeroPackCost,
  rareHeroPackFinalCost,
  rareHeroPackAmount,
  setRareHeroPackAmount,
  legendaryHeroPackAvailableAmount,
  legendaryHeroPackOriginalAmount,
  legendaryHeroPackCost,
  legendaryHeroPackFinalCost,
  legendaryHeroPackAmount,
  setLegendaryHeroPackAmount,
  epicHeroPackAvailableAmount,
  epicHeroPackOriginalAmount,
  epicHeroPackCost,
  epicHeroPackFinalCost,
  epicHeroPackAmount,
  setEpicHeroPackAmount,
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
      <SectionContent id="hero_buy_section">
        <AssetBuyCard
          id={AssetCartId.RARE}
          title={
            <span>
              RARE <br /> HERO
            </span>
          }
          infoList={[
            "1 random Rare or better",
            "Chance for Epic / Legendary",
            "Chance for Chroma skins",
            "Chance for 1 of 1 Mythic",
          ]}
          availableTotal={rareHeroPackOriginalAmount}
          imgSrc="/imgs/store/boxes/rare-hero-summon.jpg"
          availableCount={rareHeroPackAvailableAmount}
          cost={rareHeroPackCost}
          finalCost={rareHeroPackFinalCost}
          cartCount={rareHeroPackAmount}
          onCartUpdate={setRareHeroPackAmount}
          particles={
            <UpperBrownParticles>
              <Image layout="fill" objectFit="contain" src="/imgs/particles/brown-particles-1.png" alt="particles" />
            </UpperBrownParticles>
          }
        />
        <AssetBuyCard
          id={AssetCartId.EPIC}
          title={
            <span>
              EPIC <br /> HERO
            </span>
          }
          infoList={[
            "1 random Epic or better",
            "Chance for Legendary",
            "Chance for Chroma skins",
            "Chance for 1 of 1 Mythic",
          ]}
          availableTotal={epicHeroPackOriginalAmount}
          imgSrc="/imgs/store/boxes/epic-hero-summon.jpg"
          availableCount={epicHeroPackAvailableAmount}
          cost={epicHeroPackCost}
          finalCost={epicHeroPackFinalCost}
          cartCount={epicHeroPackAmount}
          onCartUpdate={setEpicHeroPackAmount}
        />
        <AssetBuyCard
          id={AssetCartId.LEGENDARY}
          title={
            <span>
              LEGENDARY <br />
              HERO
            </span>
          }
          infoList={["1 random Legendary", "Chance for Chroma skins", "Chance for 1 of 1 Mythic"]}
          availableTotal={legendaryHeroPackOriginalAmount}
          imgSrc="/imgs/store/boxes/legendary-hero-summon.jpg"
          availableCount={legendaryHeroPackAvailableAmount}
          cost={legendaryHeroPackCost}
          finalCost={legendaryHeroPackFinalCost}
          cartCount={legendaryHeroPackAmount}
          onCartUpdate={setLegendaryHeroPackAmount}
          particles={
            <ParticlesRight>
              <Image layout="fill" objectFit="contain" src="/imgs/particles/brown-particles-2.png" alt="particles" />
            </ParticlesRight>
          }
          maxCountInCart={CART_ASSETS_LIMIT.LEGENDARY_HERO}
        />
      </SectionContent>
    </SectionContainer>
  );
};

export default HeroBuySection;
