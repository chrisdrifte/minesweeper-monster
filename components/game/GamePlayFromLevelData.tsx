import { GamePlay, GamePlayProps } from "./GamePlay";

import { GameSettings } from "@/types/GameSettings";
import { loadGameState } from "@/helpers/loadGameState";
import { useMemo } from "react";

export type GamePlayFromLevelDataProps = Omit<
  GamePlayProps,
  "initialGameState"
> & {
  levelData: string;
  settings?: Omit<GameSettings, "width" | "height" | "numMines">;
};

export function GamePlayFromLevelData({
  levelData,
  settings,
  ...props
}: GamePlayFromLevelDataProps) {
  const initialGameState = useMemo(() => {
    return Object.freeze(loadGameState(levelData, settings));
  }, [levelData, settings]);

  return <GamePlay initialGameState={initialGameState} {...props} />;
}
