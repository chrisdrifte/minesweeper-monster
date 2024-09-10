import { GameState } from "@/types/GameState";

export function isWinState(gameState: GameState) {
  return gameState.cells
    .filter((cell) => !cell.hasMine)
    .every((cell) => cell.state === "visible");
}
