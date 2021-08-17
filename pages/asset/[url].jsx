import React from "react";
import { NextSeo } from "next-seo";
import axios from "axios";
import AssetPage from "../../src/modules/asset/AssetPage";
import { enhanceAssets, fetchMetadata } from "../../helpers";
import { backendUrl } from "../../constants";

const Asset = ({ asset }) => {
  return (
    <>
      <NextSeo title={`Guild of Guardians - ${asset.name}`} />
      <AssetPage asset={asset} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { url } = query;
  const splitResult = url.split("-");
  const id = splitResult[splitResult.length - 1];
  const { data: asset } = await axios.get(`${backendUrl}/api/assets/${id}`);

  const metadata = await fetchMetadata();

  const decodedAsset = enhanceAssets([asset], metadata)[0];
  delete decodedAsset.createdAt;
  delete decodedAsset.updatedAt;

  const assetData = {
    ...asset,
    ...decodedAsset,
  };
  return {
    props: {
      asset: assetData,
    },
  };
}

export default Asset;
