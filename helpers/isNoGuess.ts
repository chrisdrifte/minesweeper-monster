import { GameState } from "@/types/GameState";
import Minefield from "mineswift";
import { Target } from "@/types/Target";

export async function isNoGuess(gameState: GameState, target: Target) {
  const minefield = new Minefield(gameState.width, gameState.height);

  for (const cell of gameState.cells) {
    minefield[cell.y][cell.x].isMine = cell.hasMine ?? false;
    minefield[cell.y][cell.x].mines = cell.count ?? 0;
  }

  return minefield.isSolvableFrom([target.x, target.y]);
}
