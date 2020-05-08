export const CHANGE_BACKGROUND_TYPE = "CHANGE_BACKGROUND_TYPE";
export const CHANGE_BACKGROUND_IMAGE = "CHANGE_BACKGROUND_IMAGE";
export const CHANGE_BACKGROUND_OPTION = "CHANGE_BACKGROUND_OPTION";
export const ADD_GRADIENT = "ADD_GRADIENT";
export const UPDATE_GRADIENT = "UPDATE_GRADIENT";
export const CHANGE_GRADIENT = "CHANGE_GRADIENT";
export const CHANGE_GRADIENT_TYPE = "CHANGE_GRADIENT_TYPE";
export const CHANGE_GRADIENT_DIRECTION = "CHANGE_GRADIENT_DIRECTION";
export const CHANGE_TEXT_OPTION = "CHANGE_TEXT_OPTION";
export const SELECT_BLENDING_MODE = "SELECT_BLENDING_MODE";
export const ADD_NEW_BACKGROUND = "ADD_NEW_BACKGROUND";
export const ADD_TEXT_BLOCK = "ADD_TEXT_BLOCK";
export const ADD_BACKGROUND_BLOCK = "ADD_BACKGROUND_BLOCK";
export const DELETE_BLOCK = "DELETE_BLOCK";
export const DELETE_BACKGROUND = "DELETE_BACKGROUND";
export const MOVE_BLOCK = "MOVE_BLOCK";
export const MOVE_BACKGROUND = "MOVE_BACKGROUND";
export const ACTIVATE_PRESET = "ACTIVATE_PRESET";

export const changeBackgroundType = (
  idBlock: number,
  idBG: number,
  toType: string
) => {
  return {
    type: CHANGE_BACKGROUND_TYPE,
    payload: {
      idBlock,
      idBG,
      toType,
    },
  };
};

export const changeBackgroundImage = (idBlock, idBG, toImage) => {
  return {
    type: CHANGE_BACKGROUND_IMAGE,
    payload: {
      idBlock,
      idBG,
      toImage,
    },
  };
};

export const changeBackgroundOption = (idBlock, idBG, value, type) => {
  return {
    type: CHANGE_BACKGROUND_OPTION,
    payload: {
      idBlock,
      idBG,
      value,
      type,
    },
  };
};

export const changeGradient = (idBlock, idBG, value) => {
  return {
    type: CHANGE_GRADIENT,
    payload: {
      idBlock,
      idBG,
      value,
    },
  };
};

export const changeGradientType = (grad, type) => {
  return {
    type: CHANGE_GRADIENT_TYPE,
    payload: {
      grad,
      type,
    },
  };
};

export const changeGradientDirection = (grad, direction) => {
  return {
    type: CHANGE_GRADIENT_DIRECTION,
    payload: {
      grad,
      direction,
    },
  };
};

export const addGradient = (from) => {
  return {
    type: ADD_GRADIENT,
    payload: {
      from,
    },
  };
};

export const updateGradient = (idGrad, value) => {
  return {
    type: UPDATE_GRADIENT,
    payload: {
      idGrad,
      value,
    },
  };
};

export const changeTextOption = (idBlock, value, type) => {
  return {
    type: CHANGE_TEXT_OPTION,
    payload: {
      idBlock,
      value,
      type,
    },
  };
};

export const selectBlendingMode = (idBlock, value) => {
  return {
    type: SELECT_BLENDING_MODE,
    payload: {
      idBlock,
      value,
    },
  };
};

export const addNewBackground = (idBlock) => {
  return {
    type: ADD_NEW_BACKGROUND,
    payload: {
      idBlock,
    },
  };
};

export const addTextBlock = () => {
  return {
    type: ADD_TEXT_BLOCK,
  };
};

export const addBackgroundBlock = () => {
  return {
    type: ADD_BACKGROUND_BLOCK,
  };
};

export const deleteBlock = (idBlock) => {
  return {
    type: DELETE_BLOCK,
    payload: {
      idBlock,
    },
  };
};

export const deleteBackground = (idBlock, idBG) => {
  return {
    type: DELETE_BACKGROUND,
    payload: {
      idBlock,
      idBG,
    },
  };
};

export const moveBlock = (idBlock, direction) => {
  return {
    type: MOVE_BLOCK,
    payload: {
      idBlock,
      direction,
    },
  };
};

export const moveBackground = (idBlock, idBG, direction) => {
  return {
    type: MOVE_BACKGROUND,
    payload: {
      idBlock,
      idBG,
      direction,
    },
  };
};

export const activatePreset = (idPreset) => {
  return {
    type: ACTIVATE_PRESET,
    payload: {
      idPreset,
    },
  };
};
