import { defaultTheme } from "./defaultTheme";
import { themes } from "./themes";
import { useCookie } from "@/hooks/useCookie";

export function useCurrentTheme(initialTheme = defaultTheme) {
  const { value: themeId, set: setThemeId } = useCookie(
    "theme-id",
    initialTheme.id
  );

  const theme = themes.find((theme) => theme.id === themeId) || defaultTheme;

  return {
    ...theme,
    set: setThemeId,
  };
}
