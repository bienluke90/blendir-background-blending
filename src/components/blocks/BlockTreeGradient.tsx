import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import theme from "../../theme/theme";
import {
  BackgroundBlock,
  BackgroundBlockHeader,
  Columns,
  Column,
  BackgroundOptions,
} from "./BlockTree";
import { SketchPicker } from "react-color";

const Header = styled.h2`
  font-size: 2rem;
  padding: 10px;
`;

const Gradients = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 5px;
  width: calc(100% - 30px);
  @media screen and (min-width: ${theme.widths.tablet}) {
    grid-template-columns: repeat(5, 20%);
  }
`;

const GradientMiniature = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${theme.borderRadius};
  font-size: 2rem;
  height: 45px;
  width: 50px;
  margin: 3px;
  ${(p: GradientMiniatureProps) =>
    p.active &&
    `
    outline: 2px solid red;
  `}
  &:hover {
    outline: 2px solid red;
  }
`;

const GradientPreview = styled.div`
  margin: 10px auto;
  max-width: calc(100% - 50px);
  height: 160px;
  border-radius: ${theme.borderRadius};
`;

const GradientLine = styled.div`
  position: relative;
  width: calc(100% - 50px);
  margin: 0 auto;
  border-top: 2px solid #555;
  border-bottom: 2px solid #555;
  height: 40px;
  background-color: #fff;
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  z-index: 999;
`;

const GradientPoint = styled.div`
  position: absolute;
  top: -10%;
  border-radius: ${theme.borderRadius};
  border: 4px solid #555;
  width: 14px;
  height: 120%;
  cursor: ew-resize;
  z-index: 9999;
`;

interface GradientMiniatureProps {
  active?: boolean;
}

interface BlockTreeGradientProps {
  background: Background;
  gradients: Gradient[];
  blockId: number;
}

const BlockTreeGradient: React.FC<BlockTreeGradientProps> = ({
  background: b,
  gradients,
  blockId: bl,
}) => {
  let gradientParts = b
    .backgroundImage!.replace(/radial-gradient\(|linear-gradient\(|\)$/g, "")
    .split(/,(?![^()]*(?:\([^()]*\))?\))/);
  gradientParts.shift();
  return (
    <BackgroundBlock>
      <BackgroundBlockHeader>
        <Header>Background</Header>
        <div>
          <Button>&#8648;</Button>
          <Button> &#8650;</Button>
          <Button danger>&#x2716;</Button>
        </div>
      </BackgroundBlockHeader>
      <Columns>
        <Column>
          <BackgroundOptions>
            <p>
              <Button>Image</Button>
              <Button confirm>Gradient</Button>:
            </p>
          </BackgroundOptions>
          <BackgroundOptions>
            <Gradients>
              {gradients.map((g) => (
                <GradientMiniature
                  key={`grad-${b.id}-${g.id}`}
                  style={{ backgroundImage: g.backgroundImage }}
                ></GradientMiniature>
              ))}
              <GradientMiniature>+</GradientMiniature>
            </Gradients>
            <BackgroundOptions>
              <GradientPreview
                style={{
                  backgroundImage: b.backgroundImage,
                }}
              ></GradientPreview>
            </BackgroundOptions>
          </BackgroundOptions>
        </Column>
        <Column>
          <BackgroundOptions>
            <p>Gradient settings:</p>
            <GradientLine
              style={{
                backgroundImage: `linear-gradient(90deg, ${gradientParts.join(
                  ","
                )})`,
              }}
            >
              {gradientParts.map((p, i) => {
                const [color] = p.match(/rgba\([\d\b\\.,]+\)/);
                const [percent] = p.match(/\d+%/);
                return (
                  <GradientPoint
                    key={`grad-point-${b.id}-${bl}-${i}`}
                    style={{
                      left: `calc(${percent} - 7px)`,
                      backgroundColor: color,
                    }}
                  ></GradientPoint>
                );
              })}
            </GradientLine>
          </BackgroundOptions>
          <BackgroundOptions>
            <br />
            <SketchPicker />
            <br />
            <p></p>
          </BackgroundOptions>
        </Column>
      </Columns>
    </BackgroundBlock>
  );
};

export default BlockTreeGradient;
