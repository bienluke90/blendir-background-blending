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
import { Panel as ColorPickerPanel } from "rc-color-picker";
import "rc-color-picker/assets/index.css";

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

const GradientLine = styled.div`
  position: relative;
  width: calc(100% - 20px);
  margin: 15px auto 10px auto;
  border-top: 2px solid #555;
  border-bottom: 2px solid #555;
  height: 30px;
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
  let gradientParts = gradients[b.backgroundImage].backgroundImage
    .replace(/radial-gradient\(|linear-gradient\(|\)$/g, "")
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
                  active={g.id === (b.backgroundImage as number) + 1}
                  key={`grad-${b.id}-${g.id}`}
                  style={{ backgroundImage: g.backgroundImage }}
                ></GradientMiniature>
              ))}
              <GradientMiniature>+</GradientMiniature>
            </Gradients>
            <BackgroundOptions>
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

              <br />
              <ColorPickerPanel enableAlpha mode="RGB" />
              <br />
            </BackgroundOptions>
          </BackgroundOptions>
        </Column>
        <Column>
          <BackgroundOptions>
            <p>Options:</p>
            <p>
              <small>Position: </small>
              <Button confirm>{`X: ${
                b.backgroundPosition?.split(" ")[0]
              }`}</Button>
              <Button confirm>{`Y: ${
                b.backgroundPosition?.split(" ")[1]
              }`}</Button>
            </p>
            <p>
              <small>Size: </small>
              <Button confirm={b.backgroundSize === "cover"}>Cover</Button>
              <Button confirm={b.backgroundSize === "contain"}>Contain</Button>
              {b.backgroundSize !== "contain" &&
                b.backgroundSize !== "cover" && (
                  <Button
                    confirm={
                      b.backgroundSize !== "contain" &&
                      b.backgroundSize !== "cover"
                    }
                  >
                    X: {b.backgroundSize?.split(" ")[0]}
                  </Button>
                )}
              {b.backgroundSize !== "contain" &&
                b.backgroundSize !== "cover" && (
                  <Button
                    confirm={
                      b.backgroundSize !== "contain" &&
                      b.backgroundSize !== "cover"
                    }
                  >
                    Y: {b.backgroundSize?.split(" ")[1]}
                  </Button>
                )}
            </p>
            <p>
              <small>Repeat: </small>
              <Button confirm={b.backgroundRepeat === "no-repeat"}>
                No repeat
              </Button>
              <Button confirm={b.backgroundRepeat === "repeat"}>Repeat</Button>
              <Button confirm={b.backgroundRepeat === "repeat-x"}>
                Repeat X
              </Button>
              <Button confirm={b.backgroundRepeat === "repeat-y"}>
                Repeat Y
              </Button>
            </p>
          </BackgroundOptions>
        </Column>
      </Columns>
    </BackgroundBlock>
  );
};

export default BlockTreeGradient;
