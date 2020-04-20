type Background = {
  id: number;
  type: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  backgroundImage?: string;
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
};

type Preset = {
  id: number;
  blocks: Block[];
};

type Gradient = {
  id: number;
  active: boolean;
  backgroundImage: string;
};
