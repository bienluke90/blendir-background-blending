import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import theme from "../../theme/theme";

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999998;
  width: 100%;
  min-height: 100%;
  background-color: rgba(50, 50, 50, 0.85);
  padding: 15px;
`;

const Modal = styled.div`
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

interface ModalRemoveProps {
  title: string;
  subtitle: string;
  onYes: () => void;
  onNo: () => void;
}

const ModalRemove: React.FC<ModalRemoveProps> = ({
  title,
  subtitle,
  onYes,
  onNo,
}) => {
  return (
    <ModalContainer>
      <Modal>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <Button onClick={onYes} danger>
          Delete
        </Button>
        <Button onClick={onNo}>Cancel</Button>
      </Modal>
    </ModalContainer>
  );
};

export default ModalRemove;
