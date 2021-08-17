import React from "react";
import { NextSeo } from "next-seo";
import MintPage from "../src/modules/mint/MintPage";
import { FEATURE_MINTING } from "../constants";

function Mint({ address }) {
  if (!FEATURE_MINTING) {
    return null;
  }
  return (
    <>
      <NextSeo title="Guild of Guardians - Mint" />
      <MintPage address={address} />
    </>
  );
}

export default Mint;
