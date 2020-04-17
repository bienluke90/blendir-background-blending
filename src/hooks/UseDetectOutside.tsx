import React, { useEffect } from "react";

const UseDetectOutside: (
  ref: React.MutableRefObject<HTMLElement>,
  handleDetect: React.Dispatch<React.SetStateAction<boolean>>
) => void = (ref, handleDetect) => {
  const listener = (e: Event) => {
    if (!ref.current || ref.current.contains(e.target as HTMLDivElement)) {
      return;
    }
    handleDetect(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
};

export default UseDetectOutside;
