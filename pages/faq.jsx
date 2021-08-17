import React from "react";
import { NextSeo } from "next-seo";
import FAQPage from "../src/modules/faq/FAQPage";

export default function Faq() {
  return (
    <>
      <NextSeo title="Guild of Guardians - FAQ" />
      <FAQPage />
    </>
  );
}
