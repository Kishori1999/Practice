import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  padding: 32px;
  box-sizing: border-box;
`;

function BoxContent(props) {
  return <StyledContent {...props}>{props.children}</StyledContent>;
}

export default BoxContent;
