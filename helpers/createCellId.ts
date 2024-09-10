import { CellId } from "@/types/CellId";

export function createCellId({ x, y }: { x: number; y: number }): CellId {
  return `${x},${y}`;
}
