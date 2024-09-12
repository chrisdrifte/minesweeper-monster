import { GameSettings } from "@/types/GameSettings";
import { cookies } from "next/headers";
import { parseJsonString } from "@/helpers/parseJsonString";

export function getCustomSettings(): GameSettings {
  const cookiesStore = cookies();
  const settingsCookie = cookiesStore.get("custom-settings");
  const customSettings = parseJsonString(settingsCookie?.value);

  return customSettings;
}
