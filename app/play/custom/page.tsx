import GamePlayFromCustomSettings from "@/components/game/GamePlayFromCustomSettings";
import { getCustomSettings } from "@/game/settings/getCustomSettings";

export default async function CustomGamePage() {
  const initialCustomSettings = getCustomSettings();

  return (
    <GamePlayFromCustomSettings initialCustomSettings={initialCustomSettings} />
  );
}
