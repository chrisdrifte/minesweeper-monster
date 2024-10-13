import { GameState } from "@/types/GameState";
import Prando from "prando";
import { dig } from "./dig";
import { getCell } from "@/helpers/getCell";
import { getCount } from "@/helpers/getCount";
import { getNeighbours } from "@/helpers/getNeighbours";
import { isNoGuess } from "@/helpers/isNoGuess";
import { shuffle } from "@/helpers/shuffle";

// limit the number of attempts to generate a no guess board
// just to avoid any pesky infinite loops
const MAX_ITERATIONS = 10;

export function generateFromSeed(gameState: GameState, iteration = 0) {
  const nextGameState = structuredClone(gameState);
  const seed = `${nextGameState.seed}${iteration}`;

  const rng = new Prando(seed);

  // in order for puzzles to be noguess, we must dig the first cell for the
  // player
  const target = {
    x: rng.nextInt(0, gameState.width - 1),
    y: rng.nextInt(0, gameState.height - 1),
  };

  const targetCell = getCell(nextGameState, target);

  if (!targetCell) {
    throw new Error("Invalid target");
  }

  const safeCells = [targetCell];
  safeCells.push(...getNeighbours(nextGameState, targetCell));

  const unsafeCells = nextGameState.cells.filter(
    (cell) => !safeCells.includes(cell)
  );

  // add mines
  shuffle(unsafeCells, () => rng.next())
    .draw(nextGameState.numMines)
    .forEach((cell) => {
      cell.hasMine = true;
    });

  // detect counts
  for (const cell of nextGameState.cells) {
    if (cell.hasMine) {
      continue;
    }

    cell.count = getCount(nextGameState, cell);
  }

  if (iteration < MAX_ITERATIONS && !isNoGuess(nextGameState, target)) {
    return generateFromSeed(gameState, iteration + 1);
  }

  return dig(nextGameState, target);
}
