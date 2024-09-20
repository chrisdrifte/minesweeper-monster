import { GameState } from "@/types/GameState";
import { isFlaggableState } from "@/helpers/isFlaggableState";

export function selectFlag(gameState: GameState): GameState {
  const isFlaggable = isFlaggableState(gameState);

  if (!isFlaggable) {
    return gameState;
  }

  const nextGameState = structuredClone(gameState);

  nextGameState.action = "flag";

  return nextGameState;
}
