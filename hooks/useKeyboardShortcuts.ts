import { useEffect } from "react";

export function useKeyboardShortcuts(
  shortcuts: Record<KeyboardEvent["code"], VoidFunction>
) {
  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      const command = shortcuts[e.code];

      if (typeof command !== "function") {
        return;
      }

      command();
    };

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, [shortcuts]);
}
