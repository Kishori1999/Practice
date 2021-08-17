import styled from "styled-components";
import { devices } from "../styles/token";

const MdBreakline = styled.br`
  display: none;
  @media ${devices.md} {
    display: initial;
  }
`;

export default MdBreakline;
