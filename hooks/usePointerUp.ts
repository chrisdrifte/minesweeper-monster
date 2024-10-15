"use client";

import { useEffect } from "react";

export function usePointerUp(fn: VoidFunction) {
  useEffect(() => {
    document.documentElement.addEventListener("pointerup", fn);

    return () => {
      document.documentElement.removeEventListener("pointerup", fn);
    };
  });
}
