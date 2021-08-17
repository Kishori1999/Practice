import React from "react";
import { Router } from "next/router";
import { NextSeo } from "next-seo";
import StorePage from "../src/modules/store/StorePage";
import { FEATURE_IS_COMING_SOON_MODE } from "../constants";

function Store(props) {
  const { address, stocks } = props;
  const referralUrl = process.browser && address ? `${window.location.origin}?refcode=${address}` : "";

  return (
    <>
      <NextSeo title="Guild of Guardians - store" />
      <StorePage stocks={stocks} referralUrl={referralUrl} />
    </>
  );
}

Store.getInitialProps = async ctx => {
  if (!FEATURE_IS_COMING_SOON_MODE) {
    return {
      props: {},
    };
  }
  if (typeof window !== "undefined") {
    Router.push("/");
  } else {
    ctx.res.writeHead(302, { Location: "/" }).end();
  }
  return undefined;
};

export default Store;
