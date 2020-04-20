import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../templates/Navigation";
import MainTemplate from "../templates/MainTemplate";
import { Provider } from "react-redux";
import store from "../store";

const MainContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Root: React.FC = () => {
  const [whatIsViewed, whatToView] = useState<string>("playground");

  return (
    <Provider store={store}>
      <MainContainer>
        <Navigation panel={whatIsViewed} showPanel={whatToView} />
        <MainTemplate panel={whatIsViewed} showPanel={whatToView} />
      </MainContainer>
    </Provider>
  );
};

export default Root;
