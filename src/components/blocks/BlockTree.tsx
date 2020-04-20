import React, { useEffect } from "react";
import theme from "../../theme/theme";
import styled from "styled-components";
import Container from "./../../templates/Container";
import { connect } from "react-redux";
import Button from "../elements/Button";
import Input from "../elements/Input";
import UseDetectOutside from "../../hooks/UseDetectOutside";

const BlockTreeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  background-color: ${theme.panel.backgroundColor};
  z-index: 999;
  transform: translateX(-100%);
  transition: transform 0.2s;
  overflow-y: scroll;
  ${(p: BlockTreeCotaninerProps) =>
    p.active &&
    `
      transform: translateY(0) !important;
      transition: transform 0.5s;
    `}
`;

const Header = styled.h1`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 15px;
`;

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

const TopButtons = styled.div`
  display: inline-block;
  margin-left: auto;
  text-align: right;
  min-width: 150px;
  .button:last-child {
    margin-right: 0;
  }
  .button {
    display: inline-block;
  }
`;

const TreeBlockContent = styled.div`
  color: ${theme.colors.textInverted};
`;

const BackgroundBlock = styled.div`
  background-color: ${theme.colors.text};
  border-radius: ${theme.borderRadius};
  margin-bottom: 10px;
  padding: 8px 12px;
  .button {
    font-size: 1.2rem;
    margin-right: 4px;
  }
`;

const BackgroundBlockHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0 0 0;
  p {
    max-width: 40%;
    font-size: 1.8rem;
    margin-right: 1rem;
  }
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Column = styled.div`
  width: 100%;
  @media screen and (min-width: ${theme.widths.tablet}) {
    width: 50%;
  }
`;

const BackgroundOptions = styled.div`
  p {
    margin-bottom: 10px;
  }
`;

const ImagePreview = styled.div`
  max-width: 200px;
  height: 120px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 10px auto;
  border-radius: ${theme.borderRadius};
`;

const Gradients = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  width: 60px;
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
  max-width: 200px;
  height: 120px;
  border-radius: ${theme.borderRadius};
`;

const GradientLine = styled.div`
  width: calc(100% - 20px);
  height: 40px;
  background-color: #fff;
  border-radius: ${theme.borderRadius};
`;

interface GradientMiniatureProps {
  active?: boolean;
}

interface BlockTreeCotaninerProps {
  active: boolean;
}

interface BlockTreeProps {
  active: boolean;
  currentPreset: Preset;
  gradients: {
    id: number;
    backgroundImage: string;
  }[];
  showPanel: React.Dispatch<React.SetStateAction<string>>;
}

const BlockTree: React.FC<BlockTreeProps> = ({
  active,
  currentPreset,
  showPanel,
  gradients,
}) => {
  useEffect(() => {
    const element = document.getElementById("block-tree-container");
    const listener = (e: Event) => {
      if (element !== e.target) {
        return;
      }
      showPanel("playground");
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });

  const blockTree = currentPreset.blocks.map((bl) => {
    let type, content;
    if (bl.type === "background") {
      type = "Background block";
      content =
        bl.backgrounds &&
        bl.backgrounds.map((b) => {
          if (b.type === "image") {
            return (
              <BackgroundBlock key={`bgb-${bl.id}-${b.id}`}>
                <BackgroundBlockHeader>
                  <p>Background image</p>
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
                        <label
                          htmlFor={`bg-${currentPreset.id}-${bl.id}-${b.id}`}
                        >
                          <Input
                            id={`bg-${currentPreset.id}-${bl.id}-${b.id}`}
                            value={b
                              .backgroundImage!.replace('url("', "")
                              .replace('")', "")}
                          />
                        </label>
                        {"or "}
                        <Button>Upload</Button>
                      </p>
                    </BackgroundOptions>
                    <BackgroundOptions>
                      <ImagePreview
                        style={{ backgroundImage: b.backgroundImage }}
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
                        <Button confirm={b.backgroundSize === "cover"}>
                          Cover
                        </Button>
                        <Button confirm={b.backgroundSize === "contain"}>
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
                        <Button confirm={b.backgroundRepeat === "no-repeat"}>
                          No repeat
                        </Button>
                        <Button confirm={b.backgroundRepeat === "repeat"}>
                          Repeat
                        </Button>
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
          }
          if (b.type === "gradient") {
            let gradientParts = b
              .backgroundImage!.replace(
                /radial-gradient\(|linear-gradient\(|\)$/g,
                ""
              )
              .split(/,(?![^()]*(?:\([^()]*\))?\))/);
            gradientParts.shift();
            console.log(gradientParts);
            return (
              <BackgroundBlock key={`bgb-${bl.id}-${b.id}`}>
                <BackgroundBlockHeader>
                  <p>Background gradient</p>
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
                            active={(g as Gradient).active}
                          ></GradientMiniature>
                        ))}
                        <GradientMiniature>+</GradientMiniature>
                      </Gradients>
                      <BackgroundOptions>
                        <GradientPreview
                          style={{
                            backgroundImage: gradients.filter(
                              (g) => (g as Gradient).active
                            )[0].backgroundImage,
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
                      ></GradientLine>
                    </BackgroundOptions>
                  </Column>
                </Columns>
              </BackgroundBlock>
            );
          }
          return null;
        });
    }
    return (
      <TreeBlock key={`tb-${bl.id}`}>
        <TreeBlockHeader>
          <p>{type}</p>
          <TopButtons>
            <Button>&#8650;</Button>
            <Button>&#8648;</Button>
            <Button danger>&#x2716;</Button>
          </TopButtons>
        </TreeBlockHeader>
        <TreeBlockContent>{content}</TreeBlockContent>
      </TreeBlock>
    );
  });
  return (
    <BlockTreeContainer id="block-tree-container" active={active}>
      <Container>
        <Header>Blocks</Header>
        {blockTree}
      </Container>
    </BlockTreeContainer>
  );
};

const mapStateToProps = (state) => {
  const { currentPreset, gradients } = state;
  return {
    currentPreset,
    gradients,
  };
};

export default connect(mapStateToProps)(BlockTree);
