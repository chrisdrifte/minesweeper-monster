import { useEffect, useState } from "react";

const initialSize = {
  width: 0,
  height: 0,
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(initialSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth ?? initialSize,
        height: window.innerHeight ?? initialSize,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
