import React from "react";
import styled from "styled-components";
import token, { devices } from "../src/styles/token";

const TopBarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${token.topBar.height};
  background-color: ${token.palette.orange.main};
  color: #fff;
  padding: 0.425rem 1.5rem;
  font-weight: 400;
  letter-spacing: 0.5px;

  font-family: ${token.fontFamily.main};
  font-size: 1.375rem;

  @media ${devices.md} {
    font-size: 1.25rem;
  }

  @media ${devices.xl} {
    height: ${token.topBar.heightXl};
    font-size: 0.925rem;
    padding: 0.25rem 2.5rem;
  }

  @media ${devices.xxl} {
    font-size: 0.75rem;
  }

  @media ${devices.xxxl} {
    height: ${token.topBar.heightXXl};
  }
`;

export default function TopBar(props) {
  return <TopBarWrapper>{props.children}</TopBarWrapper>;
}
