import React from "react";
import styled from "styled-components";
import token from "../../styles/token";

const CheckboxContainer = styled.div`
  display: flex;
  justify-items: center;
  align-content: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
/*
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  &&&&{
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  }
`
 */

const StyledCheckbox = styled.div`
  display: inline-block;
  width: var(--checkbox-size, 1.3em);
  height: var(--checkbox-size, 1.3em);
  background: ${props => (props.checked ? token.palette.blue.light : token.palette.light.background)};
  border: 1px solid ${token.palette.blue.light};
  transition: all 150ms;
  cursor: pointer;
  tab-index: 0;

  &:focus {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`;

const Checkbox = ({ className, checked, onChange, size }) => (
  <CheckboxContainer className={className}>
    <StyledCheckbox size={size} checked={checked} onClick={() => onChange()}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
