import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { createCellId } from "./createCellId";

export function getCell(gameState: GameState, target: Target) {
  const targetId = createCellId(target);
  return gameState.cells.find((cell) => cell.id === targetId);
}
