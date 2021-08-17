import React from "react";
import styled from "styled-components";

import { Modal } from "../../components/modal";
import token from "../../styles/token";

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
`;

function HardwareWalletModal(props) {
  return (
    <Modal variant="dark" onClose={props.onClose}>
      <Content>
        <InfoIcon src="/imgs/icons/icon-info-orange.svg" />
        <Title>Link a hardware wallet</Title>
      </Content>
    </Modal>
  );
}

export default HardwareWalletModal;
