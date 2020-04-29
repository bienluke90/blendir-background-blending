import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const globalStyle = createGlobalStyle`

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

 .rc-color-picker-panel  {
   width: 100%;
   .rc-color-picker-panel-board {
     & > div {
       width: 100%;
     }
   }
   input {
     min-width: 50px;
   }
 }

  small {
    margin: 0 10px 10px 0;
  }

`;

export default globalStyle;
