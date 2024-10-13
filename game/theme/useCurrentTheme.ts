import { defaultTheme } from "./defaultTheme";
import { themes } from "./themes";
import { useCookie } from "@/hooks/useCookie";
import { useHoliday } from "./useHoliday";

export function useCurrentTheme(initialTheme = defaultTheme) {
  const { value: themeIdFromCookie, set: setThemeId } = useCookie(
    "theme-id",
    initialTheme.id
  );

  let themeId = themeIdFromCookie;

  const { value: disableHolidayTheme, set: setDisableHolidayTheme } = useCookie(
    "disable-holiday-theme",
    initialTheme.id
  );

  // holiday themes
  const holiday = useHoliday();

  if (holiday && disableHolidayTheme !== holiday) {
    themeId = holiday;
  }

  const theme = themes.find((theme) => theme.id === themeId) || defaultTheme;

  return {
    ...theme,
    set: (id: string) => {
      if (holiday) {
        setDisableHolidayTheme(holiday);
      }

      document.querySelector("html")?.setAttribute("data-theme", id);
      setThemeId(id);
    },
  };
}
