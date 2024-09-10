import { GameState } from "@/types/GameState";

export function selectDig(gameState: GameState): GameState {
  const nextGameState = structuredClone(gameState);

  nextGameState.action = "dig";

  return nextGameState;
}
