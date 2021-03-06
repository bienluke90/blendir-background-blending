import React, { useState } from "react";
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
import Input from "../elements/Input";
import { connect } from "react-redux";
import {
  changeBackgroundType as changeBackgroundTypeAction,
  changeBackgroundImage as changeBackgroundImageAction,
  changeBackgroundOption as changeBackgroundOptionAction,
  deleteBackground as deleteBackgroundAction,
  moveBackground as moveBackgroundAction,
  changeUsed as changeUsedAction,
} from "../../actions";
import { handleBgPositionChange, handleScrollBlock } from "../../utils";
import ModalRemove from "./ModalRemove";

const Header = styled.h2`
  font-size: 135%;
  font-weight: normal;
  padding: 10px;
`;

const ImagePreview = styled.div`
  max-width: calc(100% - 50px);
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 10px;
  border-radius: ${theme.borderRadius};
`;

interface BlockTreeImageProps {
  background: Background;
  blockId: number;
  currentPreset: Preset;
  inUse: {
    block: number;
    background: number;
  };
  changeBackgroundType: (idBlock: number, idBG: number, toType: string) => void;
  changeBackgroundImage: (
    idBlock: number,
    idBG: number,
    toImage: string
  ) => void;
  changeBackgroundOption: (
    idBlock: number,
    idBG: number,
    value: string,
    type: string
  ) => void;
  deleteBackground: (idBlock: number, idBG: number) => void;
  moveBackground: (idBlock: number, idBG: number, direction: number) => void;
  changeUsed: (idBlock, idBG) => void;
}

const BlockTreeImage: React.FC<BlockTreeImageProps> = ({
  background: b,
  blockId: bl,
  currentPreset,
  inUse,
  changeBackgroundType,
  changeBackgroundImage,
  changeBackgroundOption,
  deleteBackground,
  moveBackground,
  changeUsed,
}) => {
  const [bgImage, handleBgImageChange] = useState(
    b.backgroundImage
      ? (b.backgroundImage as string).replace('url("', "").replace('")', "")
      : ""
  );

  const [modalRemove, setModalRemove] = useState<boolean>(false);

  const handleBgImageUploadEvent = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    changeBackgroundImage(bl, b.id, imgUrl);
    handleBgImageChange(imgUrl);
  };

  const focusUploadImage = () => {
    const uploadInput = document.getElementById(`${bl}-${b.id}-upload-input`);
    uploadInput?.click();
  };

  return (
    <BackgroundBlock>
      {modalRemove && (
        <ModalRemove
          title={"Are you sure?"}
          subtitle={`You are about to delete this image background. Continue?`}
          onYes={() => {
            handleScrollBlock(false);
            deleteBackground(bl, b.id);
            changeUsed(-1, -1);
          }}
          onNo={() => {
            handleScrollBlock(false);
            setModalRemove(false);
          }}
        />
      )}
      <BackgroundBlockHeader>
        <Header>Background</Header>
        <div>
          <Button
            info
            onClick={() => {
              if (inUse.block === bl && inUse.background === b.id) {
                changeUsed(-1, -1);
                return;
              }
              changeUsed(bl, b.id);
            }}
          >
            {inUse.block === bl && inUse.background === b.id ? "In use" : "Use"}
          </Button>
          {currentPreset.blocks[bl].backgrounds!.length - 1 !== b.id && (
            <Button
              onClick={() => {
                if (inUse.block === bl && inUse.background === b.id) {
                  console.log(true);
                  changeUsed(bl, b.id + 1);
                }
                moveBackground(bl, b.id, 1);
              }}
            >
              &#8650;
            </Button>
          )}
          {b.id !== 0 && (
            <Button
              onClick={() => {
                if (inUse.block === bl && inUse.background === b.id) {
                  changeUsed(bl, b.id - 1);
                }
                moveBackground(bl, b.id, -1);
              }}
            >
              &#8648;
            </Button>
          )}
          <Button onClick={() => setModalRemove(true)} danger>
            &#x2716;
          </Button>
        </div>
      </BackgroundBlockHeader>
      <Columns>
        <Column>
          <BackgroundOptions>
            <p>
              <Button confirm>Image</Button>
              <Button
                onClick={() => changeBackgroundType(bl, b.id, "gradient")}
              >
                Gradient
              </Button>
              :
            </p>
          </BackgroundOptions>
          <BackgroundOptions>
            <p>
              Image URL:
              <label htmlFor={`bg-${currentPreset.id}-${bl}-${b.id}`}>
                <Input
                  type="text"
                  id={`bg-${currentPreset.id}-${bl}-${b.id}`}
                  onChange={(e) => {
                    changeBackgroundImage(bl, b.id, e.target.value);
                    handleBgImageChange(e.target.value);
                  }}
                  value={bgImage}
                />
              </label>
              <span>or upload: </span>
              <Button onClick={focusUploadImage}>Upload Image</Button>
              <Input
                id={`${bl}-${b.id}-upload-input`}
                hidden
                accept="image/*"
                type="file"
                onChange={handleBgImageUploadEvent}
              />
            </p>
          </BackgroundOptions>
          <BackgroundOptions>
            <ImagePreview
              style={{ backgroundImage: b.backgroundImage as string }}
            ></ImagePreview>
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
              <small>Size: </small>{" "}
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
          </BackgroundOptions>
        </Column>
      </Columns>
    </BackgroundBlock>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeBackgroundType: (idBlock, idBG, toType) =>
    dispatch(changeBackgroundTypeAction(idBlock, idBG, toType)),
  changeBackgroundImage: (idBlock, idBG, toImage) =>
    dispatch(changeBackgroundImageAction(idBlock, idBG, toImage)),
  changeBackgroundOption: (idBlock, idBG, value, type) =>
    dispatch(changeBackgroundOptionAction(idBlock, idBG, value, type)),
  deleteBackground: (idBlock, idBG) =>
    dispatch(deleteBackgroundAction(idBlock, idBG)),
  moveBackground: (idBlock, idBG, direction) =>
    dispatch(moveBackgroundAction(idBlock, idBG, direction)),
  changeUsed: (idBlock, idBG) => dispatch(changeUsedAction(idBlock, idBG)),
});

const mapStateToProps = (state) => {
  const { currentPreset, inUse } = state;
  return {
    currentPreset,
    inUse,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockTreeImage);
