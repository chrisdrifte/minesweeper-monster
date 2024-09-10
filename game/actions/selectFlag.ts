import { GameState } from "@/types/GameState";

export function selectFlag(gameState: GameState): GameState {
  const nextGameState = structuredClone(gameState);

  nextGameState.action = "flag";

  return nextGameState;
}
