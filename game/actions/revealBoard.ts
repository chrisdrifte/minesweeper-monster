import { GameState } from "@/types/GameState";

export function revealBoard(gameState: GameState) {
  const nextGameState = structuredClone(gameState);

  nextGameState.cells
    .filter((cell) => cell.hasMine)
    .forEach((cell) => {
      cell.state = "visible";
    });

  return nextGameState;
}
