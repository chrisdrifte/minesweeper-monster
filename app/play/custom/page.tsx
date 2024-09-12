import CustomGameClient from "./CustomGameClient";
import { getCustomSettings } from "@/game/settings/getCustomSettings";

export default async function CustomGamePage() {
  const initialCustomSettings = getCustomSettings();

  return <CustomGameClient initialCustomSettings={initialCustomSettings} />;
}
