import React from "react";
import styled from "styled-components";
import Playground from "../components/blocks/Playground";
import Presets from "../components/blocks/Presets";
import BlockTree from "../components/blocks/BlockTree";

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
  showPanel: React.Dispatch<React.SetStateAction<string>>;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ panel, showPanel }) => {
  return (
    <TemplateContainer>
      <Playground />
      <Presets active={panel === "presets"} />
      <BlockTree showPanel={showPanel} active={panel === "blocks"} />
    </TemplateContainer>
  );
};

export default MainTemplate;
