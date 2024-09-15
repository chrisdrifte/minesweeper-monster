import { Theme } from "./types/Theme";
import { defaultTheme } from "./defaultTheme";

export const themes: Theme[] = [
  defaultTheme,
  { id: "dark-high-contrast", name: "Dark High Contrast" },
  { id: "retro-monochrome", name: "Retro Monochrome" },
];
