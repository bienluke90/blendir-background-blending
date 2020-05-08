import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const globalStyle = createGlobalStyle`

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 62.5%;
    overflow-y:hidden;
  }

  body {
    color: ${theme.colors.text};
    height: 100%;
    overflow-y:hidden;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: ${theme.fontSizes.mobile};
    @media screen and (min-width: ${theme.widths.tablet}) {
      font-size: ${theme.fontSizes.tablet}
    }
    @media screen and (min-width: ${theme.widths.desktop}) {
      font-size: ${theme.fontSizes.desktop}
    }
  }

  #main-document.scroll-block {
    overflow: hidden !important;
    * {
      overflow: hidden !important;
    }
  }

  h1, h2, h3, h4, h5, h6 {
   padding: 0 !important;
  }

  a {
    color: ${theme.colors.text};
    cursor: pointer;
  }

  .button {
    cursor: pointer;
  }

 .rc-color-picker-panel  {
   .rc-color-picker-panel-params {
     display: flex;
   }
   input:not(.rc-color-picker-panel-params-hex) {
     display: none;

   }
   label:not(.rc-color-picker-panel-params-lable-hex) {
     display: none;
   }
   label {
     width: 20px;
   }
 }
  small {
    margin: 0 10px 10px 0;
  }

`;

export default globalStyle;
