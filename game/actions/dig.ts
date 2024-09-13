import { Cell } from "@/types/Cell";
import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { flagAllMines } from "./flagAllMines";
import { getCell } from "@/helpers/getCell";
import { getHorizontalNeighbours } from "@/helpers/getHorizontalNeighbours";
import { getNeighbours } from "@/helpers/getNeighbours";
import { isLoseState } from "@/helpers/isLoseState";
import { isWinState } from "@/helpers/isWinState";
import { revealBoard } from "./revealBoard";

export function dig(gameState: GameState, target: Target): GameState {
  let nextGameState = structuredClone(gameState);

  const targetCell = getCell(nextGameState, target);

  switch (targetCell?.state) {
    default:
      return nextGameState;

    case "visible":
      if (!targetCell.count) {
        return nextGameState;
      }

      // clicking a visible cells surrounded by the correct number of flags
      // automatically digs all the unrevealed cells around it
      // this is known as "chording" in classic minesweeper, because it used
      // to require the user to click both the left and right buttons
      const neighbours = getNeighbours(gameState, target);
      const numFlags = neighbours.filter(
        (cell) => cell.state === "flagged"
      ).length;

      if (numFlags && targetCell.count === numFlags) {
        return neighbours
          .filter((cell) => cell.state === "hidden")
          .reduce(
            (nextGameState, cell) => dig(nextGameState, cell),
            nextGameState
          );
      }

    case "hidden":
      targetCell.state = "visible";

      if (isWinState(nextGameState)) {
        return flagAllMines(nextGameState);
      }

      if (isLoseState(nextGameState)) {
        return revealBoard(nextGameState);
      }

      if (!targetCell.count) {
        getNeighbours(gameState, targetCell)
          .filter((cell) => !cell.hasMine)
          .forEach((cell) => {
            nextGameState = dig(nextGameState, cell);
          });
      }

      if (targetCell.count && gameState.revealContiguousNumbers) {
        const recursiveReveal = (targetCell: Cell) => {
          targetCell.state = "visible";

          getHorizontalNeighbours(gameState, targetCell)
            .filter(
              (cell) =>
                cell.state === "hidden" &&
                !cell.hasMine &&
                cell.count === targetCell.count
            )
            .forEach(recursiveReveal);
        };

        recursiveReveal(targetCell);
      }

      return nextGameState;
  }
}
