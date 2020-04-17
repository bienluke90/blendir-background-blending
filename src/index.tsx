import React from "react";
import ReactDOM from "react-dom";
import Root from "./views/Root";
import GlobalStyle from "./theme/global";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
