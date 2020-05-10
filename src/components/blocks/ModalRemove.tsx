import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import theme from "../../theme/theme";
import { ModalContainer, Modal } from "../elements/Modal";

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
