import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { TopButtons, BackgroundBlock, Columns, Column } from "./BlockTree";
import theme from "../../theme/theme";
import Input from "../elements/Input";
import { SketchPicker } from "react-color";

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

const Highlighted = styled.p`
  margin: 10px 0;
  font-size: 2.4rem;
  font-weight: 500;
`;

interface BlockTreeTextProps {
  type: string;
  content: string;
  block: Block;
}

const BlockTreeText: React.FC<BlockTreeTextProps> = ({
  type,
  content,
  block: b,
}) => {
  return (
    <TreeBlock>
      <TreeBlockHeader>
        <p>{type}</p>
        <TopButtons>
          <Button info>Use</Button>
          <Button>&#8650;</Button>
          <Button>&#8648;</Button>
          <Button danger>&#x2716;</Button>
        </TopButtons>
      </TreeBlockHeader>
      <TreeBlockContent>
        <BackgroundBlock>
          <Columns>
            <Column>
              <p>
                Enter text: <Input type="text" value={content} />
              </p>
              <p>Entered text: </p>
              <Highlighted
                style={{
                  color: b.color,
                  fontWeight: b.fontWeight as "normal" | "bold",
                  textAlign: b.textAlign as "left" | "center" | "right",
                }}
              >
                {content}
              </Highlighted>
              <p>
                <small>Text color:</small>
                <SketchPicker />
              </p>
            </Column>
            <Column>
              <p>Options:</p>
              <p>
                <small>Font size (px):</small>
                <Input
                  type="number"
                  value={+b.fontSize?.replace("rem", "")! * 10}
                />
              </p>
              <p>
                <small>Text align:</small>
                <Button confirm={b.textAlign === "left"}>Left</Button>
                <Button confirm={b.textAlign === "center"}>Center</Button>
                <Button confirm={b.textAlign === "right"}>Right</Button>
              </p>
              <p>
                <small>Font weight:</small>
                <Button confirm={b.fontWeight === "normal"}>Normal</Button>
                <Button confirm={b.fontWeight === "bold"}>Bold</Button>
              </p>
              <p>
                <small>Position:</small>
                <br />
                <small>X (%): </small>
                <Input type="number" value={+b.left?.replace("%", "")!} />
                <small>Y (%): </small>
                <Input type="number" value={+b.top?.replace("%", "")!} />
              </p>
            </Column>
          </Columns>
        </BackgroundBlock>
      </TreeBlockContent>
    </TreeBlock>
  );
};

export default BlockTreeText;
