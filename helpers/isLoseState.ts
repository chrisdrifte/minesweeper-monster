import { GameState } from "@/types/GameState";

export function isLoseState(gameState: GameState) {
  return gameState.cells
    .filter((cell) => cell.hasMine)
    .some((cell) => cell.state === "visible");
}
