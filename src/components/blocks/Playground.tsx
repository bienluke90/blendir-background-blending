import React from "react";
import styled from "styled-components";

const PlaygroundContainer = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 63px;
  height: 100vh;
  z-index: 99;
`;

const Playground: React.FC = () => {
  return <PlaygroundContainer>Playground</PlaygroundContainer>;
};

export default Playground;
