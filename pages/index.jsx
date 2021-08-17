import React from "react";
import { NextSeo } from "next-seo";
import HomePage from "../src/modules/home/HomePage";
import { fetchMetadata } from "../helpers";

export async function getServerSideProps() {
  return {
    props: {
      metadata: await fetchMetadata(),
    },
  };
}

export default function Index() {
  return (
    <>
      <NextSeo title="Guild of Guardians" />
      <HomePage />
    </>
  );
}
