import React from "react";
import styled from "styled-components";
import theme from "../../theme/theme";

const InputElement = styled.input`
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
  value?: string;
}

const Input: React.FC<InputProps> = ({ children, id, value }) => (
  <InputElement value={value} id={id}>
    {children}
  </InputElement>
);

export default Input;
