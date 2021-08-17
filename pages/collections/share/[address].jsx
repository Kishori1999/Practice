import React from "react";
import { NextSeo } from "next-seo";
import axios from "axios";
import CollectionsPage from "../../../src/modules/collections/CollectionsPage";
import { enhanceAssets, fetchMetadata } from "../../../helpers";
import { backendUrl } from "../../../constants";

const CollectionShare = ({ metadata, sharedAssets, sharedAddress }) => {
  const enhancedAssets = enhanceAssets(sharedAssets, metadata);

  return (
    <>
      <NextSeo title="Guild of Guardians - collections" />
      <CollectionsPage address={sharedAddress} enhancedAssets={enhancedAssets} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const { address } = query;
    const { data: assets } = await axios.get(`${backendUrl}/api/addresses/${address}/assets`);

    const metadata = await fetchMetadata();

    return {
      props: {
        metadata,
        sharedAssets: assets,
        sharedAddress: address,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        metadata: { heroes: [], pets: [] },
        sharedAssets: [],
        sharedAddress: null,
      },
    };
  }
}

export default CollectionShare;
