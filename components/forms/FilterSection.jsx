import React from "react";
import styled from "styled-components";
import Image from "next/image";
import token from "../../styles/token";
import Checkbox from "./Checkbox";

const FilterRow = styled.div`
  --checkbox-size: 2.15em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #000a1d20;

  @media ${token.collections.filterBreak} {
    --checkbox-size: 1.3em;
    padding: 0;
    margin-top: 0.3em;
    border: none;
  }
`;

const LineArrow = styled.div`
  display: none;

  @media ${token.collections.filterBreak} {
    display: block;
    position: relative;
    width: 100%;
    height: 35px;
    margin-top: 0.2em;
    user-select: none;
  }
`;

const FilterSectionLabel = styled.div`
  padding-bottom: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  font-size: ${token.fontSizes.h4};
  border-bottom: 1px solid #000a1d20;

  @media ${token.collections.filterBreak} {
    border: none;
    padding-bottom: 0.5em;
    text-align: center;
    font-size: ${token.fontSizes.base};
  }
`;

const Label = styled.label`
  font-size: ${token.fontSizes.h4};

  @media ${token.collections.filterBreak} {
    font-size: ${token.fontSizes.base};
  }
`;

const FilterSectionContainer = styled.div`
  width: 100%;
  justify-self: flex-start;
  padding-top: 2em;

  @media ${token.collections.filterBreak} {
    padding-top: 0.5em;
  }
`;

const FilterSection = ({ name, filter, options, onChange }) => {
  const filters = options.map(option => (
    <FilterRow key={`${option.id}_${option.label}`}>
      <Label htmlFor={option.id}>{option.label}</Label>
      <Checkbox
        checked={filter.includes(option.id)}
        onChange={() => {
          onChange(option.id);
        }}
      />
    </FilterRow>
  ));

  return (
    <FilterSectionContainer key={name}>
      <FilterSectionLabel>{name}</FilterSectionLabel>
      {filters}
      <LineArrow>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="center center"
          src="/imgs/collections/collections-line.png"
        />
      </LineArrow>
    </FilterSectionContainer>
  );
};

export default FilterSection;
