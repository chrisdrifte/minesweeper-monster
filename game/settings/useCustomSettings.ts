import { defaultCustomSettings } from "./defaultCustomSettings";
import { useCookie } from "@/hooks/useCookie";

export function useCustomSettings(
  initialCustomSettings = defaultCustomSettings
) {
  const { value: customSettings, set: setCustomSettings } = useCookie(
    "custom-settings",
    initialCustomSettings
  );

  return {
    customSettings,
    setCustomSettings,
  };
}
