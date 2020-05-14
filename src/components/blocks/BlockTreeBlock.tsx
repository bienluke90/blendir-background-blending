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
  moveBlock as moveBlockAction,
  changeUsed as changeUsedAction,
} from "../../actions";
import ModalRemove from "./ModalRemove";
import { handleScrollBlock } from "../../utils";

const TreeBlock = styled.div`
  width: calc(100% - 20px);
  padding: 7px 10px;
  background-color: #ddd;
  border-radius: ${theme.borderRadius};
  margin: 0 auto 15px auto;
  &:last-child {
    margin-bottom: 35px;
  }
`;

const TreeBlockHeader = styled.div`
  display: flex;
  color: ${theme.colors.textInverted};
  flex-wrap: wrap;
  padding: 10px;
  h3 {
    font-size: 140%;
    margin-bottom: 15px;
  }
  select {
    margin: 0 10px;
    background-color: #fff;
    border-radius: ${theme.borderRadius};
    width: 100px;
    font-size: 100%;
    height: 28px;
    border: 1px solid #333;
    option {
      height: 28px !important;
      background-color: #fff;
    }
  }
  p {
    font-size: 100%;
    margin-bottom: 15px;
  }
`;

const TreeBlockContent = styled.div`
  color: ${theme.colors.textInverted};
  p {
    font-size: 100%;
    margin: 10px;
  }
`;

interface BlockTreeBlockProps {
  type: string;
  content: ReactNode[];
  nr: number;
  blend: string;
  currentPreset: Preset;
  selectBlendingMode: (idBlock: number, value: string) => void;
  addNewBackground: (idBlock: number) => void;
  deleteBlock: (idBlock: number) => void;
  moveBlock: (idBlock: number, direction: number) => void;
  changeUsed: (idBlock: number, idBG: number) => void;
}

const BlockTreeBlock: React.FC<BlockTreeBlockProps> = ({
  type,
  content,
  nr,
  blend,
  currentPreset,
  selectBlendingMode,
  addNewBackground,
  deleteBlock,
  moveBlock,
  changeUsed,
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
            setModalRemove(false);
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
          <h3>{type}</h3>
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
                  value={blendMode}
                >
                  <option value="normal ">Normal</option>
                  <option value="multiply">Multiply</option>
                  <option value="screen">Screen</option>
                  <option value="overlay">Overlay</option>
                  <option value="darken">Darken</option>
                  <option value="lighten">Lighten</option>
                  <option value="color-dodge">Color Dodge</option>
                  <option value="color-burn">Color Burn</option>
                  <option value="hard-light">Hard Light</option>
                  <option value="soft-light">Soft Light</option>
                  <option value="difference">Difference</option>
                  <option value="exclusion">Exclusion</option>
                  <option value="hue">Hue</option>
                  <option value="saturation">Saturation</option>
                  <option value="luminosity">Luminosity</option>
                  <option value="color">Color</option>
                </select>
              </label>
            </p>
          )}
        </div>
        <TopButtons>
          <Button onClick={() => addNewBackground(nr)}>&#x271A;</Button>
          {currentPreset.blocks.length - 1 !== nr && (
            <Button
              onClick={() => {
                moveBlock(nr, 1);
                changeUsed(-1, -1);
              }}
            >
              &#8650;
            </Button>
          )}
          {nr !== 0 && (
            <Button
              onClick={() => {
                moveBlock(nr, -1);
                changeUsed(-1, -1);
              }}
            >
              &#8648;
            </Button>
          )}
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
  moveBlock: (idBlock, direction) =>
    dispatch(moveBlockAction(idBlock, direction)),
  changeUsed: (idBlock, idBG) => dispatch(changeUsedAction(idBlock, idBG)),
});

export default connect(null, mapDispatchToProps)(BlockTreeBlock);
