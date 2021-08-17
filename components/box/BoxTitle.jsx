import React from "react";
import styled from "styled-components";
import token from "../../styles/token";

const StyledTitle = styled.span`
  display: block;
  font-family: ${token.fontFamily.secondary};
  font-size: 1.925rem;
  color: #fff;
  text-transform: uppercase;
`;

function BoxTitle(props) {
  return <StyledTitle {...props}>{props.children}</StyledTitle>;
}

export default BoxTitle;
