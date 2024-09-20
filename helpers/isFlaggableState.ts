import { GameState } from "@/types/GameState";

export function isFlaggableState(gameState: GameState) {
  return gameState.cells.some((cell) => cell.state !== "hidden");
}
