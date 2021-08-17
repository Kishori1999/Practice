import React, { useCallback } from "react";
import Image from "next/image";
import styled from "styled-components";
import UserCard from "../../components/forms/UserCard";
import TabRow from "./TabRow";
import Search from "../../components/forms/Search";
import token, { devices } from "../../styles/token";
import { heroProducts, otherProducts, petProducts, TabId } from "../../constants";

const HeroHeader = styled.div`
  position: relative;
  background: ${token.palette.dark.main};
  padding: 3.3em 2.5em 1em;

  @media ${token.collections.filterBreak} {
    padding: 2em 0 0;
  }
`;

const Media = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
`;

const HeroDesktop = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;

  @media screen and (min-width: 1200px) {
    display: block;
  }
`;

const HeroSmaller = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;

  @media screen and (min-width: 776px) {
    display: block;
  }

  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const HeroMobile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;

  @media screen and (min-width: 776px) {
    display: none;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(${token.palette.dark.mainRGB}, 1) 0, rgba(0, 0, 0, 0) 85%);
  pointer-events: none;

  @media ${token.collections.filterBreak} {
    display: none;
  }
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  @media ${token.collections.filterBreak} {
    border-top: 1px solid #394353;
    backdrop-filter: blur(20px);
    background: rgba(${token.palette.dark.mainRGB}, 0.5);
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 1em;

    @supports (backdrop-filter: blur(10px)) {
      background: none;
    }
  }

  @media ${devices.xxl} {
    padding: 0 0 0 calc(${token.collections.sideBarWidth} + 1em);
  }
`;
const HeaderLeftShards = styled.div`
  display: none;
  position: absolute;
  pointer-events: none;
  width: 100%;
  left: -1em;
  bottom: -9em;
  z-index: 2;
  height: 30em;

  @media ${devices.xxl} {
    display: block;
  }
`;

const HeaderRightShards = styled.div`
  display: none;
  position: absolute;
  pointer-events: none;
  width: 100%;
  right: 0;
  bottom: -0.5em;
  z-index: 1;
  height: 21.5em;

  @media ${devices.xxl} {
    display: block;
  }
`;
const SearchInput = styled(Search)`
  && {
    margin-top: ${token.collections.searchPadding};
    margin-bottom: ${token.collections.searchPadding};
    padding-bottom: 0;
    height: ${token.collections.mobileBarHeight};
    width: 100%;
    max-width: 100%;
    flex-grow: 0;

    @media ${token.collections.filterBreak} {
      width: 30em;
      height: ${token.collections.barHeight};
    }
    @media ${devices.lg} {
      margin-left: 1.5em;
      width: 40em;
    }
    @media ${devices.xxl} {
      margin-left: 0;
      width: 36em;
    }
    @media ${devices.xxxl} {
      width: 40em;
    }
  }
`;

const searchBarContentWidth = 4 * token.collections.cardWidth + 3 * token.collections.gridGap;
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  @media ${token.collections.filterBreak} {
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
  }

  @media ${devices.xxl} {
    width: ${searchBarContentWidth}em;
  }
`;

const CollectionsHeader = ({
  address,
  setHeroTypeFilter,
  heroTypeFilter,
  unboxedHeroes,
  unboxedPets,
  unboxedOther,
  searchTerm,
  setSearchTerm,
}) => {
  // map tab to filters
  const onTabChange = useCallback(
    tabValue => {
      switch (tabValue) {
        case TabId.PETS:
          setHeroTypeFilter(petProducts);
          break;
        case TabId.OTHER:
          setHeroTypeFilter(otherProducts);
          break;
        case TabId.HEROES:
        default:
          setHeroTypeFilter(heroProducts);
          break;
      }
    },
    [setHeroTypeFilter, petProducts, otherProducts, heroProducts],
  );

  const tabs = [
    {
      label: "Heroes",
      value: TabId.HEROES,
      count: unboxedHeroes.length,
      active: heroTypeFilter === heroProducts,
    },
    {
      label: "Pets",
      value: TabId.PETS,
      count: unboxedPets.length,
      active: heroTypeFilter === petProducts,
    },
    {
      label: "Other",
      value: TabId.OTHER,
      count: unboxedOther.length,
      active: heroTypeFilter === otherProducts,
    },
  ];

  return (
    <HeroHeader>
      <HeaderLeftShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="bottom left"
          src="/imgs/shards/white-left-shards.png"
        />
      </HeaderLeftShards>

      <HeaderRightShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="right center"
          src="/imgs/collections/collections-right-shards.png"
        />
      </HeaderRightShards>
      <Media>
        <HeroDesktop>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="50% center"
            src="/imgs/collections/collections-header.jpg"
            quality={85}
            alt="banner"
            priority
          />
        </HeroDesktop>
        <HeroSmaller>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="50% center"
            src="/imgs/collections/collections-header-smaller.png"
            alt="banner"
            priority
          />
        </HeroSmaller>
        <HeroMobile>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="50% center"
            src="/imgs/collections/collections-header-mobile.png"
            alt="banner"
            priority
          />
        </HeroMobile>
      </Media>
      <Shader />
      <UserCard address={address} />
      <SearchBar>
        <SearchContainer>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <TabRow onTabChange={onTabChange} tabs={tabs} />
        </SearchContainer>
      </SearchBar>
    </HeroHeader>
  );
};

export default CollectionsHeader;
