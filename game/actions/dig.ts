import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { getCell } from "@/helpers/getCell";
import { getNeighbours } from "@/helpers/getNeighbours";
import { isLoseState } from "@/helpers/isLoseState";
import { isWinState } from "@/helpers/isWinState";

export function dig(gameState: GameState, target: Target): GameState {
  let nextGameState = structuredClone(gameState);

  const targetCell = getCell(nextGameState, target);

  switch (targetCell?.state) {
    default:
      return nextGameState;

    case "hidden":
      targetCell.state = "visible";

      if (isWinState(nextGameState)) {
        nextGameState.cells
          .filter((cell) => cell.hasMine)
          .forEach((cell) => {
            cell.state = "flagged";
          });
      }

      if (isLoseState(nextGameState)) {
        nextGameState.cells
          .filter((cell) => cell.state !== "flagged")
          .forEach((cell) => {
            cell.state = "visible";
          });
      }

      if (!targetCell.count) {
        getNeighbours(gameState, targetCell)
          .filter((cell) => !cell.hasMine)
          .forEach((cell) => {
            nextGameState = dig(nextGameState, cell);
          });
      }

      return nextGameState;
  }
}
