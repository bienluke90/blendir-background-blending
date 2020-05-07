import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { TopButtons } from "./BlockTree";
import theme from "../../theme/theme";
import { connect } from "react-redux";
import {
  selectBlendingMode as selectBlendingModeAction,
  addNewBackground as addNewBackgroundAction,
  deleteBlock as deleteBlockAction,
} from "../../actions";
import ModalRemove from "./ModalRemove";
import { handleScrollBlock } from "../../utils";

const TreeBlock = styled.div`
  width: calc(100% - 20px);
  padding: 7px 10px;
  background-color: #ddd;
  border-radius: ${theme.borderRadius};
  margin: 0 auto 15px auto;
`;

const TreeBlockHeader = styled.div`
  display: flex;
  color: ${theme.colors.textInverted};
  flex-wrap: wrap;
  font-size: 1.5rem;
  padding: 10px;
  select {
    margin: 0 10px;
    border-radius: ${theme.borderRadius};
    width: 100px;
    font-size: 1.7rem;
    height: 2.7rem;
    border: 1px solid #333;
    option {
      height: 2.7rem !important;
    }
  }
  p {
    font-size: 2.4rem;
    margin-bottom: 15px;
  }
`;

const TreeBlockContent = styled.div`
  color: ${theme.colors.textInverted};
  p {
    font-size: 2.5rem;
    margin: 10px;
  }
`;

interface BlockTreeBlockProps {
  type: string;
  content: ReactNode[];
  nr: number;
  blend: string;
  selectBlendingMode: (idBlock: number, value: string) => void;
  addNewBackground: (idBlock: number) => void;
  deleteBlock: (idBlock: number) => void;
}

const BlockTreeBlock: React.FC<BlockTreeBlockProps> = ({
  type,
  content,
  nr,
  blend,
  selectBlendingMode,
  addNewBackground,
  deleteBlock,
}) => {
  const [blendMode, changeBlendMode] = useState<string>(blend);
  const [modalRemove, setModalRemove] = useState<boolean>(false);

  return (
    <TreeBlock>
      {modalRemove && (
        <ModalRemove
          title={"Are you sure?"}
          subtitle={`You are about to delete this block. Continue?`}
          onYes={() => {
            handleScrollBlock(false);
            deleteBlock(nr);
          }}
          onNo={() => {
            handleScrollBlock(false);
            setModalRemove(false);
          }}
        />
      )}
      <TreeBlockHeader>
        <div>
          <p>{type}</p>
          {type === "Background block" && (
            <p>
              <label htmlFor={`blending-mode-block-${nr}`}>
                <small>Select blending mode:</small>
                <select
                  name="blending-mode"
                  id={`blending-mode-block-${nr}`}
                  onChange={(e) => {
                    changeBlendMode(e.target.value);
                    selectBlendingMode(nr, e.target.value);
                  }}
                >
                  <option selected={blendMode === "normal"} value="normal ">
                    Normal
                  </option>
                  <option selected={blendMode === "multiply"} value="multiply">
                    Multiply
                  </option>
                  <option selected={blendMode === "screen"} value="screen">
                    Screen
                  </option>
                  <option selected={blendMode === "overlay"} value="overlay">
                    Overlay
                  </option>
                  <option selected={blendMode === "darken"} value="darken">
                    Darken
                  </option>
                  <option selected={blendMode === "lighten"} value="lighten">
                    Lighten
                  </option>
                  <option
                    selected={blendMode === "color-dodge"}
                    value="color-dodge"
                  >
                    Color Dodge
                  </option>
                  <option
                    selected={blendMode === "color-burn"}
                    value="color-burn"
                  >
                    Color Burn
                  </option>
                  <option
                    selected={blendMode === "hard-light"}
                    value="hard-light"
                  >
                    Hard Light
                  </option>
                  <option
                    selected={blendMode === "soft-light"}
                    value="soft-light"
                  >
                    Soft Light
                  </option>
                  <option
                    selected={blendMode === "difference"}
                    value="difference"
                  >
                    Difference
                  </option>
                  <option
                    selected={blendMode === "exclusion"}
                    value="exclusion"
                  >
                    Exclusion
                  </option>
                  <option selected={blendMode === "hue"} value="hue">
                    Hue
                  </option>
                  <option
                    selected={blendMode === "saturation"}
                    value="saturation"
                  >
                    Saturation
                  </option>
                  <option
                    selected={blendMode === "luminosity"}
                    value="luminosity"
                  >
                    Luminosity
                  </option>
                  <option selected={blendMode === "color"} value="color">
                    Color
                  </option>
                </select>
              </label>
            </p>
          )}
        </div>
        <TopButtons>
          <Button onClick={() => addNewBackground(nr)}>&#x271A;</Button>
          <Button>&#8650;</Button>
          <Button>&#8648;</Button>
          <Button
            onClick={() => {
              handleScrollBlock(true);
              setModalRemove(true);
            }}
            danger
          >
            &#x2716;
          </Button>
        </TopButtons>
      </TreeBlockHeader>
      <TreeBlockContent>
        {content.length === 0 && (
          <p>
            No backgrounds, add new clicking on the plus button on the right.
          </p>
        )}
        {content}
      </TreeBlockContent>
    </TreeBlock>
  );
};

const mapDispatchToProps = (dispatch) => ({
  selectBlendingMode: (idBlock, value) =>
    dispatch(selectBlendingModeAction(idBlock, value)),
  addNewBackground: (idBlock) => dispatch(addNewBackgroundAction(idBlock)),
  deleteBlock: (idBlock) => dispatch(deleteBlockAction(idBlock)),
});

export default connect(null, mapDispatchToProps)(BlockTreeBlock);
