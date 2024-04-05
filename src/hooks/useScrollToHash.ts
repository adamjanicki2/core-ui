import { useEffect } from "react";

/**
 * A hook for scrolling to the hash in the URL.
 */
const useScrollToHash = () => {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      try {
        const element = document.querySelector(hash);
        element?.scrollIntoView();
      } catch {
        return;
      }
    }
  }, []);
};

export default useScrollToHash;
