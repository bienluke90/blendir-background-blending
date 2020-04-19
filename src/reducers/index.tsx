import { cover } from "polished";

const preset1 = {
  id: 1,
  blocks: [
    {
      id: 2,
      type: "background",
      backgrounds: [
        {
          id: 1,
          backgroundImage: 'url("https://svgsilh.com/svg/1327960.svg")',
          backgroundSize: "40%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        },
        {
          id: 2,
          backgroundImage:
            "linear-gradient(90deg, rgba(34,193,95,1) 0%, rgba(150,253,145,1) 100%)",
          backgroundSize: "20%",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        },
      ],
      blendMode: "overlay",
    },
    {
      id: 1,
      type: "background",
      backgrounds: [
        {
          backgroundImage:
            "radial-gradient(circle, rgba(223,255,207,0.5) 0%, rgba(92,136,74,0.5) 100%)",
        },
      ],
    },
    {
      id: 3,
      type: "text",
      text: "Welcome to ABC Solutions",
      fontSize: "10rem",
    },
  ],
};

const initialState = {
  presets: [preset1],
  currentPreset: preset1,
};

interface reducerStateProps {
  presets: Preset[];
  currentPreset: Preset | {};
}

interface actionProps {
  type: String;
  payload: {};
}

const rootReducer = (
  state: reducerStateProps = initialState,
  action: actionProps
): reducerStateProps => {
  return state;
};

export default rootReducer;
