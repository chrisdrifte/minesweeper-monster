import { GameSettings } from "@/types/GameSettings";
import { GameState } from "@/types/GameState";
import { loadGameState } from "./loadGameState";

export function createGameState(settings: GameSettings): GameState {
  const levelData = `${"X".repeat(settings.width)}\n`.repeat(settings.height);
  const emptyGameState = loadGameState(levelData);

  return {
    ...emptyGameState,
    showTimer: settings.showTimer,
    numMines: settings.numMines,
    safeFirstClick: settings.safeFirstClick,
    revealContiguousNumbers: settings.revealContiguousNumbers,
  };
}
