import React, { ReactNode } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { TopButtons } from "./BlockTree";
import theme from "../../theme/theme";

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

interface BlockTreeBlockProps {
  type: string;
  content: ReactNode[];
}

const BlockTreeBlock: React.FC<BlockTreeBlockProps> = ({ type, content }) => {
  return (
    <TreeBlock>
      <TreeBlockHeader>
        <p>{type}</p>
        <TopButtons>
          <Button>&#x271A;</Button>
          <Button>&#8650;</Button>
          <Button>&#8648;</Button>
          <Button danger>&#x2716;</Button>
        </TopButtons>
      </TreeBlockHeader>
      <TreeBlockContent>{content}</TreeBlockContent>
    </TreeBlock>
  );
};

export default BlockTreeBlock;
