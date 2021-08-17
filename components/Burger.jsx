import React from "react";
import styled from "styled-components";
import token, { devices } from "../styles/token";

const StyledBurger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 35px;
    height: 3px;
    background: ${token.palette.light.main};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(30deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-30deg)" : "rotate(0)")};
    }
  }
`;

const BurgerButton = styled.button`
  width: ${token.header.height};
  z-index: 300;
  margin-left: auto;
  //background-image: linear-gradient(270deg, #28b0d5 0%, ${token.palette.blue.dark} 100%);
  background: ${token.palette.dark.main};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active,
  &:focus {
    outline: none;
  }

  @media ${devices.xl} {
    display: none;
  }
`;

const Burger = ({ open, setOpen, className }) => {
  return (
    <BurgerButton className={className} onClick={() => setOpen(!open)} aria-label="Menu">
      <StyledBurger open={open}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </BurgerButton>
  );
};

export default Burger;
