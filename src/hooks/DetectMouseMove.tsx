import React, { useEffect } from "react";

const DetectMouseMove = (
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let timeout = 0;

  const listener = () => {
    if (timeout) {
      clearTimeout(timeout);
      return;
    }
    setHidden(false);
    timeout = setTimeout(() => {
      setHidden(true);
    }, 2500);
  };

  useEffect(() => {
    document.addEventListener("mousemove", listener);

    return () => {
      document.removeEventListener("mousemove", listener);
    };
  });
};

export default DetectMouseMove;
