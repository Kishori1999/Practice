import React from "react";
import styled from "styled-components";
import Image from "next/image";
import token from "../styles/token";
import Diamond from "./DoubleDiamond";

const HeaderContainer = styled.div`
  --container-width: ${({ width }) => width || 150}px;
  position: relative;
  width: ${({ width }) => width || 150}px;
  display: flex;
  justify-content: center;
`;

const arrowAspect = 2.196078431;
const arrowWidth = 60;
const arrowHeight = arrowWidth / arrowAspect;
const Arrow = styled.div`
  display: none;
  position: absolute;
  //bottom: -15px;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%);
  height: ${arrowHeight}px;
  width: ${arrowWidth}px;
  background: ${({ color }) => color || "transparent"};

  @media ${token.homepage.introduction.sliderBreak} {
    display: block;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
  }
`;

const lineDistance = 7;
const toBorder = width => width / 2 - arrowWidth / 2;
const UpperLeftLine = styled.div`
  position: absolute;
  top: 0;
  left: -${({ containerWidth }) => toBorder(containerWidth)}px;
  //right: 0;
  width: ${({ containerWidth }) => toBorder(containerWidth) + 3}px;
  height: 0;
  border-top: 1px solid ${token.palette.orange.main};
`;
const UpperRightLine = styled.div`
  position: absolute;
  top: 0;
  right: -${({ containerWidth }) => toBorder(containerWidth)}px;
  width: ${({ containerWidth }) => toBorder(containerWidth) + 3}px;
  height: 0;
  border-top: 1px solid ${token.palette.orange.main};
`;

const LowerLeftLine = styled.div`
  position: absolute;
  top: ${lineDistance}px;
  left: -${({ containerWidth }) => toBorder(containerWidth)}px;
  width: ${({ containerWidth }) => toBorder(containerWidth) + 8}px;
  height: 0;
  border-top: 1px solid ${token.palette.orange.main};
`;
const LowerRightLine = styled.div`
  position: absolute;
  top: ${lineDistance}px;
  right: -${({ containerWidth }) => toBorder(containerWidth)}px;
  width: ${({ containerWidth }) => toBorder(containerWidth) + 8}px;
  height: 0;
  border-top: 1px solid ${token.palette.orange.main};
`;

const LeftReachedBar = styled.div`
  position: absolute;
  top: 0;
  height: ${lineDistance + 1}px;
  left: -${({ containerWidth }) => toBorder(containerWidth)}px;
  width: ${({ containerWidth }) => toBorder(containerWidth) + 3}px;
  background: black;
  border-top: 1px solid ${token.palette.orange.main};
  border-bottom: 1px solid ${token.palette.orange.main};

  ::before {
    position: absolute;
    content: "";
    right: -7px;
    border-style: solid;
    border-width: ${lineDistance - 1}px 0 0 ${lineDistance}px;
    border-color: transparent transparent transparent ${token.palette.dark.main};
  }
`;

const RightReachedBar = styled.div`
  position: absolute;
  top: 0;
  height: ${lineDistance + 1}px;
  left: -${({ containerWidth }) => toBorder(containerWidth)}px;
  width: ${({ containerWidth }) => toBorder(containerWidth) + 3}px;
  background: black;
  border-top: 1px solid ${token.palette.orange.main};
  border-bottom: 1px solid ${token.palette.orange.main};

  ::before {
    position: absolute;
    content: "";
    left: -7px;
    border-style: solid;
    border-width: 0 0 ${lineDistance - 1}px ${lineDistance}px;
    border-color: transparent transparent ${token.palette.dark.main} transparent;
  }
`;

const DiamondWithArrow = ({
  children,
  borderVisible = true,
  blackBarLeft,
  blackBarRight,
  arrowVisible = true,
  withSidelines = true,
  arrowBgColor,
  containerWidth,
  ...props
}) => (
  <HeaderContainer width={containerWidth}>
    <Diamond {...props} borderVisible={borderVisible}>
      {children}
    </Diamond>
    <Arrow visible={arrowVisible} color={arrowBgColor}>
      <Image layout="fill" objectFit="contain" objectPosition="center center" src="/imgs/double-arrow.png" />
      {withSidelines && (
        <>
          <UpperLeftLine containerWidth={containerWidth || 150} />
          <UpperRightLine containerWidth={containerWidth || 150} />
          <LowerLeftLine containerWidth={containerWidth || 150} />
          <LowerRightLine containerWidth={containerWidth || 150} />
        </>
      )}

      {blackBarLeft && <LeftReachedBar containerWidth={containerWidth || 150} />}
      {blackBarRight && <RightReachedBar containerWidth={containerWidth || 150} />}
    </Arrow>
  </HeaderContainer>
);

export default DiamondWithArrow;
