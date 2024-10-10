"use client";

import { DailySolution } from "./types/DailySolution";
import { GamePlayFromLevelData } from "../GamePlayFromLevelData";
import { GamePlayFromSettings } from "../GamePlayFromSettings";
import { difficulties } from "@/config/difficulties";
import { getDailySeed } from "./getDailySeed";
import { getYYYYMMDD } from "@/helpers/getYYYYMMDD";
import { track } from "@vercel/analytics";
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
    return (
      <GamePlayFromLevelData
        gameModeKey="daily-solution"
        levelData={dailySolution.levelData}
        tipText={tipText}
      />
    );
  }

  return (
    <GamePlayFromSettings
      gameModeKey="daily"
      settings={{
        seed: dailySeed,
        ...difficulties["daily"],
      }}
      tipText={tipText}
      onWin={(gameState) => {
        dailySolution.setFromGameState(gameState);
        track("DailyPuzzleSolved", { date: getYYYYMMDD() });
      }}
    />
  );
}
