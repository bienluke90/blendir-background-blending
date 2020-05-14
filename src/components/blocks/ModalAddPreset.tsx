import React, { useState } from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { connect } from "react-redux";
import { addPreset as addPresetAction } from "../../actions";
import { ModalContainer, Modal } from "../elements/Modal";

interface ModalAddPresetProps {
  title: string;
  subtitle: string;
  onAdd: () => void;
  onCancel: () => void;
  addPreset: (name) => void;
}

const ModalAddPreset: React.FC<ModalAddPresetProps> = ({
  onAdd,
  onCancel,
  addPreset,
}) => {
  const [presetName, changePresetName] = useState<string>("");
  return (
    <ModalContainer>
      <Modal>
        <h3>Add preset</h3>
        <p>
          Select name for the new preset: <br />
          <label htmlFor="preset-name">
            <Input
              id="preset-name"
              value={presetName}
              onChange={(e) => changePresetName(e.target.value)}
            />
          </label>
        </p>
        <Button
          onClick={() => {
            if (presetName.length) {
              onAdd();
              addPreset(presetName);
            }
          }}
          confirm
        >
          Add new
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Modal>
    </ModalContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addPreset: (name) => dispatch(addPresetAction(name)),
});

export default connect(null, mapDispatchToProps)(ModalAddPreset);
