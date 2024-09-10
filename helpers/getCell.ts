import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { createCellId } from "./createCellId";
import { createCellMap } from "./createCellMap";

export function getCell(gameState: GameState, target: Target) {
  const cellMap = createCellMap(gameState.cells);
  const targetId = createCellId(target);
  const targetCell = cellMap.get(targetId);

  return targetCell;
}
