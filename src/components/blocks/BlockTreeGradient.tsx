import React, { useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import theme from "../../theme/theme";
import { connect } from "react-redux";
import {
  changeBackgroundType as changeBackgroundTypeAction,
  changeBackgroundOption as changeBackgroundOptionAction,
  changeGradient as changeGradientAction,
  changeGradientType as changeGradientTypeAction,
  changeGradientDirection as changeGradientDirectionAction,
} from "../../actions";
import {
  BackgroundBlock,
  BackgroundBlockHeader,
  Columns,
  Column,
  BackgroundOptions,
} from "./BlockTree";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import "rc-color-picker/assets/index.css";
import { handleBgPositionChange } from "../../utils";
import Input from "../elements/Input";

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
  border: 2px solid #555;
  height: 35px;
  background-color: #fff;
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
  currentPreset: Preset;
  changeBackgroundType: (idBlock: number, idBG: number, toType: string) => void;
  changeBackgroundOption: (
    idBlock: number,
    idBG: number,
    value: string,
    type: string
  ) => void;
  changeGradient: (idBlock: number, idBG: number, value: number) => void;
  changeGradientType: (grad: number, type: string) => void;
  changeGradientDirection: (grad: number, direction: number) => void;
}

const BlockTreeGradient: React.FC<BlockTreeGradientProps> = ({
  background: b,
  gradients,
  blockId: bl,
  changeBackgroundType,
  changeBackgroundOption,
  changeGradient,
  changeGradientType,
  changeGradientDirection,
  currentPreset,
}) => {
  let gradientParts = gradients[b.backgroundImage].backgroundImage
    .replace(/radial-gradient\(|linear-gradient\(|\)$/g, "")
    .split(/,(?![^()]*(?:\([^()]*\))?\))/);
  gradientParts.shift();

  const gradientType = gradients[b.backgroundImage].backgroundImage.replace(
    /\(.*/,
    ""
  );

  const [gradientDeg, gradientDegChange] = useState(0);

  const handleGradientDegChange = (e) => {
    gradientDegChange(e.target.value);
    changeGradientDirection(b.backgroundImage as number, e.target.value);
  };

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
              <Button onClick={() => changeBackgroundType(bl, b.id, "image")}>
                Image
              </Button>
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
                  onClick={() => {
                    changeGradient(bl, b.id, g.id - 1);
                    gradientDegChange(
                      +gradients[g.id - 1].backgroundImage
                        .replace(/linear-gradient\(\s?/, "")
                        .replace(/deg.*/, "")
                    );
                  }}
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
              <Button
                onClick={() => {
                  const newPos = handleBgPositionChange(
                    0,
                    b.backgroundPosition!
                  );
                  changeBackgroundOption(
                    bl,
                    b.id,
                    newPos,
                    "backgroundPosition"
                  );
                }}
                confirm
              >{`X: ${b.backgroundPosition?.split(" ")[0]}`}</Button>
              <Button
                onClick={() => {
                  const newPos = handleBgPositionChange(
                    1,
                    b.backgroundPosition!
                  );
                  changeBackgroundOption(
                    bl,
                    b.id,
                    newPos,
                    "backgroundPosition"
                  );
                }}
                confirm
              >{`Y: ${b.backgroundPosition?.split(" ")[1]}`}</Button>
            </p>
            <p>
              <small>Size: </small>
              <Button
                onClick={() =>
                  changeBackgroundOption(bl, b.id, "cover", "backgroundSize")
                }
                confirm={b.backgroundSize === "cover"}
              >
                Cover
              </Button>
              <Button
                onClick={() =>
                  changeBackgroundOption(bl, b.id, "contain", "backgroundSize")
                }
                confirm={b.backgroundSize === "contain"}
              >
                Contain
              </Button>
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
              <Button
                onClick={() =>
                  changeBackgroundOption(
                    bl,
                    b.id,
                    "no-repeat",
                    "backgroundRepeat"
                  )
                }
                confirm={b.backgroundRepeat === "no-repeat"}
              >
                No repeat
              </Button>
              <Button
                onClick={() =>
                  changeBackgroundOption(bl, b.id, "repeat", "backgroundRepeat")
                }
                confirm={b.backgroundRepeat === "repeat"}
              >
                Repeat
              </Button>
              <Button
                onClick={() =>
                  changeBackgroundOption(
                    bl,
                    b.id,
                    "repeat-x",
                    "backgroundRepeat"
                  )
                }
                confirm={b.backgroundRepeat === "repeat-x"}
              >
                Repeat X
              </Button>
              <Button
                onClick={() =>
                  changeBackgroundOption(
                    bl,
                    b.id,
                    "repeat-y",
                    "backgroundRepeat"
                  )
                }
                confirm={b.backgroundRepeat === "repeat-y"}
              >
                Repeat Y
              </Button>
            </p>
            <p>
              <small>Type: </small>
              <Button
                onClick={() => {
                  changeGradientType(
                    b.backgroundImage as number,
                    "linear-gradient"
                  );
                  gradientDegChange(0);
                }}
                confirm={gradientType === "linear-gradient"}
              >
                Linear
              </Button>
              <Button
                onClick={() =>
                  changeGradientType(
                    b.backgroundImage as number,
                    "radial-gradient"
                  )
                }
                confirm={gradientType === "radial-gradient"}
              >
                Radial
              </Button>
            </p>
            {gradientType === "linear-gradient" && (
              <p>
                <small>Direction (deg): </small>
                <Input
                  onChange={handleGradientDegChange}
                  value={gradientDeg}
                  type="number"
                />
              </p>
            )}
          </BackgroundOptions>
        </Column>
      </Columns>
    </BackgroundBlock>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeBackgroundType: (idBlock, idBG, toType) =>
    dispatch(changeBackgroundTypeAction(idBlock, idBG, toType)),
  changeBackgroundOption: (idBlock, idBG, value, type) =>
    dispatch(changeBackgroundOptionAction(idBlock, idBG, value, type)),
  changeGradient: (idBlock, idBG, value) =>
    dispatch(changeGradientAction(idBlock, idBG, value)),
  changeGradientType: (grad, type) =>
    dispatch(changeGradientTypeAction(grad, type)),
  changeGradientDirection: (grad, type) =>
    dispatch(changeGradientDirectionAction(grad, type)),
});

export default connect(null, mapDispatchToProps)(BlockTreeGradient);
