import { cookies } from "next/headers";
import { defaultTheme } from "./defaultTheme";
import { parseJsonString } from "@/helpers/parseJsonString";
import { themes } from "./themes";
import { useHoliday } from "./useHoliday";

export function getCurrentTheme() {
  const cookiesStore = cookies();

  const themeIdCookie = cookiesStore.get("theme-id");
  let themeId = parseJsonString(themeIdCookie?.value);

  const disableHolidayThemeCookie = cookiesStore.get("disable-holiday-theme");
  const disableHolidayTheme = disableHolidayThemeCookie?.value;

  const holiday = useHoliday();

  if (holiday && disableHolidayTheme !== holiday) {
    themeId = holiday;
  }

  return themes.find((theme) => theme.id === themeId) || defaultTheme;
}
