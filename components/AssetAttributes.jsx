import React from "react";
import styled from "styled-components";
import token, { devices } from "../styles/token";
import { getElementIconId, getFactionIconId, getPetClassIconId, getRarityIconId, rarityLabel } from "../constants";
import AssetIcon from "./AssetIcon";
import { AssetCategory } from "../../constants";

const Types = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${token.palette.light.main};
`;

const Type = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
  text-transform: uppercase;
  font-family: ${token.fontFamily.secondary};
  font-size: ${token.fontSizes.base};
  font-weight: bold;
  padding-left: 3em;
  padding-right: 3em;

  &:not(:first-child) {
    border-left: 1px solid rgba(64, 199, 226, 0.2);
  }

  @media screen and (min-width: 350px) {
    padding-left: 3.5em;
    padding-right: 3.5em;
  }

  @media ${devices.md} {
    font-size: ${token.fontSizes.xs};
  }
`;

const TypeText = styled.span`
  margin-top: 0.5em;
`;

const AttributeIcon = styled.div`
  width: 3em;
  height: 3em;
  @media ${devices.md} {
    width: 4em;
    height: 4em;
  }
`;

const AssetAttributes = ({ category, rarity, element, faction, petClass }) => {
  let types;
  if (category === AssetCategory.Hero) {
    types = (
      <Types>
        <Type>
          <AttributeIcon>
            <AssetIcon id={getElementIconId(element)} />
          </AttributeIcon>
          <TypeText>{element}</TypeText>
        </Type>
        <Type>
          <AttributeIcon>
            <AssetIcon id={getRarityIconId(rarity)} />
          </AttributeIcon>
          <TypeText>{rarityLabel[rarity]}</TypeText>
        </Type>
        <Type>
          <AttributeIcon>
            <AssetIcon id={getFactionIconId(faction)} />
          </AttributeIcon>
          <TypeText>{faction}</TypeText>
        </Type>
      </Types>
    );
  } else if (category === AssetCategory.Pet) {
    types = (
      <Types>
        <Type>
          <AttributeIcon>
            <AssetIcon id={getRarityIconId(rarity)} />
          </AttributeIcon>
          <TypeText>{rarityLabel[rarity]}</TypeText>
        </Type>
        <Type>
          <AttributeIcon>
            <AssetIcon id={getPetClassIconId(petClass)} />
          </AttributeIcon>
          <TypeText>{petClass}</TypeText>
        </Type>
      </Types>
    );
  } else {
    types = null;
  }
  return types;
};
export default AssetAttributes;
