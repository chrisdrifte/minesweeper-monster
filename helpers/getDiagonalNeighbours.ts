import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { filterNotEmpty } from "./filterNotEmpty";
import { getCell } from "./getCell";

export function getDiagonalNeighbours(gameState: GameState, target: Target) {
  const topLeft = getCell(gameState, { x: target.x - 1, y: target.y - 1 });
  const topRight = getCell(gameState, { x: target.x + 1, y: target.y - 1 });
  const bottomRight = getCell(gameState, { x: target.x + 1, y: target.y + 1 });
  const bottomLeft = getCell(gameState, { x: target.x - 1, y: target.y + 1 });

  return [topLeft, topRight, bottomRight, bottomLeft].filter(filterNotEmpty);
}
