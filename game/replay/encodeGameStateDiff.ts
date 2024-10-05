import { Cell } from "@/types/Cell";
import { GameState } from "@/types/GameState";
import { encodeChangedCell } from "./encodeChangedCell";

export const encodeGameStateDiff = (
  prevGameState: GameState,
  gameState: GameState
) => {
  const changedCells: Cell[] = [];
  const numCells = gameState.cells.length;

  for (let i = 0; i < numCells; i++) {
    const prevCell = prevGameState.cells[i];
    const nextCell = gameState.cells[i];

    if (prevCell.state !== nextCell.state) {
      changedCells.push(nextCell);
    }
  }

  return changedCells.map(encodeChangedCell).join("");
};
