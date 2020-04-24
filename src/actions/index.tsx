export const CHANGE_BACKGROUND_TYPE = "CHANGE_BACKGROUND_TYPE";
export const CHANGE_BACKGROUND_IMAGE = "CHANGE_BACKGROUND_IMAGE";
export const CHANGE_BACKGROUND_OPTION = "CHANGE_BACKGROUND_OPTION";
export const CHANGE_GRADIENT = "CHANGE_GRADIENT";
export const CHANGE_GRADIENT_TYPE = "CHANGE_GRADIENT_TYPE";
export const CHANGE_GRADIENT_DIRECTION = "CHANGE_GRADIENT_DIRECTION";

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
