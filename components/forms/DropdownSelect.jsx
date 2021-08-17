import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import token, { devices } from "../../styles/token";

const padding = "1.1em 1em 0.9em 1.3em";

const OptionRow = styled.div`
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  padding: var(--dropdown-padding, ${padding});

  ${({ selected }) =>
    selected
      ? css`
          color: var(--selected-color, ${token.palette.blue.main});
        `
      : "inherit"};
`;

const Content = styled.div`
  position: absolute;
  top: 100%;
  z-index: 500;
  //box-shadow: ${token.palette.dark.main} 0px -2px 2px 30px;
  box-shadow: -1px 10px 4px rgba(0, 0, 0, 0.3);
  background: var(--dropdown-content-bg, ${token.palette.light.main});
  width: 100%;
`;

const Trigger = styled.div`
  background: var(--dropdown-bg, ${token.palette.dark.main});
  //background: var(--dropdown-bg, ${token.gradients.button.main});
  color: var(--dropdown-color, ${token.palette.light.main});
  padding: var(--dropdown-padding, ${padding});
  cursor: pointer;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  font-size: var(--dropdown-font-size, ${token.fontSizes.big});
  letter-spacing: ${token.collections.letterSpacing};
  text-align: var(--dropdown-text-align, left);
  width: var(--dropdown-width, 100%);
`;

const Icon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2.4em;
  color: var(--icon-color, ${token.palette.light.main});

  @media ${devices.sm} {
    font-size: 0.8em;
    width: 4em;
  }
`;

const DropdownSelect = ({ className, options, triggerText, headerContent, selected, onSelect }) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    // Close element on outside click
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const optionsElements = options.map(o => (
    <OptionRow
      key={o.value}
      onClick={() => {
        setOpen(false);
        onSelect(o);
      }}
      selected={selected.value === o.value}
    >
      {o.label}
    </OptionRow>
  ));

  let triggerContent;
  if (headerContent) {
    triggerContent = (
      <div>
        {headerContent}
        <Icon>
          <FontAwesomeIcon size="xs" icon={faChevronDown} />
        </Icon>
      </div>
    );
  } else {
    triggerContent = (
      <div>
        {triggerText != null ? triggerText.toUpperCase() : selected.label}
        <Icon>
          <FontAwesomeIcon size="xs" icon={faChevronDown} />
        </Icon>
      </div>
    );
  }

  return (
    <Container ref={ref} className={className}>
      <Trigger
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {triggerContent}
      </Trigger>
      {isOpen && <Content>{optionsElements}</Content>}
    </Container>
  );
};

export default DropdownSelect;
