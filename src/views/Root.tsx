import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../templates/Navigation";
import MainTemplate from "../templates/MainTemplate";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";

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
      <PersistGate loading={null} persistor={persistor}>
        <MainContainer>
          <Navigation panel={whatIsViewed} showPanel={whatToView} />
          <MainTemplate panel={whatIsViewed} showPanel={whatToView} />
        </MainContainer>
      </PersistGate>
    </Provider>
  );
};

export default Root;
