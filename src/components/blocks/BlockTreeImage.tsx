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
import Input from "../elements/Input";

const Header = styled.h2`
  font-size: 2rem;
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
}

const BlockTreeImage: React.FC<BlockTreeImageProps> = ({
  background: b,
  blockId: bl,
  currentPreset,
}) => {
  let gradientParts = (b.backgroundImage as string)
    .replace(/radial-gradient\(|linear-gradient\(|\)$/g, "")
    .split(/,(?![^()]*(?:\([^()]*\))?\))/);
  gradientParts.shift();
  return (
    <BackgroundBlock>
      <BackgroundBlockHeader>
        <Header>Background</Header>
        <div>
          <Button info>Use</Button>
          <Button>&#8648;</Button>
          <Button> &#8650;</Button>
          <Button danger>&#x2716;</Button>
        </div>
      </BackgroundBlockHeader>
      <Columns>
        <Column>
          <BackgroundOptions>
            <p>
              <Button confirm>Image</Button>
              <Button>Gradient</Button>:
            </p>
          </BackgroundOptions>
          <BackgroundOptions>
            <p>
              Image URL:
              <label htmlFor={`bg-${currentPreset.id}-${bl}-${b.id}`}>
                <Input
                  type="text"
                  id={`bg-${currentPreset.id}-${bl}-${b.id}`}
                  value={(b.backgroundImage as string)
                    .replace('url("', "")
                    .replace('")', "")}
                />
              </label>
              {"or "}
              <Button>Upload</Button>
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
              <Button confirm>{`X: ${
                b.backgroundPosition?.split(" ")[0]
              }`}</Button>
              <Button confirm>{`Y: ${
                b.backgroundPosition?.split(" ")[1]
              }`}</Button>
            </p>
            <p>
              <small>Size: </small>{" "}
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

export default BlockTreeImage;
