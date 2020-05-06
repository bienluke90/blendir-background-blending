import React, { useEffect } from "react";
import theme from "../../theme/theme";
import styled from "styled-components";
import Container from "./../../templates/Container";
import { connect } from "react-redux";
import BlockTreeGradient from "./BlockTreeGradient";
import BlockTreeImage from "./BlockTreeImage";
import BlockTreeBlock from "./BlockTreeBlock";
import BlockTreeText from "./BlockTreeText";
import Button from "../elements/Button";
import {
  addTextBlock as addTextBlockAction,
  addBackgroundBlock as addBackgroundBlockAction,
} from "../../actions";

const BlockTreeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  background-color: ${theme.panel.backgroundColor};
  z-index: 999;
  transform: translateX(-100%);
  transition: transform 0.2s;
  overflow-y: scroll;
  overflow-x: hidden;
  ${(p: BlockTreeCotaninerProps) =>
    p.active &&
    `
      transform: translateY(0) !important;
      transition: transform 0.5s !important;
;import { addNewBackground } from './../../actions/index';

    `}
`;

const Header = styled.h1`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  padding: 0;
`;

const TopButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  margin-left: auto;
  text-align: right;
  .button {
    height: 35px;
    min-width: 35px;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const BackgroundBlock = styled.div`
  background-color: ${theme.colors.text};
  border-radius: ${theme.borderRadius};
  margin-bottom: 10px;
  padding: 8px 12px;
  .button {
    font-size: 1.2rem;
    margin-right: 4px;
  }
`;

const BackgroundBlockHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0 0 0;
  p {
    max-width: 40%;
    font-size: 1.8rem;
    margin-right: 1rem;
  }
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Column = styled.div`
  width: 100%;
  padding: 0 6px;
  @media screen and (min-width: ${theme.widths.tablet}) {
    width: 50%;
    padding: 0 12px;
  }
`;

const BackgroundOptions = styled.div`
  p {
    margin-bottom: 10px;
  }
  small {
    font-size: 1.6rem;
  }
`;

const HeaderButtons = styled.div`
  font-size: 1.8rem;
  .button {
    margin-top: 10px;
  }
`;

interface BlockTreeCotaninerProps {
  active: boolean;
}

interface BlockTreeProps {
  active: boolean;
  currentPreset: Preset;
  gradients: {
    id: number;
    backgroundImage: string;
  }[];
  showPanel: React.Dispatch<React.SetStateAction<string>>;
  addTextBlock: () => void;
  addBackgroundBlock: () => void;
}

const BlockTree: React.FC<BlockTreeProps> = ({
  active,
  currentPreset,
  showPanel,
  gradients,
  addTextBlock,
  addBackgroundBlock,
}) => {
  useEffect(() => {
    const element = document.getElementById("block-tree-container");
    const listener = (e: Event) => {
      if (element !== e.target) {
        return;
      }
      showPanel("playground");
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });

  const blockTree = currentPreset.blocks.map((bl) => {
    let type, content;
    if (bl.type === "background") {
      type = "Background block";
      content =
        bl.backgrounds &&
        bl.backgrounds.map((b) => {
          if (b.type === "image") {
            return (
              <BlockTreeImage
                key={`bgi-${bl}-${b.id}`}
                blockId={bl.id}
                background={b}
              />
            );
          }
          if (b.type === "gradient") {
            return (
              <BlockTreeGradient
                key={`bgg-${bl}-${b.id}`}
                blockId={bl.id}
                background={b}
                gradients={gradients}
              />
            );
          }
          return null;
        });
      return (
        <BlockTreeBlock
          key={`tb-${bl.id}`}
          nr={bl.id}
          content={content}
          type={type}
          blend={bl.blendMode}
        />
      );
    }
    if (bl.type === "text") {
      type = "Text block";
      content = bl.text;

      return (
        <BlockTreeText
          key={`tb-${bl.id}`}
          block={bl}
          content={content}
          type={type}
          currentPreset={currentPreset}
        />
      );
    }
    return null;
  });
  return (
    <BlockTreeContainer id="block-tree-container" active={active}>
      <Container>
        <Header>
          <h2>Blocks</h2>
          <HeaderButtons>
            Add new:
            <br />
            <Button onClick={addTextBlock} inverted>
              Text block
            </Button>
            <Button onClick={addBackgroundBlock} inverted>
              Background block
            </Button>
          </HeaderButtons>
        </Header>
        {blockTree}
      </Container>
    </BlockTreeContainer>
  );
};

const mapStateToProps = (state) => {
  const { currentPreset, gradients } = state;
  return {
    currentPreset,
    gradients,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTextBlock: () => dispatch(addTextBlockAction()),
  addBackgroundBlock: () => dispatch(addBackgroundBlockAction()),
});

export {
  BackgroundBlock,
  BackgroundBlockHeader,
  Columns,
  Column,
  BackgroundOptions,
  TopButtons,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockTree);
