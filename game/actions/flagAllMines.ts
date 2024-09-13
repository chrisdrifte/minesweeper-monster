import { GameState } from "@/types/GameState";

export function flagAllMines(gameState: GameState) {
  const nextGameState = structuredClone(gameState);

  nextGameState.cells
    .filter((cell) => cell.hasMine)
    .forEach((cell) => {
      cell.state = "flagged";
    });

  return nextGameState;
}
