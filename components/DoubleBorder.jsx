import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import token from "../styles/token";

const space = token.spaces.sm;
const borderWidth = "1px";
const border = css`
  ${borderWidth} solid ${token.palette.orange.mainWithOpacity}
`;

const doubleBorderCss = css`
  --double-border-distance: ${({ distance }) => distance || space};
  ${({ color }) =>
    color &&
    css`
      --double-border-color: ${color};
    `};
  position: relative;
  border: ${border};
  border-color: var(--double-border-color, ${token.palette.orange.mainWithOpacity});
  margin: var(--double-border-distance) 0;
  margin: 0 var(--double-border-distance);

  :before {
    content: " ";
    position: absolute;
    left: ${({ distance }) => (distance ? css`-${distance}` : css`-${space}`)};
    right: ${({ distance }) => (distance ? css`-${distance}` : css`-${space}`)};
    top: -${borderWidth};
    bottom: -${borderWidth};
    margin: var(--double-border-distance) 0;
    border: ${border};
    border-color: var(--double-border-color, ${token.palette.orange.mainWithOpacity});
    pointer-events: none;
  }
`;

const DoubleBorder = styled(motion.div)`
  ${doubleBorderCss}
`;

const AbsoluteBorder = styled(DoubleBorder)`
  position: absolute;
  pointer-events: none;
  top: ${({ padding }) => (padding != null ? css`calc(-${space} - ${padding})` : css`-${space}`)};
  right: ${({ padding }) => (padding != null ? css`calc(-${space} - ${padding})` : css`-${space}`)};
  bottom: ${({ padding }) => (padding != null ? css`calc(-${space} - ${padding})` : css`-${space}`)};
  left: ${({ padding }) => (padding != null ? css`calc(-${space} - ${padding})` : css`-${space}`)};
`;

export default DoubleBorder;
export { DoubleBorder, doubleBorderCss, AbsoluteBorder };
