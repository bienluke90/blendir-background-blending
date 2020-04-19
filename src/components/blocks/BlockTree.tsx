import React from "react";
import theme from "../../theme/theme";
import styled from "styled-components";
import Container from "./../../templates/Container";
import { connect } from "react-redux";

const BlockTreeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  background-color: ${theme.panel.backgroundColor};
  z-index: 999;
  transform: translateY(-100%);
  transition: transform 0.2s;
  ${(p: BlockTreeCotaninerProps) =>
    p.active &&
    `
      transform: translateY(0) !important;
      transition: transform 0.5s;
    `}
`;

const Header = styled.h1`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 15px;
`;

const TreeBlock = styled.div`
  width: calc(100% - 20px);
  padding: 15px;
  background-color: #ddd;
  margin: 0 10px;
  border-radius: ${theme.borderRadius};
`;

interface BlockTreeCotaninerProps {
  active: boolean;
}

interface BlockTreeProps {
  active: boolean;
}

const BlockTree: React.FC<BlockTreeProps> = ({ active }) => {
  return (
    <BlockTreeContainer active={active}>
      <Container>
        <Header>Block tree</Header>
        <TreeBlock>Something</TreeBlock>
      </Container>
    </BlockTreeContainer>
  );
};

const mapStateToProps = (state) => {
  const { currentPreset } = state;
  return {
    currentPreset,
  };
};

export default connect(mapStateToProps)(BlockTree);
