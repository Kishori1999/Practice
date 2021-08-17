import React from "react";
import styled from "styled-components";

import token from "../../styles/token";

const StyledHeader = styled.div`
  position: relative;
  background-color: ${token.palette.dark.main};
  padding: 16px 32px;
  box-sizing: border-box;
  color: #fff;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${token.palette.orange.main};
    z-index: 10;
  }
`;

const HeaderArrow = styled.div`
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid ${token.palette.orange.main};

  &:after {
    content: "";
    position: absolute;
    font-size: 1rem;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 1.425em;
    height: 1.425em;
    background: ${token.palette.dark.main};
    border-style: solid;
    border-color: ${token.palette.orange.main};
    border-width: 0 1px 1px 0;
    z-index: 1;
  }
`;

function BoxHeader(props) {
  return (
    <StyledHeader {...props}>
      {props.children}
      <HeaderArrow />
    </StyledHeader>
  );
}

export default BoxHeader;
