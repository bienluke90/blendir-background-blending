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
  left: -100%;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  padding-bottom: 90px;
  background-color: ${theme.panel.backgroundColor};
  z-index: 999;
  overflow-y: scroll;
  overflow-x: hidden;
  ${(p: BlockTreeCotaninerProps) =>
    p.active &&
    `
      left: 0 !important;
    `}
`;

const Header = styled.div`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  padding: 0;
  h1 {
    font-size: 300%;
  }
`;

const TopButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  margin-left: auto;
  text-align: right;
  .button {
    font-size: 90%;
    height: 35px;
    min-width: 35px;
    display: inline-block;
    margin-right: 5px;
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
    font-size: 100%;
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
    font-size: 100%;
    margin-right: 1rem;
  }
  .button {
    font-size: 70%;
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
  .button {
    font-size: 80%;
  }
  p {
    font-size: 100%;
    margin-bottom: 10px;
  }
  small {
    font-size: 90%;
  }
`;

const HeaderButtons = styled.div`
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
          currentPreset={currentPreset}
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
          <h1>Blocks</h1>
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
