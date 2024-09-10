import { Cell } from "@/types/Cell";
import { CellId } from "@/types/CellId";

export function createCellMap(cells: Cell[]) {
  const cellMap: Map<CellId, Cell> = new Map();

  for (const cell of cells) {
    cellMap.set(cell.id, cell);
  }

  return cellMap;
}
