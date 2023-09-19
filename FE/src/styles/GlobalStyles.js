import { createGlobalStyle } from "styled-components";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const GlobalStyles = createGlobalStyle`
  /* variables */
  :root {
    --color-main: #f48225;
    --color-sub-blue: #0a95ff;
    --color-sub-lightblue: #e1ecf4;

    --color-black: #232629;
    --color-white: #fff;
    --color-line: #d6d9dc;
  }

  /* reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;  
  }

  body {
    height: calc(var(--var, 1vh) * 100);

    color: var(--color-black);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted","Segoe UI","Liberation Sans", sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: 400;
  }

  ul li, ol li {
    list-style: none;
  }

  img {
    width: 100%;
    border: 0;
  }

  a {
    display:inline-block;
    text-decoration: none;
    color: inherit;
  }

  input {
    border: none;
  }

  input:focus-visible {
    outline: none;
  }

  textarea {
    border: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;

    font-family: "HakgyoansimWoojuR";
  }
`;

export default GlobalStyles;
