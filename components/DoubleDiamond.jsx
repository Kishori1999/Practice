import React from "react";
import styled, { css } from "styled-components";
import token from "../styles/token";

const getSideWidth = width => Math.round(width / Math.SQRT2);
const DiamondInner = styled.div`
  ${({ color }) =>
    color &&
    css`
      --diamond-color: ${color};
    `}
  position: relative;
  width: ${({ width }) => getSideWidth(width)}px;
  height: ${({ width }) => getSideWidth(width)}px;
  background-color: var(--diamond-color, "transparent");
  color: ${({ scaleOnSelect, selected }) => (!scaleOnSelect && selected ? token.palette.light.main : "inherit")};
  border-style: solid;
  border-width: 1px;
  border-color: ${token.palette.orange.main};
  box-shadow: ${({ selected, scaleOnSelect }) =>
    selected && scaleOnSelect ? `0 0 15px 3px ${token.palette.blue.dark}` : "none"};
  transform: rotate(45deg);

  @media ${token.homepage.introduction.sliderBreak} {
    border-color: ${({ borderVisible }) => (borderVisible ? token.palette.orange.main : "transparent")};
  }
`;

const DiamondOuter = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  transition: all 200ms ease-in-out;
  transform-origin: bottom;
  transform: ${({ selected, scaleOnSelect }) => (selected && scaleOnSelect ? css`scale(1.5)` : "none")};
  cursor: pointer;
  z-index: 1;

  :hover {
    transform: ${({ selected, scaleOnSelect }) => {
      let scale = "none";
      if (scaleOnSelect) {
        scale = selected ? `scale(1.5)` : `scale(1.1)`;
      }
      return scale;
    }};
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform: rotate(-45deg) scale(${Math.SQRT2});
`;
const DiamondContent = styled.div`
  ${({ gapWidth }) =>
    gapWidth &&
    css`
      --gap-width: ${gapWidth}px;
    `}
  position: absolute;
  top: var(--gap-width, 5px);
  right: var(--gap-width, 5px);
  bottom: var(--gap-width, 5px);
  left: var(--gap-width, 5px);
  /*
  top: ${({ gapWidth }) => gapWidth}px;
  right: ${({ gapWidth }) => gapWidth}px;
  bottom: ${({ gapWidth }) => gapWidth}px;
  left: ${({ gapWidth }) => gapWidth}px;
   */
  border-style: solid;
  border-width: 1px;
  border-color: ${token.palette.orange.main};
  overflow: hidden;

  @media ${token.homepage.introduction.sliderBreak} {
    border-color: ${({ borderVisible }) => (borderVisible ? token.palette.orange.main : "transparent")};
  }
`;
const DoubleDiamond = ({
  gapWidth,
  borderVisible = true,
  width,
  color,
  children,
  selected,
  onClick,
  scaleOnSelect,
}) => {
  return (
    <DiamondOuter width={width} onClick={onClick} selected={selected} scaleOnSelect={scaleOnSelect}>
      <DiamondInner
        borderVisible={borderVisible}
        width={width}
        color={color}
        selected={selected}
        scaleOnSelect={scaleOnSelect}
      >
        <DiamondContent gapWidth={gapWidth} borderVisible={borderVisible}>
          <Inner>{children}</Inner>
        </DiamondContent>
      </DiamondInner>
    </DiamondOuter>
  );
};
export default DoubleDiamond;
