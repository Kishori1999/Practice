import React from "react";
import { NextSeo } from "next-seo";
import TermsAndConditionsPage from "../src/modules/terms-and-conditions/TermsAndConditionsPage";

export default function TermsAnsConditions() {
  return (
    <>
      <NextSeo title="Guild of Guardians - Terms & Conditions" />
      <TermsAndConditionsPage />
    </>
  );
}
