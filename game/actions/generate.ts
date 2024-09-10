import { Cell } from "@/types/Cell";
import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { dig } from "./dig";
import { getCell } from "@/helpers/getCell";
import { getCount } from "@/helpers/getCount";
import { getNeighbours } from "@/helpers/getNeighbours";
import { shuffle } from "@/helpers/shuffle";

export function generate(gameState: GameState, target: Target) {
  const nextGameState = structuredClone(gameState);

  const cells = nextGameState.cells;
  const targetCell = getCell(nextGameState, target);

  if (!targetCell) {
    return nextGameState;
  }

  // detect cells to which mines can be added
  const safeCells = [targetCell, ...getNeighbours(nextGameState, targetCell)];
  const unsafeCells = cells.filter((cell) => !safeCells.includes(cell));

  // add mines
  shuffle(unsafeCells)
    .draw(nextGameState.numMines)
    .forEach((cell) => {
      cell.hasMine = true;
    });

  // detect counts
  for (const cell of cells) {
    if (cell.hasMine) {
      continue;
    }

    cell.count = getCount(nextGameState, cell);
  }

  return dig(nextGameState, targetCell);
}
