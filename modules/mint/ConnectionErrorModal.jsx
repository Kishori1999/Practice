import React from "react";
import styled from "styled-components";

import { Modal } from "../../components/modal";
import token from "../../styles/token";
import TransparentButton from "../summonings/TransparentButton";

const Content = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
`;

const InfoIcon = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  display: block;
  margin: 0 auto 2rem;
`;

const Title = styled.span`
  display: block;
  font-size: 2rem;
  font-family: ${token.fontFamily.secondary};
  line-height: 1.25;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  display: block;
`;

const CloseButton = styled(TransparentButton)`
  font-size: 0.825rem;
  min-width: 15em;
  letter-spacing: 2px;
  padding: 1em;
  text-transform: uppercase;
  margin-top: 4rem;
  z-index: 10;
`;

function ConnectionErrorModal(props) {
  return (
    <Modal variant="dark" onClose={props.onClose}>
      <Content>
        <InfoIcon src="/imgs/icons/icon-info-orange.svg" />
        <Title>Wallet could not be added</Title>
        <ErrorMessage>{props.error}</ErrorMessage>
        <CloseButton onClick={props.onClose}>Close</CloseButton>
      </Content>
    </Modal>
  );
}

export default ConnectionErrorModal;
