import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const globalStyle = createGlobalStyle`

  @import url(${"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;900&display=swap"});

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    color: ${theme.colors.text};
    font-family: 'Noto Sans JP', sans-serif;
    font-size: ${theme.fontSizes.mobile};
    @media screen and (min-width: ${theme.widths.tablet}) {
      font-size: ${theme.fontSizes.tablet}
    }
    @media screen and (min-width: ${theme.widths.desktop}) {
      font-size: ${theme.fontSizes.desktop}
    }
  }

  a {
    color: ${theme.colors.text};
    cursor: pointer;
  }

  .button {
    cursor: pointer;
  }

`;

export default globalStyle;
