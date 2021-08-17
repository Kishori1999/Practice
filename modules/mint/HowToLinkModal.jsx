import React from "react";
import styled from "styled-components";
import ActionCallButton from "../../components/ActionCallButton";

import { Modal, ModalHeader, ModalTitle } from "../../components/modal";
import token from "../../styles/token";

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 2em;
  width: auto;
  display: inline-block;
`;

const CloseButton = styled(ActionCallButton)`
  min-width: 13em;
  padding: 1em 2em;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 0.725em;
`;

const Steps = styled.div`
  margin-bottom: 1.5em;

  max-width: 800px;
  margin: 0 auto 2em;
`;

const Step = styled.div`
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 1px solid rgba(${token.palette.dark.mainRGB}, 0.2);
  padding: 1em 0;
  box-sizing: border-box;
`;

const StepImage = styled.img`
  display: block;
  flex-basis: 9em;
`;

const StepInfo = styled.div`
  margin-left: 2em;
  text-align: left;
  padding: 1.125em 0;
  box-sizing: border-box;
`;

const StepNumber = styled.span`
  display: block;
  color: ${token.palette.blue.main};
  font-size: 0.625em;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.5;
  margin-bottom: 0.5em;
`;

const StepTitle = styled.span`
  display: block;
  color: ${token.palette.dark.main};
  line-height: 1.25;
  font-weight: 600;
  font-size: 1em;
  margin-bottom: 1em;
`;

const StepDescription = styled.p`
  font-size: 0.675em;
`;

const CloseButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5em;
`;

function HowToLinkModal(props) {
  return (
    <Modal variant="light" onClose={props.onClose}>
      <ModalHeader>
        <HeaderRow>
          <ModalTitle>Linking your wallets</ModalTitle>
          <Logo src="/imgs/mint/link-wallet-logo-x.svg" />
        </HeaderRow>
      </ModalHeader>
      <Steps>
        <Step>
          <StepImage src="/imgs/mint/link-step-1.jpg" />
          <StepInfo>
            <StepNumber>Step 1</StepNumber>
            <StepTitle>Press the Link button.</StepTitle>
            <StepDescription>
              You will see an Immutable X window pop up,
              <br />
              followed by a MetaMask window.
            </StepDescription>
          </StepInfo>
        </Step>
        <Step>
          <StepImage src="/imgs/mint/link-step-2.jpg" />
          <StepInfo>
            <StepNumber>Step 2</StepNumber>
            <StepTitle>Make sure all your addresses match.</StepTitle>
            <StepDescription>
              Check the Immutable X window, MetaMask,
              <br />
              and your Guild of Guardians Manage Wallets page
            </StepDescription>
          </StepInfo>
        </Step>
        <Step>
          <StepImage src="/imgs/mint/link-step-3.jpg" />
          <StepInfo>
            <StepNumber>Step 3</StepNumber>
            <StepTitle>Sign Immutable X request.</StepTitle>
            <StepDescription>
              In order to confirm your identity and intent,
              <br />
              you must give your signed approval.
            </StepDescription>
          </StepInfo>
        </Step>
        <Step>
          <StepImage src="/imgs/mint/link-step-4.jpg" />
          <StepInfo>
            <StepNumber>Step 4</StepNumber>
            <StepTitle>Setup Immutable X account & key.</StepTitle>
            <StepDescription>
              This is associated with your MetaMask wallet.
              <br />
              You will not see a number or phrase.
            </StepDescription>
          </StepInfo>
        </Step>
      </Steps>
      <CloseButtonWrapper>
        <CloseButton onClick={props.onClose}>Go back</CloseButton>
      </CloseButtonWrapper>
    </Modal>
  );
}

export default HowToLinkModal;
