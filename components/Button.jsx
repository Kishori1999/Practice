import styled, { css } from "styled-components";
import token from "../styles/token";

const ButtonStyles = css`
  position: relative;
  color: ${token.palette.light.main};
  border: 1px solid ${token.palette.orange.main};
  background-image: linear-gradient(to right, ${token.palette.blue.dark} 0%, ${token.palette.blue.light} 100%);
  transition: all 0.5s ease-in-out;
  padding: 0.8rem 0.5rem;
  cursor: pointer;
  text-align: center;

  :hover,
  :focus {
    color: ${token.palette.light.main};
    border: 1px solid ${token.palette.orange.main};
    background-image: linear-gradient(to right, ${token.palette.blue.dark} 0%, ${token.palette.blue.light} 100%);
  }

  ::before {
    position: absolute;
    content: "";
    box-shadow: 0 0 60px 6px ${token.palette.blue.dark};
    opacity: 0;
    transition: opacity 0.4s ease-out;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  :hover::before {
    opacity: 1;
  }
`;

const Button = styled.button`
  ${ButtonStyles}
`;

export default Button;
export { ButtonStyles };
