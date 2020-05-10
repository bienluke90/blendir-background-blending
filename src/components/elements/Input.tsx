import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";

const InputElement = styled.input`
  ${(p: InputProps) =>
    p.hidden &&
    `
    visibility: hidden;
  `}
  padding: 5px;
  margin: 10px;
  background-color: #fff;
  border: 1px solid rgba(100, 100, 100, 0.75);
  box-shadow: -3px -3px 3px rgba(100, 100, 100, 0.25) inset;
  border-radius: ${theme.borderRadius};
  &:focus {
    box-shadow: 0 0 0 0 transparent;
  }
`;

interface InputProps {
  id?: string;
  value?: any;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | Function;
  accept?: string;
  hidden?: boolean;
}

const Input: React.FC<InputProps> = ({
  children,
  id,
  value,
  type,
  onChange,
  accept,
  hidden,
}) => (
  <InputElement
    accept={accept}
    onChange={onChange}
    type={type}
    value={value}
    id={id}
    hidden={hidden}
  >
    {children}
  </InputElement>
);

export default Input;
