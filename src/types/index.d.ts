type Background = {
  id: number;
  type: string;
  backgroundImage: string | number;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundColor?: string;
};

type Block = {
  id: number;
  type: string;
  blendMode?: string;
  backgrounds?: Background[];
  text?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  top?: string;
  left?: string;
  transform?: string;
  textAlign?: string;
};

type Preset = {
  id: number;
  blocks: Block[];
};

type Gradient = {
  id: number;
  backgroundImage: string;
};
