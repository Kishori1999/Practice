import React from "react";
import { NextSeo } from "next-seo";
import CollectionsPage from "../../src/modules/collections/CollectionsPage";
import { enhanceAssets, fetchMetadata } from "../../helpers";

export async function getServerSideProps() {
  return {
    props: {
      metadata: await fetchMetadata(),
    },
  };
}

export default function Collections(props) {
  const { address, assets, metadata } = props;
  const enhancedAssets = enhanceAssets(assets, metadata);
  return (
    <>
      <NextSeo title="Guild of Guardians - collections" />
      <CollectionsPage address={address} enhancedAssets={enhancedAssets} />
    </>
  );
}
