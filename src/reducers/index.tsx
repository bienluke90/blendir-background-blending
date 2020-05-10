import {
  CHANGE_BACKGROUND_TYPE,
  CHANGE_BACKGROUND_IMAGE,
  CHANGE_BACKGROUND_OPTION,
  CHANGE_GRADIENT,
  CHANGE_GRADIENT_TYPE,
  CHANGE_GRADIENT_DIRECTION,
  ADD_GRADIENT,
  UPDATE_GRADIENT,
  CHANGE_TEXT_OPTION,
  SELECT_BLENDING_MODE,
  ADD_NEW_BACKGROUND,
  ADD_TEXT_BLOCK,
  ADD_BACKGROUND_BLOCK,
  DELETE_BLOCK,
  DELETE_BACKGROUND,
  MOVE_BLOCK,
  MOVE_BACKGROUND,
  ACTIVATE_PRESET,
  REMOVE_PRESET,
  ADD_PRESET,
} from "./../actions/index";

const gradients = [
  {
    id: 0,
    backgroundImage:
      "linear-gradient(0deg, rgba(185,0,0,0.5) 0%, rgba(0,0,0,1) 50%, rgba(0,212,255,0.5) 100%)",
  },
  {
    id: 1,
    backgroundImage:
      "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(0,0,0,0.6) 50%, rgba(252,176,69,1) 100%)",
  },
  {
    id: 2,
    backgroundImage:
      "linear-gradient(90deg, rgba(180,58,58,1) 0%, rgba(0,0,0,1) 50%, rgba(245,255,0,1) 100%)",
  },
  {
    id: 3,
    backgroundImage:
      "linear-gradient(45deg, rgba(0,0,0,1) 12%, rgba(180,58,58,1) 29%, rgba(85,0,255,1) 100%)",
  },
  {
    id: 4,
    backgroundImage:
      "linear-gradient(135deg, rgba(0,0,0,0.5) 12%, rgba(58,179,180,1) 50%, rgba(85,0,255,1) 86%)",
  },
  {
    id: 5,
    backgroundImage:
      "linear-gradient(0deg, rgba(207,210,83,1) 0%, rgba(236,255,0,1) 34%, rgba(195,152,43,1) 67%, rgba(21,0,180,1) 86%)",
  },
  {
    id: 6,
    backgroundImage:
      "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,164,255,1) 47%, rgba(195,152,43,1) 50%, rgba(180,124,0,1) 100%)",
  },
  {
    id: 7,
    backgroundImage:
      "radial-gradient(circle, rgba(130,242,255,1) 22%, rgba(70,252,128,0.6) 75%, rgba(2,159,142,0.4) 80%)",
  },
  {
    id: 8,
    backgroundImage:
      "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(245,255,0,0.5) 50%, rgba(136,0,255,1) 100%)",
  },
  {
    id: 9,
    backgroundImage:
      "linear-gradient(90deg, rgba(34,193,95,1) 0%, rgba(150,253,145,1) 100%)",
  },
  {
    id: 10,
    backgroundImage:
      "radial-gradient(circle, rgba(223,255,207,0.5) 0%, rgba(92,136,74,0.5) 100%)",
  },
];
const preset1 = {
  id: 0,
  name: "ABC Solutions company",
  blocks: [
    {
      id: 0,
      type: "background",
      backgrounds: [
        {
          id: 0,
          type: "image",
          backgroundImage: 'url("https://svgsilh.com/svg/1327960.svg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        },
        {
          id: 1,
          type: "gradient",
          backgroundImage: 9,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "50% 50%",
        },
      ],
      blendMode: "overlay",
    },
    {
      id: 1,
      type: "background",
      backgrounds: [
        {
          id: 0,
          type: "gradient",
          backgroundImage: 10,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center center",
        },
      ],
      blendMode: "normal",
    },
    {
      id: 2,
      type: "text",
      text: "Welcome to ABC Solutions",
      color: "rgba(0, 40, 0, 0.66)",
      fontSize: "7.5rem",
      fontWeight: "bold",
      fontStyle: "normal",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  ],
};

const preset2 = {
  id: 1,
  name: "Wingify airlines brand",
  blocks: [
    {
      id: 0,
      type: "background",
      backgrounds: [
        {
          id: 0,
          type: "image",
          backgroundImage: 'url("https://svgsilh.com/svg/1740459-03a9f4.svg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        },
        {
          id: 1,
          type: "gradient",
          backgroundImage: 0,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "50% 50%",
        },
      ],
      blendMode: "overlay",
    },
    {
      id: 2,
      type: "text",
      text: "Welcome to Wingify Airlines",
      color: "rgba(235, 255, 255, 0.85)",
      fontSize: "7.5rem",
      fontWeight: "bold",
      fontStyle: "normal",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  ],
};

const initialState = {
  presets: [preset1, preset2],
  currentPreset: preset1,
  gradients,
};

interface reducerStateProps {
  presets: Preset[];
  currentPreset: Preset;
  gradients: Gradient[];
}

interface actionProps {
  type: string;
  payload: any;
}

const rootReducer = (
  state: reducerStateProps = initialState,
  action: actionProps
): reducerStateProps => {
  switch (action.type) {
    case CHANGE_BACKGROUND_TYPE:
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: state.currentPreset.blocks.map((b) => {
            const block = b;
            if (block.id === action.payload.idBlock) {
              block.backgrounds!.map((b) => {
                const bg = b;
                if (
                  bg.id === action.payload.idBG &&
                  action.payload.toType === "image" &&
                  bg.type === "gradient"
                ) {
                  bg.type = action.payload.toType;
                  bg.backgroundImage = "";
                  bg.backgroundRepeat = "no-repeat";
                  bg.backgroundSize = "cover";
                  bg.backgroundPosition = "50% 50%";
                }
                if (
                  bg.id === action.payload.idBG &&
                  action.payload.toType === "gradient" &&
                  bg.type === "image"
                ) {
                  bg.type = action.payload.toType;
                  bg.backgroundImage = 0;
                  bg.backgroundRepeat = "no-repeat";
                  bg.backgroundSize = "cover";
                  bg.backgroundPosition = "50% 50%";
                }
                return bg;
              });
            }
            return block;
          }),
        },
      };
    case CHANGE_BACKGROUND_IMAGE:
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: state.currentPreset.blocks.map((b) => {
            const block = b;
            if (block.id === action.payload.idBlock) {
              block.backgrounds!.map((b) => {
                const bg = b;
                if (bg.id === action.payload.idBG) {
                  bg.backgroundImage = `url('${action.payload.toImage}')`;
                }
                return bg;
              });
            }
            return block;
          }),
        },
      };
    case CHANGE_GRADIENT:
      let blocks = state.currentPreset.blocks.slice(0);
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: [
            ...blocks.map((b) => {
              if (b.id !== action.payload.idBlock) {
                return b;
              }
              let bl = { ...b };
              let bgs = bl.backgrounds!.slice(0);
              bl.backgrounds = [
                ...bgs.map((b) => {
                  if (b.id !== action.payload.idBG) {
                    return b;
                  }
                  return { ...b, backgroundImage: action.payload.value };
                }),
              ];
              return bl;
            }),
          ],
        },
      };
    case ADD_GRADIENT:
      return {
        ...state,
        gradients: [
          ...state.gradients,
          {
            id:
              state.gradients.reduce((a, c) => {
                return a > c.id ? a : c.id;
              }, 0) + 1,
            backgroundImage:
              state.gradients[action.payload.from].backgroundImage,
          },
        ],
      };
    case UPDATE_GRADIENT:
      const gradients = state.gradients.slice(0);
      return {
        ...state,
        gradients: [
          ...gradients.map((g) => {
            if (g.id !== action.payload.idGrad) {
              return g;
            }
            return {
              id: g.id,
              backgroundImage: action.payload.value,
            };
          }),
        ],
      };
    case CHANGE_BACKGROUND_OPTION:
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: state.currentPreset.blocks.map((b) => {
            const block = b;
            if (block.id === action.payload.idBlock) {
              block.backgrounds!.map((b) => {
                const bg = b;
                if (bg.id === action.payload.idBG) {
                  bg[action.payload.type] = action.payload.value;
                }
                return bg;
              });
            }
            return block;
          }),
        },
      };
    case CHANGE_TEXT_OPTION:
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: state.currentPreset.blocks.map((b) => {
            const block = b;
            if (block.id === action.payload.idBlock) {
              block[action.payload.type] = action.payload.value;
            }
            return block;
          }),
        },
      };
    case CHANGE_GRADIENT_TYPE:
      return {
        ...state,
        gradients: state.gradients.map((g) => {
          let grad = g;
          if (
            grad.id === action.payload.grad &&
            action.payload.type === "linear-gradient"
          ) {
            grad.backgroundImage = grad.backgroundImage.replace(
              /radial-gradient\(\s?circle\s?/,
              `${action.payload.type}(0deg`
            );
          }
          if (
            grad.id === action.payload.grad &&
            action.payload.type === "radial-gradient"
          ) {
            grad.backgroundImage = grad.backgroundImage.replace(
              /linear-gradient\(\s?\d+deg\s?/,
              `${action.payload.type}(circle`
            );
          }
          return grad;
        }),
      };
    case CHANGE_GRADIENT_DIRECTION:
      const withDirection = state.gradients.slice(0);
      return {
        ...state,
        gradients: withDirection.map((g) => {
          if (g.id !== action.payload.grad + 1) {
            return g;
          }
          return {
            id: g.id,
            backgroundImage: g.backgroundImage.replace(
              /linear-gradient\(\s?\d+\s?/,
              `linear-gradient(${action.payload.direction}`
            ),
          };
        }),
      };
    case SELECT_BLENDING_MODE:
      const withMode = state.currentPreset.blocks.slice(0);
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withMode.map((b) => {
            const block = b;
            if (block.id === action.payload.idBlock) {
              block.blendMode = action.payload.value;
            }
            return block;
          }),
        },
      };
    case ADD_NEW_BACKGROUND:
      let withNewBg = state.currentPreset.blocks.slice(0);
      withNewBg = withNewBg.map((b) => {
        const block = b;
        if (block.id === action.payload.idBlock) {
          block.backgrounds = [
            {
              id: -1,
              type: "gradient",
              backgroundImage: 0,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            },
            ...block.backgrounds?.map((b, i) => {
              const bg = b;
              bg.id = bg.id + 1;
              return bg;
            }),
          ];
        }
        return block;
      });
      withNewBg = withNewBg.map((b, i) => {
        const bg = b;
        bg.id = i;
        return bg;
      });
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withNewBg,
        },
      };
    case ADD_TEXT_BLOCK:
      let withNewTextBlock = state.currentPreset.blocks.slice(0);
      withNewTextBlock = [
        {
          id: 1,
          type: "text",
          text: "",
          color: "rgba(255, 255, 255, 1)",
          fontSize: "5rem",
          fontWeight: "normal",
          fontStyle: "normal",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        },
        ...withNewTextBlock.map((b) => {
          const block = b;
          block.id = block.id + 1;
          return block;
        }),
      ];
      withNewTextBlock = withNewTextBlock.map((b, i) => {
        const bl = b;
        bl.id = i;
        return bl;
      });
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withNewTextBlock,
        },
      };
    case ADD_BACKGROUND_BLOCK:
      let withNewBgBlock = state.currentPreset.blocks.slice(0);
      withNewBgBlock = [
        {
          id: 1,
          type: "background",
          backgrounds: [],
          blendMode: "normal",
        },
        ...withNewBgBlock.map((b) => {
          const block = b;
          block.id = block.id + 1;
          return block;
        }),
      ];
      withNewBgBlock = withNewBgBlock.map((b, i) => {
        const bl = b;
        bl.id = i;
        return bl;
      });
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withNewBgBlock,
        },
      };
    case DELETE_BLOCK:
      let withDeleteBlock = state.currentPreset.blocks.slice(0);
      withDeleteBlock = withDeleteBlock.filter(
        (b) => b.id !== action.payload.idBlock
      );
      withDeleteBlock = withDeleteBlock.map((b, i) => {
        const bl = b;
        bl.id = i;
        return bl;
      });
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withDeleteBlock,
        },
      };
    case DELETE_BACKGROUND:
      const withDeleteBG = state.currentPreset.blocks.slice(0);
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withDeleteBG.map((b) => {
            const block = b;
            if (block.id === action.payload.idBlock) {
              block.backgrounds = block.backgrounds!.filter(
                (b) => b.id !== action.payload.idBG
              );
              block.backgrounds = block.backgrounds.map((b, i) => {
                const bg = b;
                bg.id = i;
                return bg;
              });
            }
            return block;
          }),
        },
      };
    case MOVE_BLOCK:
      let withSwappedBlock = state.currentPreset.blocks.slice(0);
      const temp =
        withSwappedBlock[action.payload.idBlock + action.payload.direction];
      withSwappedBlock[action.payload.idBlock + action.payload.direction] =
        withSwappedBlock[action.payload.idBlock];
      withSwappedBlock[action.payload.idBlock] = temp;
      console.log(withSwappedBlock);
      withSwappedBlock = withSwappedBlock.map((b, i) => {
        const bl = b;
        bl.id = i;
        return bl;
      });
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withSwappedBlock,
        },
      };

    case MOVE_BACKGROUND:
      let withSwappedBgBlock = state.currentPreset.blocks.slice(0);
      withSwappedBgBlock = withSwappedBgBlock.map((b) => {
        const bl = b;
        if (b.id === action.payload.idBlock) {
          const temp = bl.backgrounds![action.payload.idBG];
          bl.backgrounds![action.payload.idBG] = bl.backgrounds![
            action.payload.idBG + action.payload.direction
          ];
          bl.backgrounds![
            action.payload.idBG + action.payload.direction
          ] = temp;

          bl.backgrounds = bl.backgrounds!.map((b, i) => {
            const bg = b;
            bg.id = i;
            return bg;
          });
        }
        return bl;
      });
      return {
        ...state,
        currentPreset: {
          ...state.currentPreset,
          blocks: withSwappedBgBlock,
        },
      };
    case ACTIVATE_PRESET:
      return {
        ...state,
        currentPreset: state.presets[action.payload.idPreset],
      };
    case REMOVE_PRESET:
      let withRemovedPreset = state.presets
        .slice(0)
        .filter((p) => p.id !== action.payload.idPreset);
      withRemovedPreset = withRemovedPreset.map((p, i) => {
        const pr = p;
        p.id = i;
        return pr;
      });
      return {
        ...state,
        presets: withRemovedPreset,
        currentPreset: withRemovedPreset[0],
      };
    case ADD_PRESET:
      let withAddedPreset = state.presets.slice(0);
      let presetToAdd = {
        id: -1,
        name: action.payload.name,
        blocks: [
          {
            id: 2,
            type: "text",
            text: action.payload.name,
            color: "rgba(0, 0, 0, 1)",
            fontSize: "5rem",
            fontWeight: "bold",
            fontStyle: "normal",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          },
        ],
      };
      withAddedPreset = [presetToAdd, ...withAddedPreset];
      withAddedPreset = withAddedPreset.map((p, i) => {
        const pr = p;
        pr.id = i;
        return pr;
      });
      return {
        ...state,
        presets: withAddedPreset,
        currentPreset: withAddedPreset[0],
      };
    default:
      return state;
  }
};

export default rootReducer;
