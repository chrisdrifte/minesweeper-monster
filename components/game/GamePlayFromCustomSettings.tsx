"use client";

import { GamePlayFromSettings } from "@/components/game/GamePlayFromSettings";
import { GameSettings } from "@/types/GameSettings";
import { useCustomSettings } from "@/game/settings/useCustomSettings";

export type CustomGameClientProps = {
  initialCustomSettings: GameSettings;
};

export default function GamePlayFromCustomSettings({
  initialCustomSettings,
}: CustomGameClientProps) {
  const { customSettings } = useCustomSettings(initialCustomSettings);

  return (
    <GamePlayFromSettings
      settings={customSettings}
      settingsHref="/play/custom/settings"
      tipText="Tip: This mode is fully customizable by editing the settings"
      showRestart
    />
  );
}
