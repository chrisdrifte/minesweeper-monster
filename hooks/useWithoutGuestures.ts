import { useEffect } from "react";

export function useWithoutGestures() {
  useEffect(() => {
    const disable = function (e: Event) {
      e.preventDefault();
    };

    document.addEventListener("gesturestart", disable);
    document.addEventListener("gesturechange", disable);
    document.addEventListener("gestureend", disable);

    return () => {
      document.removeEventListener("gesturestart", disable);
      document.removeEventListener("gesturechange", disable);
      document.removeEventListener("gestureend", disable);
    };
  });
}
