import React from "react";
import { NextSeo } from "next-seo";
import PrivacyPage from "../src/modules/privacy/PrivacyPage";

export default function Privacy() {
  return (
    <>
      <NextSeo title="Guild of Guardians - privacy" />
      <PrivacyPage />
    </>
  );
}
