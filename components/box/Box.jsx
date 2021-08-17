import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 100%;
  filter: drop-shadow(0px 3px 50px rgba(0, 9, 24, 0.259));
  background-color: #fff;
`;

function Box(props) {
  return <StyledBox {...props}>{props.children}</StyledBox>;
}

export default Box;
