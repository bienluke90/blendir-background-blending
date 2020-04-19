import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";
import { connect } from "react-redux";

const PlaygroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 99;
`;

const BlockBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

interface PlaygroundProps {
  currentPreset: Preset;
}

const Playground: React.FC<PlaygroundProps> = ({ currentPreset }) => {
  const blocks = currentPreset.blocks.map((b) => {
    if (b.type === "background") {
      const backgroundImage = (b.backgrounds as Background[])
        .map((b) => b.backgroundImage)
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
        <BlockBG
          style={{
            backgroundImage,
            backgroundRepeat,
            backgroundPosition,
            backgroundSize,
            backgroundColor,
            backgroundBlendMode,
          }}
        ></BlockBG>
      );
    }
    if ((b.type = "text")) {
      return <p>{b.text}</p>;
    }
    return <div>Block</div>;
  });
  return <PlaygroundContainer>{blocks}</PlaygroundContainer>;
};

const mapStateToProps = (state) => {
  const { currentPreset } = state;
  return {
    currentPreset,
  };
};

export default connect(mapStateToProps)(Playground);
