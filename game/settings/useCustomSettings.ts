import { defaultCustomSettings } from "./defaultCustomSettings";
import { useCookies } from "@/hooks/useCookies";

export function useCustomSettings(
  initialCustomSettings = defaultCustomSettings
) {
  const [customSettings, setCustomSettings] = useCookies(
    "custom-settings",
    initialCustomSettings
  );

  return {
    customSettings,
    setCustomSettings,
  };
}
