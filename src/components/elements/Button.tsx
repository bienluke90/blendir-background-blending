import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";
import { rgba } from "polished";

const ButtonStyled = styled.button`
  display: inline-block;
  border-radius: ${theme.borderRadius};
  background-color: ${theme.colors.text};
  padding: 4px 10px;
  margin: 0 10px 10px 0;
  border-style: solid;
  border-width: 2px;
  font-family: inherit;
  font-weight: 700;
  font-size: inherit;
  cursor: pointer;

  ${(p: ButtonProps) =>
    p.inverted &&
    `
    color: ${theme.colors.text};
  `}
  ${(p: ButtonProps) =>
    p.confirm &&
    `
    background-color: ${theme.colors.confirm};
    border-color: ${theme.colors.confirm};
    color: ${theme.colors.confirm};
  `}
  ${(p: ButtonProps) =>
    p.info &&
    `
    background-color: ${theme.colors.info};
    border-color: ${theme.colors.info};
    color: ${theme.colors.info};
  `}
  ${(p: ButtonProps) =>
    p.warning &&
    `
    background-color: ${theme.colors.warning};
    border-color: ${theme.colors.warning};
    color: ${theme.colors.warning};
  `}
  ${(p: ButtonProps) =>
    p.danger &&
    `
    background-color: ${theme.colors.danger};
    border-color: ${theme.colors.danger};
    color: ${theme.colors.danger};
  `}
  ${(p: ButtonProps) =>
    p.inverted &&
    `
    background-color: rgba(0, 0, 0, 0) !important;
  `}
  ${(p: ButtonProps) =>
    !p.inverted &&
    `
    color: ${theme.colors.textInverted};
    box-shadow: -3px -3px 5px ${rgba(theme.colors.textInverted, 0.25)} inset;
    text-shadow: 0 0 1px ${theme.colors.text};
    &:hover {
      transition: box-shadow 0.2s;
      box-shadow: 0 0 2px ${rgba(theme.colors.textInverted, 0.25)} inset;
    }
  `};
`;

interface ButtonProps {
  inverted?: boolean;
  confirm?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyled className="button" {...props} type="button">
      {props.children}
    </ButtonStyled>
  );
};

export default Button;
