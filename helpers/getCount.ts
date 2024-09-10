import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { getNeighbours } from "./getNeighbours";

export function getCount(gameState: GameState, target: Target) {
  return getNeighbours(gameState, target).filter((cell) => cell.hasMine).length;
}
