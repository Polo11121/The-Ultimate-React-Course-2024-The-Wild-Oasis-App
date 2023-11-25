import { useEffect, useRef } from "react";

export const useClickOutside = (
  onClick: () => void,
  listenCapturing = true
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
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
