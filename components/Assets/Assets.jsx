import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { AssetCategory, Product } from "../../constants";
import Hero from "./Hero";
import Pet from "./Pet";
import Token from "./Token";

const Assets = ({ assets, handleSingleUnboxing, pageSize, hidePaginator }) => {
  const [activePage, setCurrentPage] = useState(1);
  const indexOfLastPurchase = activePage * pageSize;
  const indexOfFirstPurchase = indexOfLastPurchase - pageSize;
  const currentAssets = assets.slice(indexOfFirstPurchase, indexOfLastPurchase);

  const renderAssetCharacterType = asset => {
    switch (asset.category) {
      case AssetCategory.Hero:
        return <Hero hero={asset} />;
      case AssetCategory.Pet:
        return <Pet pet={asset} />;
      default:
        return <Token token={asset} />;
    }
  };

  const assetComponents = currentAssets.map(asset => {
    return (
      <div key={asset._id} style={{ width: 600 }}>
        {!asset.unboxed && (
          <div>
            <h3>{Object.keys(Product).find(key => Product[key] === asset.product)}</h3>
            <button type="button" onClick={() => handleSingleUnboxing(asset)}>
              Unbox me
            </button>
          </div>
        )}
        {asset.unboxed && renderAssetCharacterType(asset)}
      </div>
    );
  });

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {assetComponents}
      {hidePaginator && (
        <div className="pagination">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={pageSize}
            totalItemsCount={assets.length}
            pageRangeDisplayed={1}
            onChange={handlePageChange}
            hideFirstLastPages
          />
        </div>
      )}
    </div>
  );
};

export default Assets;
