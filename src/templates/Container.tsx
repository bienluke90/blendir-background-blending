import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";

const ContainerElement = styled.div`
  width: 100%;
  @media screen and (min-width: ${theme.widths.desktop}) {
    margin: 0 auto;
    max-width: 1200px;
  }
`;

const Container: React.FC = ({ children }) => {
  return <ContainerElement>{children}</ContainerElement>;
};

export default Container;
