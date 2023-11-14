import { useRef } from "react";

type ScrollLock = {
  lock: () => void;
  unlock: () => void;
};

/**
 * A hook for locking and unlocking the scroll position.
 *
 * @returns callback functions for locking and unlocking the scroll position
 */
const useScrollLock = (): ScrollLock => {
  const returnTo = useRef(0);

  const lock = () => {
    const scrollY = window.scrollY;
    returnTo.current = scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = "fixed";
  };

  const unlock = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, returnTo.current);
  };

  return { lock, unlock };
};

export default useScrollLock;
