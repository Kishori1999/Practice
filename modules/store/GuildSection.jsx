import React from "react";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import NamedSection from "../../components/NamedSection";
import AssetBuyCard from "../../components/AssetBuyCard";
import BottomDarkLandscape from "../../components/BottomDarkLandscape";
import PhoneScreen from "../../components/PhoneScreen";
import LearnMore from "../../components/LearnMore";
import { AssetCartId } from "../../constants";

const Heading = styled.h1`
  margin-bottom: 0.15em;
  letter-spacing: -3px;
  margin-top: 29.5em;

  @media ${devices.md} {
    margin-top: 0.6em;
  }
`;

const GuildContent = styled.div`
  text-align: center;
  padding-top: 25em;
`;

const TextInfo = styled.div`
  font-size: ${token.fontSizes.h4};
  line-height: 1.2;
  margin-bottom: 1.6em;
  padding: 1em 1.5em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
  }
`;

const AssetCards = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -18em;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  flex-flow: column nowrap;

  @media ${devices.md} {
    position: absolute;
    flex-flow: row nowrap;
  }
`;

const GuildSection = ({
  petPackAvailableAmount,
  petPackOriginalAmount,
  petPackCost,
  petPackFinalCost,
  petPackAmount,
  setPetPackAmount,
  energyTokenAvailableAmount,
  energyTokenOriginalAmount,
  energyTokenCost,
  energyTokenFinalCost,
  energyTokenAmount,
  setEnergyTokenAmount,
}) => {
  return (
    <NamedSection name="GUILDS" topMark="27em">
      <GuildContent>
        <BottomDarkLandscape />
        <AssetCards id="pets_and_energy_section">
          <AssetBuyCard
            id={AssetCartId.PET}
            title={
              <span>
                PET
                <br />
                SUMMON
              </span>
            }
            infoList={["1 random pet (Common to Legendary)"]}
            availableTotal={petPackOriginalAmount}
            imgSrc="/imgs/store/boxes/pet-summon.jpg"
            availableCount={petPackAvailableAmount}
            cost={petPackCost}
            finalCost={petPackFinalCost}
            cartCount={petPackAmount}
            onCartUpdate={setPetPackAmount}
            type2
          />
          <AssetBuyCard
            id={AssetCartId.ENERGY}
            title={
              <span>
                ENERGY
                <br />
                BOOSTER
              </span>
            }
            infoList={["1 Energy Booster Token"]}
            availableTotal={energyTokenOriginalAmount}
            imgSrc="/imgs/store/boxes/energy-token.jpg"
            cost={energyTokenCost}
            finalCost={energyTokenFinalCost}
            availableCount={energyTokenAvailableAmount}
            cartCount={energyTokenAmount}
            onCartUpdate={setEnergyTokenAmount}
            type2
          />
        </AssetCards>
        <Heading>LEAD A GUILD</Heading>

        <TextInfo>
          Games are more fun with friends. Own a guild and get a share of every item crafted.
          <br />
          Battle other guilds and bosses for bonus loot, XP and special drops!
        </TextInfo>
        <LearnMore href="https://guildofguardians.medium.com/guilds-guild-of-guardians-founder-sale-a65602df730d" />
        <PhoneScreen />
      </GuildContent>
    </NamedSection>
  );
};
export default GuildSection;
