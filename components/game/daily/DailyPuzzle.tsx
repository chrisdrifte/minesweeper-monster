"use client";

import { DailySolution } from "./types/DailySolution";
import { GamePlay } from "@/components/game/GamePlay";
import { difficulties } from "@/config/difficulties";
import { getDailySeed } from "./getDailySeed";
import { useDailySolution } from "./useDailySolution";

type DailyPuzzleProps = {
  initialDailySolution?: DailySolution;
};

export function DailyPuzzle({ initialDailySolution }: DailyPuzzleProps) {
  const dailySeed = getDailySeed();
  const dailySolution = useDailySolution(initialDailySolution);

  const tipText =
    "Tip: Come back tomorrow for the next daily minesweeper puzzle";

  if (dailySolution.levelData && dailySolution.seed === dailySeed) {
    return <GamePlay levelData={dailySolution.levelData} tipText={tipText} />;
  }

  return (
    <GamePlay
      settings={{
        seed: dailySeed,
        ...difficulties["daily"],
      }}
      tipText={tipText}
      onWin={dailySolution.setFromGameState}
    />
  );
}
