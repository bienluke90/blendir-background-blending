import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const PlaygroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 99;
`;

const Block = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

interface PlaygroundProps {
  currentPreset: Preset;
  gradients: Gradient[];
}

const Playground: React.FC<PlaygroundProps> = ({
  currentPreset,
  gradients,
}) => {
  const blocks = currentPreset.blocks.map((b) => {
    if (b.type === "background") {
      const backgroundImage = (b.backgrounds as Background[])
        .map((b) => {
          if (typeof b.backgroundImage === "string") {
            return b.backgroundImage;
          }
          return gradients[b.backgroundImage].backgroundImage;
        })
        .join(",");
      const backgroundRepeat = (b.backgrounds as Background[])
        .map((b) => b.backgroundRepeat)
        .join(",");
      const backgroundPosition = (b.backgrounds as Background[])
        .map((b) => b.backgroundPosition)
        .join(",");
      const backgroundSize = (b.backgrounds as Background[])
        .map((b) => b.backgroundSize)
        .join(",");
      const backgroundColor = (b.backgrounds as Background[])
        .map((b) => b.backgroundColor)
        .join(",");
      const backgroundBlendMode = b.blendMode || "normal";
      return (
        <Block
          key={`bGB-${b.id}`}
          style={{
            backgroundImage,
            backgroundRepeat,
            backgroundPosition,
            backgroundSize,
            backgroundColor,
            backgroundBlendMode,
          }}
        ></Block>
      );
    }
    if ((b.type = "text")) {
      return (
        <p
          style={{
            position: "absolute",
            fontSize: b.fontSize,
            fontWeight: b.fontWeight as "normal" | "bold",
            fontStyle: b.fontStyle,
            color: b.color,
            top: b.top,
            left: b.left,
            transform: b.transform,
            textAlign: b.textAlign as "center" | "left" | "right",
          }}
          key={`tB-${b.id}`}
        >
          {b.text}
        </p>
      );
    }
    return null;
  });
  return <PlaygroundContainer>{blocks}</PlaygroundContainer>;
};

const mapStateToProps = (state) => {
  const { currentPreset, gradients } = state;
  return {
    currentPreset,
    gradients,
  };
};

export default connect(mapStateToProps)(Playground);
