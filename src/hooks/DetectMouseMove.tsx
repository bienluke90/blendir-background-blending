import React, { useEffect } from "react";

let timeout;

const DetectMouseMove = (
  setHidden: React.Dispatch<React.SetStateAction<boolean>>,
  isPlayground: boolean
) => {
  let listener = () => {
    return;
  };

  if (isPlayground) {
    listener = () => {
      setHidden(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setHidden(true);
      }, 2000);
      return;
    };
  }

  useEffect(() => {
    document.addEventListener("mousemove", listener);
    clearTimeout(timeout);
    return () => {
      document.removeEventListener("mousemove", listener);
      clearTimeout(timeout);
    };
  });
};

export default DetectMouseMove;
