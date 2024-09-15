import { cookies } from "next/headers";
import { defaultTheme } from "./defaultTheme";
import { parseJsonString } from "@/helpers/parseJsonString";
import { themes } from "./themes";

export function getCurrentTheme() {
  const cookiesStore = cookies();
  const themeIdCookie = cookiesStore.get("themeId");
  const themeId = parseJsonString(themeIdCookie?.value);

  return themes.find((theme) => theme.id === themeId) || defaultTheme;
}
