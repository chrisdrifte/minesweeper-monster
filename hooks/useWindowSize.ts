import { useEffect, useState } from "react";

export default function useWindowSize() {
  const initialSize = {
    width: 0,
    height: 0,
  };

  const getSize = () => {
    if (typeof window === "undefined") {
      return initialSize;
    }

    return {
      width: window.innerWidth ?? initialSize,
      height: window.innerHeight ?? initialSize,
    };
  };

  const [windowSize, setWindowSize] = useState(initialSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
