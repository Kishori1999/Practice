import React, { Fragment, useEffect, useState } from "react";
import { Divider } from "antd";
import Assets from "../components/Assets/Assets";
import { Product, Rarity } from "../constants";

export default function CollectionsPage({ enhancedAssets }) {
  const [loaded, setLoaded] = useState(false);
  const heroProducts = [Product.RareHeroPack, Product.EpicHeroPack, Product.LegendaryHeroPack];
  const petProducts = [Product.PetPack];
  const otherProducts = [
    Product.EnergyToken,
    Product.BasicGuildToken,
    Product.Tier1GuildToken,
    Product.Tier2GuildToken,
    Product.Tier3GuildToken,
  ];
  const races = ["Horde", "Human", "Glade"];
  const types = ["Melee", "Ranged", "Mage"];
  const elements = ["Water", "Earth", "Fire", "Light", "Dark"];
  const chromas = [0, 1, 2, 3, 4];

  const [heroTypeFilter, setHeroTypeFilter] = useState(heroProducts);
  // rarity
  const [rarityFilter, setRarityFilter] = useState([]);
  // faction
  const [raceFilter, setRaceFilter] = useState([]);
  // heroClass
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

  const [filteredList, setFilteredList] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!enhancedAssets) return;
    if (loaded) return;
    if (enhancedAssets.length > 0) {
      setFilteredList(enhancedAssets.filter(hero => hero.unboxed && heroProducts.includes(hero.product)));
      setLoaded(true);
    }
  }, [enhancedAssets]);

  const removeFromArrayByIndex = (array, indexToRemove) => [
    ...array.slice(0, indexToRemove),
    ...array.slice(indexToRemove + 1),
  ];

  const handleSetRarityFilter = rarity => {
    if (rarityFilter.indexOf(rarity) !== -1) {
      const indexToRemove = rarityFilter.indexOf(rarity);
      const result = removeFromArrayByIndex(rarityFilter, indexToRemove); // [...rarityFilter.slice(0, indexToRemove), ...rarityFilter.slice(indexToRemove + 1)];
      setRarityFilter(result);
    } else {
      setRarityFilter([...rarityFilter, rarity]);
    }
  };

  const handleSetRaceFilter = race => {
    if (raceFilter.indexOf(race) !== -1) {
      const indexToRemove = raceFilter.indexOf(race);
      const result = removeFromArrayByIndex(raceFilter, indexToRemove);
      setRaceFilter(result);
    } else {
      setRaceFilter([...raceFilter, race]);
    }
  };

  const renderRaceFilter = () => {
    return races.map(race => (
      <Fragment key={race}>
        <input type="checkbox" onClick={() => handleSetRaceFilter(`${race}`)} /> {race}
      </Fragment>
    ));
  };

  const handleSetTypeFilter = type => {
    if (typeFilter.indexOf(type) !== -1) {
      const indexToRemove = typeFilter.indexOf(type);
      const result = removeFromArrayByIndex(typeFilter, indexToRemove);
      setTypeFilter(result);
    } else {
      setTypeFilter([...typeFilter, type]);
    }
  };

  const renderTypeFilter = () => {
    return types.map(type => (
      <Fragment key={type}>
        <input type="checkbox" onClick={() => handleSetTypeFilter(`${type}`)} /> {type}
      </Fragment>
    ));
  };

  const handleSetElementFilter = element => {
    if (elementFilter.indexOf(element) !== -1) {
      const indexToRemove = elementFilter.indexOf(element);
      const result = removeFromArrayByIndex(elementFilter, indexToRemove);
      setElementFilter(result);
    } else {
      setElementFilter([...elementFilter, element]);
    }
  };

  const renderElementFilter = () => {
    return elements.map(element => (
      <Fragment key={element}>
        <input type="checkbox" onClick={() => handleSetElementFilter(`${element}`)} /> {element}
      </Fragment>
    ));
  };

  const handleSetChromaFilter = chroma => {
    if (chromaFilter.indexOf(chroma) !== -1) {
      const indexToRemove = chromaFilter.indexOf(chroma);
      const result = removeFromArrayByIndex(chromaFilter, indexToRemove);
      setChromaFilter(result);
    } else {
      setChromaFilter([...chromaFilter, chroma]);
    }
  };

  const renderChromaFilter = () => {
    return chromas.map(chroma => (
      <Fragment key={chroma}>
        <input type="checkbox" onClick={() => handleSetChromaFilter(chroma)} /> {chroma}
      </Fragment>
    ));
  };

  const applyFilters = () => {
    const product = [...heroTypeFilter];
    const rarity = rarityFilter.length > 0 ? [...rarityFilter] : [...Object.values(Rarity)];
    const race = raceFilter.length > 0 ? [...raceFilter] : races;
    const type = typeFilter.length > 0 ? [...typeFilter] : types;
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

    setFilteredList(filterResult);
  };

  useEffect(() => {
    applyFilters();
  }, [heroTypeFilter, rarityFilter, raceFilter, typeFilter, elementFilter, chromaFilter, searchTerm]);

  return (
    <div>
      <div
        style={{
          padding: 16,
          width: 600,
          margin: "auto",
          marginTop: 64,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Divider />
        <div
          style={{
            padding: 16,
            width: 600,
            margin: "auto",
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          Rarity
          <br />
          <input type="checkbox" onClick={() => handleSetRarityFilter(0)} /> 0
          <input type="checkbox" onClick={() => handleSetRarityFilter(1)} /> 1
          <input type="checkbox" onClick={() => handleSetRarityFilter(2)} /> 2
          <input type="checkbox" onClick={() => handleSetRarityFilter(3)} /> 3
          <input type="checkbox" onClick={() => handleSetRarityFilter(4)} /> 4
        </div>
        <div className={JSON.stringify(heroProducts) === JSON.stringify(heroTypeFilter) ? "" : "filter-hidden"}>
          <div
            style={{
              padding: 16,
              width: 600,
              margin: "auto",
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            Race
            <br />
            {renderRaceFilter()}
          </div>

          <div
            style={{
              padding: 16,
              width: 600,
              margin: "auto",
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            Type (heroClass)
            <br />
            {renderTypeFilter()}
          </div>

          <div
            style={{
              padding: 16,
              width: 600,
              margin: "auto",
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            Element
            <br />
            {renderElementFilter()}
          </div>

          <div
            style={{
              padding: 16,
              width: 600,
              margin: "auto",
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            Chroma
            <br />
            {renderChromaFilter()}
          </div>
        </div>
        <br />
        <br />
        <Divider />
        <h1>My Collection</h1>
        {unboxedHeroes && (
          <button type="button" onClick={() => setHeroTypeFilter(heroProducts)} disabled={unboxedHeroes.length === 0}>
            Show heroes
          </button>
        )}
        {unboxedPets && (
          <button type="button" onClick={() => setHeroTypeFilter(petProducts)} disabled={unboxedPets.length === 0}>
            Show pets
          </button>
        )}
        {unboxedOther && (
          <button type="button" onClick={() => setHeroTypeFilter(otherProducts)} disabled={unboxedOther.length === 0}>
            Show other
          </button>
        )}
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /> Search
        <Divider />
        {!filteredList && "Empty"}
        {filteredList && <Assets assets={filteredList} pageSize={12} />}
        <Divider />
      </div>
    </div>
  );
}
