import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "../../theme/theme";
import Container from "../../templates/Container";
import { connect } from "react-redux";
import Button from "../elements/Button";

const SeeCodeContainer = styled.div<SeeCodeContainerProps>`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  padding-bottom: 90px;
  background-color: ${theme.panel.backgroundColor};
  z-index: 999;
  overflow-y: scroll;
  overflow-x: hidden;
  ${(p: SeeCodeContainerProps) =>
    p.active &&
    `
      left: 0 !important;
    `}
`;

const Header = styled.div`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  padding: 0;
  h1 {
    font-size: 300%;
  }
`;

const Card = styled.div`
  background-color: ${theme.colors.text};
  border-radius: ${theme.borderRadius};
  padding: 15px;
  margin: 0 15px 30px 15px;
  color: ${theme.colors.textInverted};
  h2 {
    margin-bottom: 20px;
  }
`;

const CodeCard = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 90%;
  font-weight: normal;
  color: ${theme.colors.text};
  background-color: ${theme.colors.textInverted};
  border-radius: ${theme.borderRadius};
  white-space: pre-wrap;
  overflow-x: scroll;
  margin: 10px;
  padding: 20px;
`;

interface SeeCodeContainerProps {
  active: boolean;
}

interface SeeCodeProps {
  active: boolean;
  showPanel: React.Dispatch<React.SetStateAction<string>>;
  currentPreset: Preset;
  gradients: Gradient[];
}

const SeeCode: React.FC<SeeCodeProps> = ({
  active,
  showPanel,
  currentPreset,
  gradients,
}) => {
  useEffect(() => {
    const element = document.getElementById("seeCode-container");
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
  const codeHTML = currentPreset.blocks.map((bl) => {
    return (
      <p>{`\t<div id="block-${bl.type}-${bl.id}">${
        bl.type === "text" ? bl.text : ""
      }</div>\n`}</p>
    );
  });
  const codeCSS = currentPreset.blocks.map((bl) => {
    if (bl.type === "text") {
      return (
        <p>
          {`#block-text-${bl.id} {\n`}
          {`\tposition: absolute;\n`}
          {`\tcolor: ${bl.color};\n`}
          {`\tfont-size: ${bl.fontSize};\n`}
          {`\tfont-weight: ${bl.fontWeight};\n`}
          {`\tfont-style: ${bl.fontStyle};\n`}
          {`\ttext-align: ${bl.textAlign};\n`}
          {`\ttop: ${bl.top};\n`}
          {`\tleft: ${bl.left};\n`}
          {`\ttransform: ${bl.transform};\n`}
          {`}\n\n`}
        </p>
      );
    }
    if (bl.type === "background") {
      let bgImage = [],
        bgSize = [],
        bgPosition = [],
        bgRepeat = [];

      bl.backgrounds!.map((bg) => {
        let bgi;
        if (bg.type === "image") {
          bgi = bg.backgroundImage as string;
        }
        if (bg.type === "gradient") {
          bgi = gradients[bg.backgroundImage].backgroundImage;
        }
        bgImage.push(bgi as never);
        bgSize.push(bg.backgroundSize as never);
        bgPosition.push(bg.backgroundPosition as never);
        bgRepeat.push(bg.backgroundRepeat as never);
      });

      return (
        <p>
          {`#block-${bl.type}-${bl.id} {\n`}
          {`\tposition: absolute;\n`}
          {`\twidth: 100%;\n`}
          {`\theight: 100vh;\n`}
          {`\tbackground-blend-mode: ${bl.blendMode};\n`}
          {`\tbackground-image: ${bgImage.join(", ")};\n`}
          {`\tbackground-size: ${bgSize.join(", ")};\n`}
          {`\tbackground-position: ${bgPosition.join(", ")};\n`}
          {`\tbackground-repeat: ${bgRepeat.join(", ")};\n`}
          {`}\n\n`}
        </p>
      );
    }
  });

  return (
    <SeeCodeContainer id="seeCode-container" active={active}>
      <Container>
        <Header>
          <h1>See code</h1>
          <p>You can see and copy code to your project</p>
        </Header>
        <Card>
          <h2>Generated HTML:</h2>
          <CodeCard id="code-card">
            {`<div id="block-container">`}
            {codeHTML}
            {`</div>`}
          </CodeCard>
          <h2>Generated CSS:</h2>
          <CodeCard id="code-card">
            {`#block-container {\n`}
            {`\tfont-size: 62.5%;\n`}
            {`\twidth: 100%;\n`}
            {`\theight: 100vh;\n`}
            {`}\n\n`}
            {codeCSS}
          </CodeCard>
        </Card>
      </Container>
    </SeeCodeContainer>
  );
};

const mapStateToProps = (state) => {
  const { currentPreset, gradients } = state;
  return {
    currentPreset,
    gradients,
  };
};

export default connect(mapStateToProps)(SeeCode);
