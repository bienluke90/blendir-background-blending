import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  changeSize as changeSizeAction,
  changePosition as changePositionAction,
} from "../../actions";
import { roundToTwo } from "../../utils";

const PlaygroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 99;
  overflow: hidden;
  p {
    user-select: none;
  }
`;

const Block = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

interface PlaygroundProps {
  currentPreset: Preset;
  gradients: Gradient[];
  inUse: {
    block: number;
    background: number;
  };
  changePosition: (idBlock, idBG, value) => void;
  changeSize: (idBlock, idBG, value) => void;
}

const Playground: React.FC<PlaygroundProps> = ({
  currentPreset,
  gradients,
  inUse,
  changePosition,
  changeSize,
}) => {
  const handlePositionChange = (e) => {
    if (inUse.block < 0) {
      return;
    }

    let bgPos, bgPosValues, initialPos, bgSize, bgSizeValue;

    if (inUse.background >= 0) {
      bgPos = currentPreset.blocks[inUse.block].backgrounds![
        inUse.background
      ].backgroundPosition!.split(" ");
      bgSize = currentPreset.blocks[inUse.block].backgrounds![inUse.background]
        .backgroundSize!;

      if (bgSize === "cover" || bgSize === "contain") {
        bgSize = "100%";
      }

      bgSizeValue = +bgSize.replace("%", "").split(" ")[0];

      const container = document.getElementById("playground-container")!;

      bgPosValues = {
        x: +bgPos[0]
          .replace(
            "center",
            container.getBoundingClientRect().width / 2 -
              (bgSizeValue * container.getBoundingClientRect().width) / 200
          )
          .replace("left", 0)
          .replace(
            "right",
            container.getBoundingClientRect().width -
              (bgSizeValue * container.getBoundingClientRect().width) / 200
          )
          .replace("px", ""),
        y: +bgPos[1]
          .replace(
            "center",
            container.getBoundingClientRect().height / 2 -
              (bgSizeValue * container.getBoundingClientRect().height) / 200
          )
          .replace("top", 0)
          .replace(
            "bottom",
            container.getBoundingClientRect().height -
              (bgSizeValue * container.getBoundingClientRect().width) / 200
          )
          .replace("px", ""),
      };

      initialPos = {
        x: e.pageX,
        y: e.pageY,
      };
    }

    const updatePosition = (e) => {
      const container = document.getElementById("playground-container")!;
      if (inUse.background >= 0) {
        const afterValues = {
          x: e.pageX,
          y: e.pageY,
        };

        changePosition(
          inUse.block,
          inUse.background,
          `${roundToTwo(
            bgPosValues.x + afterValues.x - initialPos.x
          )} ${roundToTwo(bgPosValues.y + afterValues.y - initialPos.y)}`
        );
        return;
      }

      changePosition(
        inUse.block,
        null,
        `${roundToTwo(e.pageX)} ${roundToTwo(e.pageY)}`
      );
    };

    document.addEventListener("mousemove", updatePosition);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updatePosition);
    });
  };

  const handleSizeChange = (e) => {
    if (inUse.block < 0) {
      return;
    }

    let bgPos, bgPosValues, bgSize, bgSizeValue;

    if (inUse.background < 0) {
      let currentSize = currentPreset.blocks[inUse.block].fontSize!.replace(
        "rem",
        ""
      );
      changeSize(inUse.block, null, `${+currentSize + e.deltaY / 15}rem`);
      return;
    }

    bgPos = currentPreset.blocks[inUse.block].backgrounds![
      inUse.background
    ].backgroundPosition!.split(" ");
    bgSize = currentPreset.blocks[inUse.block].backgrounds![inUse.background]
      .backgroundSize!;

    if (bgSize === "cover" || bgSize === "contain") {
      bgSize = `100%`;
    }

    bgSizeValue = +bgSize.replace("%", "").split(" ")[0];

    const container = document.getElementById("playground-container")!;

    bgPosValues = {
      x: +bgPos[0]
        .replace(
          "center",
          container.getBoundingClientRect().width / 2 -
            (bgSizeValue * container.getBoundingClientRect().width) / 200
        )
        .replace("left", 0)
        .replace(
          "right",
          container.getBoundingClientRect().width -
            (bgSizeValue * container.getBoundingClientRect().width) / 200
        )
        .replace("px", ""),
      y: +bgPos[1]
        .replace(
          "center",
          container.getBoundingClientRect().height / 2 -
            (bgSizeValue * container.getBoundingClientRect().height) / 200
        )
        .replace("top", 0)
        .replace(
          "bottom",
          container.getBoundingClientRect().height -
            (bgSizeValue * container.getBoundingClientRect().width) / 200
        )
        .replace("px", ""),
    };

    let currentSize = currentPreset.blocks[inUse.block].backgrounds![
      inUse.background
    ].backgroundSize;

    currentSize =
      currentSize === "cover" || currentSize === "contain"
        ? "100%"
        : currentSize;

    let delta = e.deltaY > 3 || e.deltaY < -3 ? e.deltaY / 12 : e.deltaY;

    const sizeTo = +currentSize!.split(" ")[0].replace("%", "") + delta;

    if (+sizeTo >= 1) {
      changeSize(inUse.block, inUse.background, `${sizeTo}% ${sizeTo}%`);

      changePosition(
        inUse.block,
        inUse.background,
        `${roundToTwo(
          bgPosValues.x -
            delta * container.getBoundingClientRect().width * 0.005
        )} ${roundToTwo(
          bgPosValues.y -
            delta * container.getBoundingClientRect().height * 0.005
        )}`
      );
    }
  };

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
  return (
    <PlaygroundContainer
      id="playground-container"
      onWheel={handleSizeChange}
      onMouseDown={handlePositionChange}
    >
      {blocks}
    </PlaygroundContainer>
  );
};

const mapStateToProps = (state) => {
  const { currentPreset, gradients, inUse } = state;
  return {
    currentPreset,
    gradients,
    inUse,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeSize: (idBlock, idBG, value) =>
    dispatch(changeSizeAction(idBlock, idBG, value)),
  changePosition: (idBlock, idBG, value) =>
    dispatch(changePositionAction(idBlock, idBG, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
