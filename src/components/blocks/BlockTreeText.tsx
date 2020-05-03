import React, { useState } from "react";
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
} from "../../actions";
import { rgba } from "polished";
import { deleteBlock } from "./../../actions/index";

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
  font-size: 1.5rem;
  padding: 10px;
  p {
    font-size: 2.4rem;
  }
`;

const TreeBlockContent = styled.div`
  color: ${theme.colors.textInverted};
`;

const Highlighted = styled.div`
  margin: 10px 0;
  font-size: 2.4rem;
  font-weight: 500;
`;

interface BlockTreeTextProps {
  type: string;
  content: string;
  block: Block;
  currentPreset: Preset;
  changeTextOption: (idBlock: number, value: string, type: string) => void;
  deleteBlock: (idBlock: number) => void;
}

const BlockTreeText: React.FC<BlockTreeTextProps> = ({
  type,
  content,
  block: b,
  changeTextOption,
  deleteBlock,
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

  const handleTextColorChange = (colors) => {
    changeActiveColor(colors.color);
    changeActiveAlpha(colors.alpha);
    changeTextOption(b.id, rgba(colors.color, colors.alpha / 100), "color");
  };

  return (
    <TreeBlock>
      <TreeBlockHeader>
        <p>{type}</p>
        <TopButtons>
          <Button info>Use</Button>
          <Button>&#8650;</Button>
          <Button>&#8648;</Button>
          <Button onClick={() => deleteBlock(b.id)} danger>
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
});

export default connect(null, mapDispatchToProps)(BlockTreeText);
