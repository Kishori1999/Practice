import { createGlobalStyle, css } from "styled-components";
import token, { devices } from "./token";

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    //font-size: min(max(0.3rem, 3vw), 10px);
    font-size: 62.5%;
    //font-size: 10px;

    @media screen and (min-width: 320px) {
      //font-size: calc(62.5% + 10 * ((100vw - 320px) / 430));
      font-size: calc(62.5% + 6 * ((100vw - 320px) / 1580));
      //font-size: calc(10 + 6 * ((100vw - 320px) / 1580));
    }

    @media screen and (min-width: 1900px) {
      font-size: calc(100% + 16 * ((100vw - 1900px) / 1900));
      //font-size: calc(16 + 16 * ((100vw - 1900px) / 1900));
    }

    @media screen and (min-width: 3800px) {
      font-size: 200% ;
      //font-size: 32px ;
    }

    ${({ lockedLandscape }) =>
      !lockedLandscape
        ? ""
        : css`
            @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: portrait) {
              transform: rotate(90deg);
              transform-origin: right top;
              width: 100vh;
              height: 100vw;
              overflow-x: hidden;
              position: fixed;
              top: 100vh;
              left: calc(-100vh + 100vw);
            }
          `};
  }

  html body {
    font-size: ${token.fontSizes.base};
    font-family: ${token.fontFamily.main};
    color: ${token.palette.dark.main};
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background: rgb(247, 247, 247);
    overflow-x: hidden;

  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${token.fontFamily.secondary};
    font-weight: bold;
  }

  h1 {
    font-size: 4rem;

    @media ${devices.md} {
      font-size: ${token.fontSizes.h1};

    }
  }

  h2 {
    font-size: ${token.fontSizes.h2};
  }

  h3 {
    font-size: ${token.fontSizes.h3};
  }

  h4 {
    font-size: ${token.fontSizes.h4};
  }

  a {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }

  .filter-open.filter-open {
    opacity: 0;
    z-index: -1;
  }

  .modal-open.modal-open {
    overflow: hidden;
  }

  #WEB3_CONNECT_MODAL_ID > div {
    z-index: 1000;
  }

`;

export default GlobalStyle;
