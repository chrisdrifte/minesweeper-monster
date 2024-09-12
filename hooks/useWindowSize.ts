import { useEffect, useState } from "react";

export default function useWindowSize() {
  const getSize = () => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }

    return {
      width: window.innerWidth ?? 0,
      height: window.innerHeight ?? 0,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
