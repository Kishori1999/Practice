import React from "react";
import styled from "styled-components";
import token from "../styles/token";

const sideSize = 12;
const diagonal = sideSize * Math.SQRT2;

const LeftDiv = styled.div`
  position: absolute;
  height: 0;
  width: calc(50% - ${diagonal / 2}px);
  border-top: 1px solid ${token.palette.orange.main};
`;

const RightDiv = styled(LeftDiv)`
  left: calc(50% + ${diagonal}px);
`;

const Arrow = styled.div`
  position: absolute;
  top: -${sideSize / 2 - 1}px;
  left: calc(50% - ${sideSize / 2}px);
  transform: rotate(45deg);
  width: ${sideSize}px;
  height: ${sideSize}px;
  border-bottom: 1px solid ${token.palette.orange.main};
  border-right: 1px solid ${token.palette.orange.main};
`;

const Container = styled.div`
  margin: 10px;
  position: relative;
`;

const Line = () => (
  <Container>
    <LeftDiv />
    <Arrow />
    <RightDiv />
  </Container>
);

export default Line;
