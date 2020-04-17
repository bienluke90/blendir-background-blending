import React from "react";
import styled from "styled-components";
import Playground from "../components/blocks/Playground";
import Presets from "../components/blocks/Presets";

const TemplateContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9;
`;

interface MainTemplateProps {
  panel: string;
}

const MainTemplate: React.FC<MainTemplateProps> = () => {
  return (
    <TemplateContainer>
      <Playground />
      <Presets />
    </TemplateContainer>
  );
};

export default MainTemplate;
