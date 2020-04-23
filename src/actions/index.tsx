export const CHANGE_BACKGROUND_TYPE = "CHANGE_BACKGROUND_TYPE";

export const changeBackgroundType: Function = (
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
