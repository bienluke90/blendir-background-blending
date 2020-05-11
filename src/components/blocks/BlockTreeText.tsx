import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { TopButtons, BackgroundBlock, Columns, Column } from "./BlockTree";
import theme from "../../theme/theme";
import Input from "../elements/Input";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import "rc-color-picker/assets/index.css";
import { connect } from "react-redux";
import {
  changeTextOption as changeTextOptionAction,
  deleteBlock as deleteBlockAction,
  moveBlock as moveBlockAction,
  changeUsed as changeUsedAction,
} from "../../actions";
import { rgba } from "polished";
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
  font-size: 100%;
  padding: 10px;
  h3 {
    font-size: 140%;
  }
  p {
    font-size: 100%;
  }
`;

const TreeBlockContent = styled.div`
  .button {
    font-size: 80% !important;
  }
  color: ${theme.colors.textInverted};
`;

const Highlighted = styled.div`
  margin: 10px 0;
  font-size: 150%;
  font-weight: 500;
`;

interface BlockTreeTextProps {
  type: string;
  content: string;
  block: Block;
  currentPreset: Preset;
  changeTextOption: (idBlock: number, value: string, type: string) => void;
  deleteBlock: (idBlock: number) => void;
  moveBlock: (idBlock: number, direction: number) => void;
  changeUsed: (idBlock, idBG?) => void;
  inUse: {
    block: number;
    background: number;
  };
}

const BlockTreeText: React.FC<BlockTreeTextProps> = ({
  currentPreset,
  type,
  content,
  block: b,
  inUse,
  changeTextOption,
  deleteBlock,
  moveBlock,
  changeUsed,
}) => {
  const [text, changeText] = useState<string>(content);
  const [fontSize, changeFontSize] = useState<number>(
    +b.fontSize?.replace("rem", "")! * 10
  );
  const [activeColor, changeActiveColor] = useState<string>(b.color!);
  const [activeAlpha, changeActiveAlpha] = useState<number>(
    +b
      .color!.replace(/rgba\(\s?\d+\s?,\s?\d+\s?,\s?\d+\s?,/, "")
      .replace(/\)/, "") * 100
  );

  const [xPos, xPosChange] = useState<number>(+b.left!.replace("%", ""));
  const [yPos, yPosChange] = useState<number>(+b.top!.replace("%", ""));
  const [modalRemove, setModalRemove] = useState<boolean>(false);

  const handleTextColorChange = (colors) => {
    changeActiveColor(colors.color);
    changeActiveAlpha(colors.alpha);
    changeTextOption(b.id, rgba(colors.color, colors.alpha / 100), "color");
  };

  useEffect(() => {
    xPosChange(+b.left!.replace("%", ""));
    yPosChange(+b.top!.replace("%", ""));
    changeFontSize(+b.fontSize?.replace("rem", "")! * 10);
  }, [b.fontSize, b.left, b.top]);

  return (
    <TreeBlock>
      {modalRemove && (
        <ModalRemove
          title={"Are you sure?"}
          subtitle={`You are about to delete this block. Continue?`}
          onYes={() => {
            handleScrollBlock(false);
            setModalRemove(false);
            deleteBlock(b.id);
          }}
          onNo={() => {
            handleScrollBlock(false);
            setModalRemove(false);
          }}
        />
      )}
      <TreeBlockHeader>
        <h3>{type}</h3>
        <TopButtons>
          <Button info onClick={() => changeUsed(b.id, -1)}>
            {inUse.block === b.id ? "In use" : "Use"}
          </Button>
          {currentPreset.blocks.length - 1 !== b.id && (
            <Button onClick={() => moveBlock(b.id, 1)}>&#8650;</Button>
          )}
          {b.id !== 0 && (
            <Button onClick={() => moveBlock(b.id, -1)}>&#8648;</Button>
          )}
          <Button onClick={() => setModalRemove(true)} danger>
            &#x2716;
          </Button>
        </TopButtons>
      </TreeBlockHeader>
      <TreeBlockContent>
        <BackgroundBlock>
          <Columns>
            <Column>
              <p>
                Enter text:{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    changeText(e.target.value);
                    changeTextOption(b.id, e.target.value, "text");
                  }}
                  value={text}
                />
              </p>
              <p>Entered text: </p>
              <Highlighted
                style={{
                  color: b.color,
                  fontWeight: b.fontWeight as "normal" | "bold",
                  textAlign: b.textAlign as "left" | "center" | "right",
                }}
              >
                {text}
              </Highlighted>
              <div>
                <small>Text color:</small>
                <ColorPickerPanel
                  onChange={handleTextColorChange}
                  color={activeColor}
                  alpha={activeAlpha}
                  enableAlpha
                />
              </div>
            </Column>
            <Column>
              <p>Options:</p>
              <p>
                <small>Font size (px):</small>
                <Input
                  type="number"
                  onChange={(e) => {
                    changeFontSize(+e.target.value);
                    changeTextOption(
                      b.id,
                      `${+e.target.value / 10}rem`,
                      "fontSize"
                    );
                  }}
                  value={fontSize}
                />
              </p>
              <p>
                <small>Text align:</small>
                <Button
                  onClick={() => changeTextOption(b.id, "left", "textAlign")}
                  confirm={b.textAlign === "left"}
                >
                  Left
                </Button>
                <Button
                  onClick={() => changeTextOption(b.id, "center", "textAlign")}
                  confirm={b.textAlign === "center"}
                >
                  Center
                </Button>
                <Button
                  onClick={() => changeTextOption(b.id, "right", "textAlign")}
                  confirm={b.textAlign === "right"}
                >
                  Right
                </Button>
              </p>
              <p>
                <small>Font weight:</small>
                <Button
                  onClick={() => changeTextOption(b.id, "normal", "fontWeight")}
                  confirm={b.fontWeight === "normal"}
                >
                  Normal
                </Button>
                <Button
                  onClick={() => changeTextOption(b.id, "bold", "fontWeight")}
                  confirm={b.fontWeight === "bold"}
                >
                  Bold
                </Button>
              </p>
              <p>
                <small>Position:</small>
                <br />
                <small>X (%): </small>
                <Input
                  onChange={(e) => {
                    xPosChange(+e.target.value);
                    changeTextOption(b.id, `${e.target.value}%`, "left");
                  }}
                  type="number"
                  value={xPos}
                />
                <small>Y (%): </small>
                <Input
                  onChange={(e) => {
                    yPosChange(+e.target.value);
                    changeTextOption(b.id, `${e.target.value}%`, "top");
                  }}
                  type="number"
                  value={yPos}
                />
              </p>
            </Column>
          </Columns>
        </BackgroundBlock>
      </TreeBlockContent>
    </TreeBlock>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeTextOption: (idBlock, value, type) =>
    dispatch(changeTextOptionAction(idBlock, value, type)),
  deleteBlock: (idBlock) => dispatch(deleteBlockAction(idBlock)),
  moveBlock: (idBlock, direction) =>
    dispatch(moveBlockAction(idBlock, direction)),
  changeUsed: (idBlock, idBG) => dispatch(changeUsedAction(idBlock, idBG)),
});

const mapStateToProps = (state) => {
  const { inUse } = state;
  return {
    inUse,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockTreeText);
