"use client";

import GamePlayWithRestart from "@/components/game/GamePlayWithRestart";
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
    <GamePlayWithRestart
      settings={customSettings}
      settingsHref="/play/custom/settings"
    />
  );
}
