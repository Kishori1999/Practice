import React from "react";
import styled from "styled-components";

const splitToValueUnit = value => {
  const [val, units] = value.match(/[\d.]+|\D+/g);
  return [parseFloat(val), units];
};
const calculateSideWidth = width => width / Math.SQRT2;
const getSideWidth = width => {
  let val;
  let units = "px";
  if (typeof width !== "number") {
    [val, units] = splitToValueUnit(width);
  } else {
    val = width;
  }
  val = calculateSideWidth(val);
  return `${val}${units}}`;
};

const DiamondInner = styled.div`
  width: ${({ width }) => getSideWidth(width)};
  height: ${({ width }) => getSideWidth(width)};
  transform: rotate(45deg);
  background-color: ${({ color }) => color};
`;

const DiamondOuter = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (typeof width === "string" ? width : `${width}px`)};
  height: ${({ width }) => (typeof width === "string" ? width : `${width}px`)};
  overflow: hidden;
`;

const Diamond = ({ className, width, color }) => (
  <DiamondOuter className={className} width={width}>
    <DiamondInner width={width} color={color} />
  </DiamondOuter>
);

export default Diamond;
