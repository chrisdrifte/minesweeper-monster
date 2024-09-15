import { defaultTheme } from "./defaultTheme";
import { themes } from "./themes";
import { useCookies } from "@/hooks/useCookies";

export function useCurrentTheme(initialTheme = defaultTheme) {
  const [themeId, setThemeId] = useCookies("themeId", initialTheme.id);

  const theme = themes.find((theme) => theme.id === themeId) || defaultTheme;

  return {
    ...theme,
    update: setThemeId,
  };
}
