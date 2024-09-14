import { GameSettings } from "@/types/GameSettings";
import { GameState } from "@/types/GameState";
import { loadGameState } from "./loadGameState";

export function createGameState(settings: GameSettings): GameState {
  const width = Math.min(settings.width, 30);
  const height = Math.min(settings.height, 30);

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
