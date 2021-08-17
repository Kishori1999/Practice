import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import token, { devices } from "../../styles/token";
import Dropdown from "../../components/forms/Dropdown";
import FilterSection from "../../components/forms/FilterSection";
import DropdownSelect from "../../components/forms/DropdownSelect";
import SlideUpWhenVisible from "../../components/animations/SlideUpWhenVisible";
import CollectionShareButton from "../../components/CollectionShareButton";
import CollectionsHeader from "./CollectionsHeader";
import { Rarity } from "../../../constants";
import {
  heroProducts,
  petProducts,
  classes,
  Element,
  elements,
  chromas,
  Faction,
  factions,
  Chroma,
  SortType,
} from "../../constants";
import Assets from "./Assets";
import { filterSetter } from "../../helpers";

const FooterShards = styled.div`
  position: absolute;
  width: 100%;
  bottom: -1px;
  height: 13em;
  left: 0;
  pointer-events: none;

  @media ${devices.md} {
    height: 15em;
  }
`;

const SortDesktop = styled.div`
  display: none;
  @media ${token.collections.filterBreak} {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    padding-top: 0.4em;
    padding-bottom: 0.7em;
  }
`;

const Filter = styled.div`
  color: ${token.palette.dark.main};
  display: flex;
  flex-flow: row wrap;
  min-width: 8em;
  margin: 2em auto 1em;
  flex-flow: row wrap;
  z-index: 2;
  justify-content: space-evenly;
  width: ${({ isOpen }) => (isOpen ? "100%" : "calc(100% - 5em)")};
  transition: width 100ms ease-in-out;
  transition-delay: ${({ isOpen }) => (isOpen ? 0 : "200ms")};

  @media ${token.collections.filterBreak} {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    margin-top: 3.8em;
    padding: 1em;
  }

  @media ${devices.lg} {
    padding: 0 2.2em 0 1.5em;
  }
`;

const ContentLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  @media ${devices.sm} {
    padding: 1em;
  }

  @media ${token.collections.filterBreak} {
    padding: 0.5em 0 0.5em 0.5em;
    margin-right: auto;
    grid-template-columns: 13em auto;
  }

  @media ${devices.lg} {
    padding: 1em 1em 12em;
    grid-template-columns: ${token.collections.sideBarWidth} auto;
  }
`;

const MainContent = styled.div`
  color: ${token.palette.dark.main};
  padding-bottom: 5em;
  margin-bottom: 3.4em;
  @media ${token.collections.filterBreak} {
    margin-right: auto;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const SortDropdown = styled(DropdownSelect)`
  --dropdown-text-align: center;
  --dropdown-bg: ${token.gradients.button.main};
  --dropdown-padding: 1.1em 1em 0.9em 1.3em;
  --dropdown-width: 100%;
  --dropdown-font-size: ${token.fontSizes.big};

  @media ${token.collections.filterBreak} {
    margin-left: 0.5em;
    --dropdown-bg: ${token.palette.dark.main};
    --dropdown-padding: 0.7em 1em 0.7em 1.3em;
    --dropdown-font-size: ${token.fontSizes.base};
    --dropdown-text-align: unset;
    --dropdown-width: 13em;
  }
`;

const SortingLabel = styled.span`
  font-size: ${token.fontSizes.xs};
`;
const Icon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2.4em;
  color: var(--icon-color, ${token.palette.light.main});

  @media ${devices.sm} {
    font-size: 0.8em;
    width: 4em;
  }
`;

const FilterMobile = styled.div`
  position: ${({ isOpen }) => (isOpen ? "fixed" : "relative")};
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  z-index: ${({ isOpen }) => (isOpen ? 8000 : 0)};
  margin-bottom: ${({ isOpen }) => (isOpen ? 0 : "2em")};

  @media ${token.collections.filterBreak} {
    display: none;
  }
`;

const FilterDropdown = styled(Dropdown)`
  --dropdown-padding: 1.1em 1em 0.9em 1.3em;
  --dropdown-width: 100%;
  --dropdown-font-size: ${token.fontSizes.big};
  --dropdown-text-align: center;

  @media ${token.collections.filterBreak} {
    --dropdown-bg: ${token.palette.light.main};
    --dropdown-width: 13em;
  }
`;

const FilterMobileContent = styled.div`
  width: 100%;
  background-color: white;
  padding: 1em;
`;

const FilterDesktop = styled.div`
  display: none;
  width: 100%;
  @media ${token.collections.filterBreak} {
    display: block;
  }
`;

const FilterHeaderMobile = styled.div`
  letter-spacing: ${token.collections.letterSpacing};
  text-align: center;
`;

const sortOptions = [
  {
    value: SortType.OLDEST_FIRST,
    label: "Oldest",
  },
  {
    value: SortType.NEWEST_FIRST,
    label: "Most recent",
  },
];

const CollectionsPage = ({ address, enhancedAssets = [] }) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [sortByOption, setSort] = useState(sortOptions[0]);
  const [heroTypeFilter, setHeroTypeFilter] = useState(heroProducts);
  // rarity
  const [rarityFilter, setRarityFilter] = useState([]);
  // faction
  const [raceFilter, setRaceFilter] = useState([]);
  // heroClass
  // TODO: Clean up type filter
  // eslint-disable-next-line no-unused-vars
  const [typeFilter, setTypeFilter] = useState([]);
  // element
  const [elementFilter, setElementFilter] = useState([]);
  // chroma
  const [chromaFilter, setChromaFilter] = useState([]);

  const unboxedList = enhancedAssets && enhancedAssets.filter(hero => hero.unboxed);
  const unboxedHeroes = unboxedList && unboxedList.filter(hero => heroProducts.includes(hero.product));
  const unboxedPets = unboxedList && unboxedList.filter(hero => petProducts.includes(hero.product));
  const unboxedOther =
    unboxedList &&
    unboxedList.filter(hero => !heroProducts.includes(hero.product) && !petProducts.includes(hero.product));

  const [filteredList, setFilteredList] = useState(
    enhancedAssets.filter(hero => hero.unboxed && heroProducts.includes(hero.product)),
  );

  useEffect(() => {
    setFilteredList(enhancedAssets.filter(hero => hero.unboxed && heroProducts.includes(hero.product)));
  }, [enhancedAssets.length]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSetRarityFilter = rarity => filterSetter(rarity, rarityFilter, setRarityFilter);
  const handleSetRaceFilter = race => filterSetter(race, raceFilter, setRaceFilter);
  // TODO: Clean up type filter
  // const handleSetTypeFilter = type => filterSetter(type, typeFilter, setTypeFilter);
  const handleSetElementFilter = element => filterSetter(element, elementFilter, setElementFilter);
  const handleSetChromaFilter = chroma => filterSetter(chroma, chromaFilter, setChromaFilter);

  const applyFilters = () => {
    const product = [...heroTypeFilter];
    const rarity = rarityFilter.length > 0 ? [...rarityFilter] : [...Object.values(Rarity)];
    const race = raceFilter.length > 0 ? [...raceFilter] : factions;
    const type = typeFilter.length > 0 ? [...typeFilter] : classes;
    const element = elementFilter.length > 0 ? [...elementFilter] : elements;
    const chroma = chromaFilter.length > 0 ? [...chromaFilter] : chromas;

    const raceFn = item => (heroProducts.includes(item.product) ? race.includes(item.faction) : item);
    const elementFn = item => (heroProducts.includes(item.product) ? element.includes(item.element) : item);
    const typeFn = item => (heroProducts.includes(item.product) ? type.includes(item.heroClass) : item);
    const chromaFn = item => (heroProducts.includes(item.product) ? chroma.includes(item.chroma) : item);
    const searchFn = item => {
      if (!searchTerm) return item;
      if (searchTerm === "") return item;
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const filterResult = enhancedAssets.filter(item => {
      return (
        item.unboxed &&
        product.includes(item.product) &&
        rarity.includes(item.rarity) &&
        raceFn(item) &&
        elementFn(item) &&
        typeFn(item) &&
        chromaFn(item) &&
        searchFn(item)
      );
    });

    switch (sortByOption.value) {
      case SortType.NEWEST_FIRST:
        filterResult.sort((a, b) => a.updatedAt - b.updatedAt);
        break;

      case SortType.OLDEST_FIRST:
        filterResult.sort((a, b) => b.updatedAt - a.updatedAt);
        break;
      default:
        // Nothing
        break;
    }

    setFilteredList(filterResult);
  };

  useEffect(() => {
    applyFilters();
  }, [heroTypeFilter, rarityFilter, raceFilter, typeFilter, elementFilter, chromaFilter, searchTerm, sortByOption]);

  const filters = {
    rarity: {
      filter: rarityFilter,
      onChange: handleSetRarityFilter,
      options: [
        { id: Rarity.Common, label: "Common" },
        { id: Rarity.Rare, label: "Rare" },
        { id: Rarity.Epic, label: "Epic" },
        { id: Rarity.Legendary, label: "Legendary" },
      ],
    },
    faction: {
      filter: raceFilter,
      onChange: handleSetRaceFilter,
      options: [
        { id: Faction.Empire, label: "Empire" },
        { id: Faction.Glade, label: "Glade" },
        { id: Faction.Horde, label: "Horde" },
      ],
    },
    element: {
      filter: elementFilter,
      onChange: handleSetElementFilter,
      options: [
        { id: Element.Water, label: "Water" },
        { id: Element.Earth, label: "Earth" },
        { id: Element.Fire, label: "Fire" },
        { id: Element.Light, label: "Light" },
        { id: Element.Dark, label: "Dark" },
      ],
    },
    "special edition": {
      filter: chromaFilter,
      onChange: handleSetChromaFilter,
      options: [
        { id: Chroma.Normal, label: "Normal" },
        { id: Chroma.Warrior, label: "Warrior" },
        { id: Chroma.Elite, label: "Elite" },
        { id: Chroma.Mythic, label: "Mythic" },
      ],
    },
    /*
    "type": {
    filter: [],
    onChange: ()=>{},
    options:[
    {id: "melee", label: "Melee", checked: false},
    {id: "ranged", label: "Ranged", checked: false},
    {id: "mage", label: "Mage", checked: false},
    ]},
    */
  };

  const filterSections = Object.keys(filters).map(cat => (
    <FilterSection
      key={cat}
      name={cat}
      filter={filters[cat].filter}
      options={filters[cat].options}
      onChange={id => {
        filters[cat].onChange(id);
      }}
    />
  ));

  const [shareLink, setShareLink] = useState(false);
  useEffect(() => {
    if (process.browser) {
      if (address || !shareLink) {
        setShareLink(`${window.location.origin}/collections/share/${address}`);
      }
    }
  }, [address]);

  // TODO: might be needed with working filter (imported from helpers)
  // preventScrolling(isFilterOpen);
  return (
    <Container>
      <CollectionsHeader
        address={address}
        setHeroTypeFilter={setHeroTypeFilter}
        heroTypeFilter={heroTypeFilter}
        unboxedHeroes={unboxedHeroes}
        unboxedOther={unboxedOther}
        unboxedPets={unboxedPets}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ContentLayout>
        <Filter isOpen={isFilterOpen}>
          <FilterMobile isOpen={isFilterOpen}>
            <FilterDropdown
              onOpenChange={status => setFilterOpen(status)}
              headerContent={
                <FilterHeaderMobile>
                  FILTER
                  <Icon>
                    <FontAwesomeIcon size="xs" icon={isFilterOpen ? faTimes : faChevronDown} />
                  </Icon>
                </FilterHeaderMobile>
              }
            >
              <FilterMobileContent>
                <SortDropdown
                  triggerText={`SORTED BY ${sortByOption.label}`}
                  selected={sortByOption}
                  options={sortOptions}
                  onSelect={v => setSort(v)}
                />
                {filterSections}
              </FilterMobileContent>
            </FilterDropdown>
          </FilterMobile>
          <FilterDesktop>{filterSections}</FilterDesktop>
          {shareLink && <CollectionShareButton link={shareLink} />}
        </Filter>

        <MainContent>
          <SortDesktop>
            <SortingLabel>Sorted By</SortingLabel>
            <SortDropdown selected={sortByOption} options={sortOptions} onSelect={v => setSort(v)} />
          </SortDesktop>
          <Assets filteredList={filteredList} />
        </MainContent>
      </ContentLayout>

      <SlideUpWhenVisible>
        <FooterShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="bottom left"
            src="/imgs/shards/black-bottom-left-shards-footer.png"
            alt="shards"
          />
        </FooterShards>
      </SlideUpWhenVisible>
    </Container>
  );
};
export default CollectionsPage;
