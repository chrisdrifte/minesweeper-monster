import { GameState } from "@/types/GameState";
import Prando from "prando";
import { getCount } from "@/helpers/getCount";
import { shuffle } from "@/helpers/shuffle";

export function generateFromSeed(gameState: GameState) {
  const nextGameState = structuredClone(gameState);
  const seed = nextGameState.seed;

  const rng = new Prando(seed);

  // add mines
  shuffle(nextGameState.cells, () => rng.next())
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

  return nextGameState;
}
