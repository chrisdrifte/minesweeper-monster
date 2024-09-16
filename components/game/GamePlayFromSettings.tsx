import { GamePlay, GamePlayProps } from "./GamePlay";

import { GameSettings } from "@/types/GameSettings";
import { createGameState } from "@/helpers/createGameState";
import { useMemo } from "react";

export type GamePlayFromSettingsProps = Omit<
  GamePlayProps,
  "initialGameState"
> & {
  settings: GameSettings;
};

export function GamePlayFromSettings({
  settings,
  ...props
}: GamePlayFromSettingsProps) {
  const initialGameState = useMemo(() => {
    return Object.freeze(createGameState(settings));
  }, [settings]);

  return <GamePlay initialGameState={initialGameState} {...props} />;
}
