import { GameSettings } from "@/types/GameSettings";
import { GameState } from "@/types/GameState";
import { board } from "@/config/board";
import { loadGameState } from "./loadGameState";

export function createGameState(settings: GameSettings): GameState {
  const width = Math.min(settings.width, board.maxWidth);
  const height = Math.min(settings.height, board.maxHeight);

  const levelData = `${"X".repeat(width)}\n`.repeat(height);
  const emptyGameState = loadGameState(levelData);

  return {
    ...emptyGameState,
    ...settings,
    // avoid hitting timeouts on the vercel free plan
    width,
    height,
  };
}
