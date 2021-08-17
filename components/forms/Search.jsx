import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import token from "../../styles/token";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  color: ${token.palette.light.main};
  flex-grow: 1;
  padding-bottom: ${token.collections.searchPadding};
`;

const SearchInput = styled.input`
  font-family: ${token.fontFamily.main};
  font-size: ${token.fontSizes.big};
  position: relative;
  background: transparent;
  border: none;
  padding: 0 2.3em;
  height: 100%;
  width: 100%;
  color: ${token.palette.light.main};

  &::placeholder {
    color: ${token.palette.light.main};
    opacity: 1;
  }

  @media ${token.collections.filterBreak} {
    font-size: ${token.fontSizes.base};
    padding: 0 2.9em;
  }
`;

const SearchButton = styled.button`
  background: ${token.palette.dark.main};
  color: ${token.palette.light.main};
  font-size: ${token.fontSizes.big};
  letter-spacing: 0.0675em;
  border: none;
  padding: 0 2.2em;
  cursor: pointer;

  :active {
    border: none;
  }

  @media ${token.collections.filterBreak} {
    font-size: ${token.fontSizes.xs};
    padding: 0 2.2em;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  color: ${token.palette.blue.light};
  font-size: 1.5em;
  margin-left: 1em;
  width: 1em;
  top: 0;
  bottom: 0;
  left: 0;

  @media ${token.collections.filterBreak} {
    font-size: 1.1em;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(${token.palette.light.mainRGB}, 0.3);
`;

const Search = ({ className, onChange, value }) => {
  return (
    <SearchContainer className={className}>
      <InputContainer>
        <SearchIcon>
          <FontAwesomeIcon size="1x" icon={faSearch} />
        </SearchIcon>
        <SearchInput type="text" placeholder="Search" value={value} onChange={e => onChange(e.target.value)} />
      </InputContainer>
      <SearchButton onClick={() => onChange("")}>CLEAR</SearchButton>
    </SearchContainer>
  );
};

export default Search;
