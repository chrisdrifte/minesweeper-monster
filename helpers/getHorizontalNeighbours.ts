import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { filterNotEmpty } from "./filterNotEmpty";
import { getCell } from "./getCell";

export function getHorizontalNeighbours(gameState: GameState, target: Target) {
  const top = getCell(gameState, { x: target.x, y: target.y - 1 });
  const right = getCell(gameState, { x: target.x + 1, y: target.y });
  const bottom = getCell(gameState, { x: target.x, y: target.y + 1 });
  const left = getCell(gameState, { x: target.x - 1, y: target.y });

  return [top, left, bottom, right].filter(filterNotEmpty);
}
