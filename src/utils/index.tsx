export const handleBgPositionChange = (isX: number, initial: string) => {
  const v = { x: initial.split(" ")[0], y: initial.split(" ")[1] };
  if (isX === 0) {
    switch (v.x) {
      case "center":
        v.x = "left";
        break;
      case "left":
        v.x = "right";
        break;
      case "right":
        v.x = "center";
        break;
      default:
        v.x = "center";
        break;
    }
  }
  if (isX === 1) {
    switch (v.y) {
      case "center":
        v.y = "top";
        break;
      case "top":
        v.y = "bottom";
        break;
      case "bottom":
        v.y = "center";
        break;
      default:
        v.y = "center";
        break;
    }
  }
  return `${v.x} ${v.y}`;
};

export const handleScrollBlock = (to) => {
  const el = document.getElementById("main-document");
  if (to) {
    el?.classList.add("scroll-block");
  }
  if (!to) {
    el?.classList.remove("scroll-block");
  }
};
