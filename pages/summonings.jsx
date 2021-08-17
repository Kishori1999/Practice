import React from "react";
import { NextSeo } from "next-seo";
import SummoningsPage from "../src/modules/summonings/SummoningsPage";
import { enhanceAssets, fetchMetadata } from "../helpers";

export async function getServerSideProps() {
  return {
    props: {
      metadata: await fetchMetadata(),
    },
  };
}

export default function Summonings(props) {
  const { address, assets, metadata } = props;

  const enhancedAssets = enhanceAssets(assets, metadata);

  return (
    <>
      <NextSeo title="Guild of Guardians - summonings" />
      <SummoningsPage enhancedAssets={enhancedAssets} address={address} />;
    </>
  );
}
