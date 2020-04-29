import React from "react";
import styled from "styled-components";
import { opacify } from "polished";
import theme from "../../theme/theme";

const GradientPointElement = styled.div`
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

interface GradientPointProps {
  id: string;
  lineId: string;
  color: string;
  position: number;
  onMouseDown: (Event: any) => void;
}

const GradientPoint: React.FC<GradientPointProps> = ({
  id,
  color,
  position,
  onMouseDown,
}) => {
  return (
    <GradientPointElement
      id={id}
      onMouseDown={onMouseDown}
      style={{
        left: `calc(${position}% - 5px)`,
        backgroundColor: opacify(1, color),
      }}
    ></GradientPointElement>
  );
};

export default GradientPoint;
