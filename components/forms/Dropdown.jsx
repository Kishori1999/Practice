import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import token from "../../styles/token";

const padding = "0.6em 1em";

const Content = styled.div`
  position: absolute;
  top: 100%;
  z-index: 500;
  box-shadow: -1px 10px 4px rgba(0, 0, 0, 0.3);
  background: var(--dropdown-content-bg, ${token.palette.light.background});
  width: 100%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 200ms ease-in-out;
  transition-delay: ${({ visible }) => (visible ? "100ms" : 0)};
`;
const Trigger = styled.div`
  background: var(--dropdown-bg, ${token.palette.dark.main});
  color: var(--dropdown-color, ${token.palette.light.main});
  padding: var(--dropdown-padding, ${padding});
  cursor: pointer;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  font-size: var(--dropdown-font-size, ${token.fontSizes.base});
  text-align: var(--dropdown-text-align, left);
  width: var(--dropdown-width, 100%);
`;

const Dropdown = ({ className, headerContent, children, onOpenChange }) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    // Close element on outside click
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (onOpenChange) onOpenChange(false);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <Container ref={ref} className={className}>
      <Trigger
        onClick={() => {
          if (onOpenChange) onOpenChange(!isOpen);
          setOpen(!isOpen);
        }}
      >
        {headerContent}
      </Trigger>
      {isOpen && <Content visible={isOpen}>{children}</Content>}
    </Container>
  );
};

export default Dropdown;
