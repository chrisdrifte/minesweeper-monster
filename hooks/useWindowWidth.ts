import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const getWidth = () => window?.innerWidth ?? 0;

  const [windowWidth, setWindowWidth] = useState(getWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}
