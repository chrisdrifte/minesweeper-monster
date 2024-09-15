"use client";

import { GamePlay } from "@/components/game/GamePlay";
import { GameSettings } from "@/types/GameSettings";
import { useCustomSettings } from "@/game/settings/useCustomSettings";

export type CustomGameClientProps = {
  initialCustomSettings: GameSettings;
};

export default function CustomGameClient({
  initialCustomSettings,
}: CustomGameClientProps) {
  const { customSettings } = useCustomSettings(initialCustomSettings);

  return (
    <GamePlay
      settings={customSettings}
      settingsHref="/play/custom/settings"
      tipText="Tip: This mode is fully customizable by editing the settings"
      showRestart
    />
  );
}
