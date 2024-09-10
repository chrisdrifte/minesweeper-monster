import { GameState } from "@/types/GameState";

export function isWinState(gameState: GameState) {
  return (
    // all cells without mines are visible
    gameState.cells
      .filter((cell) => !cell.hasMine)
      .every((cell) => cell.state === "visible") &&
    // no cells with mines are visible
    !gameState.cells
      .filter((cell) => cell.hasMine)
      .some((cell) => cell.state === "visible")
  );
}
