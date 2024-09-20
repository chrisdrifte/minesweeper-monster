import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { getCell } from "@/helpers/getCell";
import { isFlaggableState } from "@/helpers/isFlaggableState";

export function flag(gameState: GameState, target: Target): GameState {
  const isFlaggable = isFlaggableState(gameState);

  if (!isFlaggable) {
    return gameState;
  }

  const nextGameState = structuredClone(gameState);

  const targetCell = getCell(nextGameState, target);

  switch (targetCell?.state) {
    default:
      return nextGameState;

    case "hidden":
      targetCell.state = "flagged";
      return nextGameState;

    case "flagged":
      targetCell.state = "hidden";
      return nextGameState;
  }
}
