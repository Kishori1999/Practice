import React from "react";
import axios from "axios";
import { NextSeo } from "next-seo";
import { enhanceAssets, fetchMetadata } from "../../helpers";
import SharePage from "../../src/modules/share/SharePage";
import { backendUrl } from "../../constants";

const Asset = ({ asset }) => {
  return (
    <>
      <NextSeo title={`Guild of Guardians - ${asset.name}`} />
      <SharePage asset={asset} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
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
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Asset;
