import { Theme } from "./types/Theme";
import { defaultTheme } from "./defaultTheme";

export const themes: Theme[] = [
  defaultTheme,
  { id: "dark-oled", name: "Dark OLED" },
  { id: "retro-monochrome", name: "Retro Monochrome" },
];
