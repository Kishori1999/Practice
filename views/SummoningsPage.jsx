import React, { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Divider } from "antd";
import Assets from "../components/Assets/Assets";
import { Product, FEATURE_IS_COMING_SOON_MODE, backendUrl } from "../constants";
import { Link } from "../components";

const SummoningsPage = ({ enhancedAssets, address }) => {
  const [loaded, setLoaded] = useState(false);
  const [rareHeroes, setRareHeroes] = useState([]);
  const [epicHeroes, setEpicHeroes] = useState([]);
  const [legendaryHeroes, setLegendaryHeroes] = useState([]);
  const [pets, setPets] = useState([]);
  const [hiddenHeroesPlusLastUnboxed, setHiddenHeroesPlusLastUnboxed] = useState(false);
  const [currentAssets, setCurrentAssets] = useState(undefined);
  const [currentUnboxed, setCurrentUnboxed] = useState(false);

  useEffect(() => {
    if (!enhancedAssets) return;
    if (loaded) return;
    if (enhancedAssets.length > 0) {
      setRareHeroes(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.RareHeroPack));
      setEpicHeroes(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.EpicHeroPack));
      setLegendaryHeroes(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.LegendaryHeroPack));
      setPets(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.PetPack));
      setLoaded(true);
    }
  }, [enhancedAssets]);

  const resolveNothingToUnbox = () => {
    if (
      rareHeroes &&
      rareHeroes.length === 0 &&
      epicHeroes &&
      epicHeroes.length === 0 &&
      legendaryHeroes &&
      legendaryHeroes.length === 0 &&
      pets &&
      pets.length === 0
    ) {
      return true;
    }

    return false;
  };

  const handleSingleUnboxing = async (asset, assets) => {
    try {
      await axios.put(`${backendUrl}/api/assets/${asset._id}/unbox`);
      const newAssetState = {
        ...asset,
        unboxed: true,
      };
      setCurrentUnboxed(newAssetState);
      const assetsToSlice = assets ? [...assets] : [...currentAssets];
      const tempHiddenHeroesPlusLastUnboxed = [newAssetState, ...assetsToSlice.slice(1)];
      setHiddenHeroesPlusLastUnboxed(tempHiddenHeroesPlusLastUnboxed);
      switch (asset.product) {
        case Product.RareHeroPack:
          setRareHeroes(rareHeroes.slice(1));
          break;
        case Product.EpicHeroPack:
          setEpicHeroes(epicHeroes.slice(1));
          break;
        case Product.LegendaryHeroPack:
          setLegendaryHeroes(legendaryHeroes.slice(1));
          break;
        case Product.PetPack:
          setPets(pets.slice(1));
          break;
        default:
          break;
      }
    } catch (e) {
      // TODO: propagate error to user
      console.error(e);
    }
  };

  const handleMultipleUnboxing = async () => {
    if (currentAssets.length === 0) return;
    const product = currentAssets[0].product;

    try {
      await axios.put(`${backendUrl}/api/addresses/${address}/assets/unbox`, { filter: { product } });

      switch (product) {
        case Product.RareHeroPack:
          setRareHeroes([]);
          break;
        case Product.EpicHeroPack:
          setEpicHeroes([]);
          break;
        case Product.LegendaryHeroPack:
          setLegendaryHeroes([]);
          break;
        case Product.PetPack:
          setPets([]);
          break;
        default:
          break;
      }

      setCurrentAssets([]);
      setCurrentUnboxed(false);
    } catch (e) {
      // TODO: propagate error to user
      console.error(e);
    }
  };

  useEffect(() => {
    if (!currentUnboxed) return;
    const tempHiddenHeroesPlusLastUnboxed = [currentUnboxed, ...currentAssets.slice(1)];
    setHiddenHeroesPlusLastUnboxed(tempHiddenHeroesPlusLastUnboxed);
  }, [currentUnboxed]);

  const handleNextUnboxing = () => {
    setHiddenHeroesPlusLastUnboxed(false);
    setCurrentUnboxed(false);
    const newStateCurrentAssets = [...currentAssets.slice(1)];
    setCurrentAssets(newStateCurrentAssets);
    handleSingleUnboxing(newStateCurrentAssets[0], newStateCurrentAssets);
  };

  const handleSkipAll = () => {
    confirmAlert({
      title: "Warning",
      message: "This skips all animations and you will be able to view your assets in the collection",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleMultipleUnboxing(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleChangeCurrentAssets = assets => {
    setHiddenHeroesPlusLastUnboxed(false);
    setCurrentUnboxed(false);
    setCurrentAssets(assets);
    handleSingleUnboxing(assets[0], assets);
  };

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
        <h1>My Summonings</h1>
        <Divider />

        <div>
          <p>
            <button
              type="button"
              onClick={() => handleChangeCurrentAssets(rareHeroes)}
              disabled={rareHeroes.length === 0}
            >
              rare: {rareHeroes.length}
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={() => handleChangeCurrentAssets(epicHeroes)}
              disabled={epicHeroes.length === 0}
            >
              epic: {epicHeroes.length}
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={() => handleChangeCurrentAssets(legendaryHeroes)}
              disabled={legendaryHeroes.length === 0}
            >
              legendary: {legendaryHeroes.length}
            </button>
          </p>
          <p>
            <button type="button" onClick={() => handleChangeCurrentAssets(pets)} disabled={pets.length === 0}>
              pets: {pets.length}
            </button>
          </p>
        </div>

        {resolveNothingToUnbox() && (
          <>
            <h2>
              {FEATURE_IS_COMING_SOON_MODE ? (
                <a>COMING SOON</a>
              ) : (
                <Link href="/store">
                  <a>Buy more</a>
                </Link>
              )}
            </h2>
            <h2>
              {" // "}
              <Link href="/collections">
                <a>Collections page</a>
              </Link>
            </h2>
          </>
        )}
        {currentAssets && !currentUnboxed && (
          <Assets assets={currentAssets} handleSingleUnboxing={handleSingleUnboxing} pageSize={1} />
        )}
        {currentAssets && currentUnboxed && hiddenHeroesPlusLastUnboxed && (
          <Assets
            assets={hiddenHeroesPlusLastUnboxed}
            pageSize={1}
            handleSingleUnboxing={handleSingleUnboxing}
            showPaginator
          />
        )}
        {currentAssets && currentAssets.length === 1 && (
          // <Link href="/store">
          //   <a>Buy more</a>
          // </Link>
          <a>COMING SOON</a>
        )}
        {currentUnboxed && currentAssets.length > 1 && (
          <button type="button" onClick={() => handleNextUnboxing()}>
            Continue
          </button>
        )}
        {currentAssets && currentAssets.length > 0 && (currentAssets.length > 1 || !currentUnboxed) && (
          <button type="button" onClick={handleSkipAll}>
            Skip all
          </button>
        )}
      </div>
    </div>
  );
};

export default SummoningsPage;
