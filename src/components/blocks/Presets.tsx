import React, { useEffect } from "react";
import Container from "../../templates/Container";
import theme from "../../theme/theme";
import styled from "styled-components";
import Button from "../elements/Button";
import { connect } from "react-redux";
import { activatePreset as activatePresetAction } from "../../actions";

const PresetsContainer = styled.div<PresetsContainerProps>`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  padding-bottom: 90px;
  background-color: ${theme.panel.backgroundColor};
  z-index: 999;
  overflow-y: scroll;
  overflow-x: hidden;
  ${(p: PresetsContainerProps) =>
    p.active &&
    `
      left: 0 !important;
    `}
`;

const Header = styled.div`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  padding: 0;
  h1 {
    font-size: 250%;
  }
  .button {
    margin-top: 10px;
  }
`;

const Subheader = styled.p`
  text-align: center;
  font-size: bold;
`;

const Card = styled.div`
  background-color: ${theme.colors.text};
  border-radius: ${theme.borderRadius};
  padding: 15px;
  margin: 0 15px 30px 15px;
  color: ${theme.colors.textInverted};
  h2 {
    margin-bottom: 20px;
  }
`;

const PresetCard = styled.div`
  display: flex;
  background-color: #fff;
  box-shadow: 2px 2px 10px 0px ${theme.nav.backgroundColor};
  border-radius: ${theme.borderRadius};
  padding: 15px;
  margin-bottom: 15px;
`;

const Buttons = styled.div`
  text-align: right;
  margin-left: auto;
`;

interface PresetsContainerProps {
  active?: boolean;
}

interface PresetsProps {
  active: boolean;
  showPanel: React.Dispatch<React.SetStateAction<string>>;
  currentPreset: Preset;
  presets: Preset[];
  activatePreset: (idPreset: number) => void;
}

const Presets: React.FC<PresetsProps> = ({
  active,
  showPanel,
  currentPreset,
  presets,
  activatePreset,
}) => {
  useEffect(() => {
    const element = document.getElementById("presets-container");
    const listener = (e: Event) => {
      if (element !== e.target) {
        return;
      }
      showPanel("playground");
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });

  const presetElements = presets.map((p) => (
    <PresetCard>
      <h3>{p.name}</h3>
      <Buttons>
        {currentPreset.id !== p.id && (
          <Button onClick={() => activatePreset(p.id)}>Activate</Button>
        )}
        {currentPreset.id === p.id && <Button confirm>Activated</Button>}
        <Button danger>Remove</Button>
      </Buttons>
    </PresetCard>
  ));
  return (
    <PresetsContainer id="presets-container" active={active}>
      <Container>
        <Header>
          <h1>Presets</h1>
          <Subheader>Add new preset:</Subheader>
          <Button inverted>Add new</Button>
        </Header>
        <Card>
          <h2>All presets: </h2>
          {presetElements}
        </Card>
      </Container>
    </PresetsContainer>
  );
};

const mapStateToProps = (state) => {
  const { currentPreset, presets } = state;
  return {
    currentPreset,
    presets,
  };
};

const mapDispatchToProps = (dispatch) => ({
  activatePreset: (idPreset) => dispatch(activatePresetAction(idPreset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presets);
