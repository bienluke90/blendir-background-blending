import styled from "styled-components";
import theme from "../../theme/theme";

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999998;
  width: 100%;
  min-height: 100%;
  background-color: rgba(50, 50, 50, 0.85);
  padding: 15px;
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  min-width: 300px;
  max-width: 400px;
  padding: 15px 20px;
  background-color: ${theme.colors.text};
  border-radius: ${theme.borderRadius};
  color: ${theme.colors.textInverted};
  h3 {
    font-size: 2.2rem !important;
    width: 100%;
    margin-bottom: 10px;
    padding: 0;
  }
  p {
    font-size: 1.7rem !important;
    margin: 0 0 15px 0 !important;
    padding: 0;
  }
`;
