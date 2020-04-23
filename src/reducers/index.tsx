import { CHANGE_BACKGROUND_TYPE } from "./../actions/index";

const gradients = [
  {
    id: 1,
    backgroundImage:
      "linear-gradient(0deg, rgba(185,0,0,0.5) 0%, rgba(0,0,0,1) 50%, rgba(0,212,255,0.5) 100%)",
  },
  {
    id: 2,
    backgroundImage:
      "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(0,0,0,0.6) 50%, rgba(252,176,69,1) 100%)",
  },
  {
    id: 3,
    backgroundImage:
      "linear-gradient(90deg, rgba(180,58,58,1) 0%, rgba(0,0,0,1) 50%, rgba(245,255,0,1) 100%)",
  },
  {
    id: 4,
    backgroundImage:
      "linear-gradient(45deg, rgba(0,0,0,1) 12%, rgba(180,58,58,1) 29%, rgba(85,0,255,1) 100%)",
  },
  {
    id: 5,
    backgroundImage:
      "linear-gradient(135deg, rgba(0,0,0,0.5) 12%, rgba(58,179,180,1) 50%, rgba(85,0,255,1) 86%)",
  },
  {
    id: 6,
    backgroundImage:
      "linear-gradient(0deg, rgba(207,210,83,1) 0%, rgba(236,255,0,1) 34%, rgba(195,152,43,1) 67%, rgba(21,0,180,1) 86%)",
  },
  {
    id: 7,
    backgroundImage:
      "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,164,255,1) 47%, rgba(195,152,43,1) 50%, rgba(180,124,0,1) 100%)",
  },
  {
    id: 8,
    backgroundImage:
      "radial-gradient(circle, rgba(130,242,255,1) 22%, rgba(70,252,128,0.6) 75%, rgba(2,159,142,0.4) 80%)",
  },
  {
    id: 9,
    backgroundImage:
      "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(245,255,0,0.5) 50%, rgba(136,0,255,1) 100%)",
  },
  {
    id: 10,
    backgroundImage:
      "linear-gradient(90deg, rgba(34,193,95,1) 0%, rgba(150,253,145,1) 100%)",
  },
  {
    id: 11,
    backgroundImage:
      "radial-gradient(circle, rgba(223,255,207,0.5) 0%, rgba(92,136,74,0.5) 100%)",
  },
];
const preset1 = {
  id: 1,
  blocks: [
    {
      id: 1,
      type: "background",
      backgrounds: [
        {
          id: 1,
          type: "image",
          backgroundImage: 'url("https://svgsilh.com/svg/1327960.svg")',
          backgroundSize: "80% 80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        },
        {
          id: 2,
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
      id: 2,
      type: "background",
      backgrounds: [
        {
          id: 1,
          type: "gradient",
          backgroundImage: 10,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center center",
        },
      ],
    },
    {
      id: 3,
      type: "text",
      text: "Welcome to ABC Solutions",
      color: "rgba(0, 40, 0, 0.66)",
      fontSize: "10rem",
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
  presets: [preset1],
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
                  bg.backgroundSize = "contain";
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
    default:
      return state;
  }
};

export default rootReducer;
