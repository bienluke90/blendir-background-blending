type Background = {
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
