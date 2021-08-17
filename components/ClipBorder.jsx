import styled from "styled-components";
import token from "../styles/token";

const dw = 11; // dip width
const dh = 9; // dip height
const w = 1; // width
const ClipBorder = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background-color: ${token.palette.orange.mainWithLightOpacity};
  clip-path: polygon(
    0% 0%,
    0% 100%,
    ${w}px 100%,
    // inside
    1px 1px,
    calc(50% - ${dw}px) 1px,
    50% ${dh + 1}px,
    calc(50% + ${dw}px) 1px,
    calc(100% - 1px) 1px,
    // bottom right
    calc(100% - 1px) calc(100% - 1px),
    calc(50% + ${dw}px) calc(100% - 1px),
    50% calc(100% - ${dh + 1}px),
    calc(50% - ${dw}px) calc(100% - 1px),
    1px calc(100% - 1px),
    1px 100%,
    //outside
    calc(50% - ${dw}px) 100%,
    50% calc(100% - ${dh}px),
    calc(50% + ${dw}px) 100%,
    101% 100%,
    101% 0%,
    calc(50% + ${dw}px) 0,
    50% ${dh}px,
    calc(50% - ${dw}px) 0
  );
  pointer-events: none;
`;

export default ClipBorder;
