import { DailySolution } from "./types/DailySolution";
import { GameState } from "@/types/GameState";
import { toLevelData } from "@/helpers/toLevelData";
import { useCookie } from "@/hooks/useCookie";

export function useDailySolution(initialDailySolution?: DailySolution) {
  const { value: dailySolution, set: setDailySolutionCookie } = useCookie(
    "daily-solution",
    initialDailySolution
  );

  const setFromGameState = (gameState: GameState) => {
    if (!gameState.seed) {
      throw new Error("Daily solution must have a seed");
    }

    setDailySolutionCookie({
      seed: gameState.seed,
      levelData: toLevelData(gameState),
    });
  };

  return { ...dailySolution, setFromGameState };
}
