import { useEffect, useRef } from "react";

export const useClickOutside = (
  onClick: () => void,
  listenCapturing = true
) => {
  const ref = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(event.target as Node)
      ) {
        onClick();
      }
    };

    document.addEventListener("click", clickOutsideHandler, listenCapturing);

    return () =>
      document.removeEventListener(
        "click",
        clickOutsideHandler,
        listenCapturing
      );
  }, [ref, onClick, listenCapturing]);

  return ref;
};
