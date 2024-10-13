import { Cell } from "@/types/Cell";
import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { getCell } from "@/helpers/getCell";
import { getCount } from "@/helpers/getCount";
import { getNeighbours } from "@/helpers/getNeighbours";
import { isNoGuess } from "@/helpers/isNoGuess";
import { shuffle } from "@/helpers/shuffle";

// limit the number of attempts to generate a no guess board
// just to avoid any pesky infinite loops
const MAX_ITERATIONS = 10;

export function generate(
  gameState: GameState,
  target: Target,
  iteration = 0
): GameState {
  const nextGameState = structuredClone(gameState);

  const cells = nextGameState.cells;
  const targetCell = getCell(nextGameState, target);

  if (!targetCell) {
    return nextGameState;
  }

  // detect cells to which mines can be added
  let safeCells: Cell[] = [targetCell];

  if (gameState.noGuess || gameState.noAdjacentMinesOnFirstClick) {
    safeCells.push(...getNeighbours(nextGameState, targetCell));
  }

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

  if (
    gameState.noGuess &&
    iteration < MAX_ITERATIONS &&
    !isNoGuess(nextGameState, target)
  ) {
    return generate(gameState, target, iteration + 1);
  }

  return nextGameState;
}
