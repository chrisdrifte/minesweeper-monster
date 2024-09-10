import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { getDiagonalNeighbours } from "./getDiagonalNeighbours";
import { getHorizontalNeighbours } from "./getHorizontalNeighbours";

export function getNeighbours(gameState: GameState, target: Target) {
  return [
    ...getDiagonalNeighbours(gameState, target),
    ...getHorizontalNeighbours(gameState, target),
  ];
}
