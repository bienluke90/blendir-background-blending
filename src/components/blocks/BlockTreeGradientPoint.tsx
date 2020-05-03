import React from "react";
import styled from "styled-components";
import { opacify } from "polished";
import theme from "../../theme/theme";

const GradientPointElement = styled.div<GradientPointElementProps>`
  ${(p: GradientPointElementProps) =>
    p.activePoint &&
    `
    &::after {
      position: absolute;
      content: "${p.position}%";
      width: 44px;
      height: 2.4rem;
      color: white;
      background-color: #333;
      border: 2px solid #fff;
      z-index: 9998;
      bottom: -2.9rem;
      font-size: 1.4rem;
      left: -20px;
      text-align: center;
      border-radius: ${theme.borderRadius};
      box-shadow: 0 0 0 2px #000;
    }
  `}
  position: absolute;
  top: -10%;
  border-radius: ${theme.borderRadius};
  border: 3px solid #555;
  width: 10px;
  height: 120%;
  cursor: ew-resize;
  z-index: 9999;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
  user-select: none;
`;

const RemoveButton = styled.div<RemoveButton>`
  position: absolute;
  width: 2rem;
  height: 2.4rem;
  color: black;
  background-color: ${theme.colors.danger};
  border: 2px solid #fff;
  z-index: 9998;
  bottom: -2.9rem;
  font-size: 1.4rem;
  left: 26px;
  text-align: center;
  border-radius: ${theme.borderRadius};
  box-shadow: 0 0 0 2px #000;
  cursor: pointer;
`;

interface RemoveButton {
  activePoint: boolean;
  onClick: (Event: any) => void;
}

interface GradientPointElementProps {
  activePoint: boolean;
  position: number;
}

interface GradientPointProps {
  id: string;
  lineId: string;
  color: string;
  position: number;
  onMouseDown: (Event: any) => void;
  activePoint: boolean;
  remove: (which: number) => void;
}

const GradientPoint: React.FC<GradientPointProps> = ({
  id,
  color,
  position,
  onMouseDown,
  activePoint,
  remove,
}) => {
  return (
    <GradientPointElement
      id={id}
      onMouseDown={onMouseDown}
      activePoint={activePoint}
      position={position}
      style={{
        left: `calc(${position}% - 5px)`,
        backgroundColor: opacify(1, color),
      }}
    >
      {activePoint && (
        <RemoveButton
          id={`${id}-rm`}
          onClick={(e) => {
            e.preventDefault();
            remove(+id.split("-")[0]);
          }}
          activePoint={activePoint}
        >
          &#x2716;
        </RemoveButton>
      )}
    </GradientPointElement>
  );
};

export default GradientPoint;
