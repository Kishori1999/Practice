import React from "react";
import styled from "styled-components";
import LegalPageLayout from "../shared/LegalPageLayout";
import TermsNFT from "./TermsNFT";
import TermsAndConditions from "./TermsAndConditions";

const Content = styled.div`
  counter-reset: section;
`;

const TermsAndConditionsPage = () => (
  <LegalPageLayout title="TERMS & CONDITIONS">
    <Content>
      <TermsAndConditions />
    </Content>
    <Content>
      <TermsNFT />
    </Content>
  </LegalPageLayout>
);

export default TermsAndConditionsPage;
