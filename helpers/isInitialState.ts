import { GameState } from "@/types/GameState";

export function isInitialState(gameState: GameState) {
  return gameState.cells.every((cell) => cell.state === "hidden");
}
