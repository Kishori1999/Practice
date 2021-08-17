import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../styles/token";

const BottomLandscapeContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30em;

  @media ${devices.md} {
    bottom: 0;
    left: 0;
    right: 0;
    height: 55em;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 5%);
  pointer-events: none;
`;

const BottomDarkLandscape = () => (
  <BottomLandscapeContainer>
    <Image layout="fill" src="/imgs/store/mountains-dark-bottom.png" objectPosition="left bottom" objectFit="cover" />
    <Shader />
  </BottomLandscapeContainer>
);

export default BottomDarkLandscape;
