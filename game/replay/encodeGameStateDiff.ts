import { Cell } from "@/types/Cell";
import { GameState } from "@/types/GameState";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
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

  const groupedChangedCells: Record<string, string> = {};

  changedCells.map(encodeChangedCell).forEach((changedCell) => {
    const [, value, ...coords] = changedCell.split("");
    groupedChangedCells[value] ??= "";
    groupedChangedCells[value] += coords.join("");
  });

  return Object.keys(groupedChangedCells)
    .map(
      (value) => `${ReplayDataMode.Cell}${value}${groupedChangedCells[value]}`
    )
    .join("");
};
