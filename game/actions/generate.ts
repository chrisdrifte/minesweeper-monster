import { Cell } from "@/types/Cell";
import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { getCell } from "@/helpers/getCell";
import { getCount } from "@/helpers/getCount";
import { getNeighbours } from "@/helpers/getNeighbours";
import { shuffle } from "@/helpers/shuffle";

export async function generate(
  gameState: GameState,
  target: Target
): Promise<GameState> {
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

  if (gameState.noGuess) {
    const { isNoGuess } = await import("@/helpers/isNoGuess");

    return isNoGuess(nextGameState, target)
      ? nextGameState
      : generate(gameState, target);
  }

  return nextGameState;
}
