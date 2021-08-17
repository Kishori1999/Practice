import React, { useEffect, useState } from "react";
import styled from "styled-components";
import token from "../../styles/token";
import Pagination from "../../components/forms/Pagination";
import AssetCard from "../../components/AssetCard";

const AssetsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.7rem;
  padding: 0 1.5em 1em;
  grid-gap: 2em 1em;
  justify-content: space-evenly;
  align-content: center;
  justify-items: center;

  @media screen and (min-width: 366px) {
    padding: 0 2.5em 1em;
    font-size: max(calc(10px + 6 * ((100vw - 433px) / 164)), 1rem);
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 597px) {
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    font-size: max(calc(10px + 6.5 * ((100vw - 597px) / 290)), 1rem);
  }

  @media ${token.collections.filterBreak} {
    display: inline-grid;
    padding: 0 0 1em 0;
    grid-gap: 1em;
    //grid-template-columns: repeat(auto-fill, 312px);
    font-size: 1rem;
    grid-template-columns: repeat(3, 19em);
  }

  @media screen and (min-width: 1050px) {
    font-size: max(calc(60% + 5 * ((100vw - 768px) / 632)), 10px);
    grid-template-columns: repeat(4, 19em);
  }

  @media ${token.collections.cardBreak} {
    font-size: 1rem;
    grid-template-columns: repeat(4, ${token.collections.cardWidth}em);
    justify-content: space-between;
    grid-gap: 1.9em;
  }
`;

const StyledPagination = styled(Pagination)`
  margin-top: 3.5em;
`;

const Assets = ({ filteredList, assetsPerPage = 12 }) => {
  const [activePage, changePage] = useState(1);
  const indexOfLastPurchase = activePage * assetsPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - assetsPerPage;
  const currentAssets = filteredList.slice(indexOfFirstPurchase, indexOfLastPurchase);

  useEffect(() => {
    changePage(1);
  }, [filteredList]);

  const assets = currentAssets.map(asset => (
    <AssetCard
      key={asset.transactionHash + "-" + asset.product + "-" + asset.type + "-" + asset.indexInOrder}
      chroma={asset.chroma}
      category={asset.category}
      id={asset.name}
      name={asset.name}
      tagline={asset.tagline}
      element={asset.element}
      rarity={asset.rarity}
      faction={asset.faction}
      petClass={asset.petClass}
      edition={{ assetNumber: 1, total: 1200 }}
      imgSrc={asset.assetFile}
      url={asset.url}
    />
  ));

  const hidePaginator = filteredList.length < assetsPerPage;
  return (
    <>
      <AssetsContainer>{filteredList.length !== 0 && assets}</AssetsContainer>
      {!hidePaginator && (
        <StyledPagination
          activePage={activePage}
          onChange={changePage}
          itemsCountPerPage={assetsPerPage}
          totalItemsCount={filteredList.length}
        />
      )}
    </>
  );
};
export default Assets;
