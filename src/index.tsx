import React from "react";
import ReactDOM from "react-dom";
import Root from "./views/Root";
import GlobalStyle from "./theme/global";

ReactDOM.render(
  <>
    <GlobalStyle />
    <Root />
  </>,
  document.getElementById("root")
);
