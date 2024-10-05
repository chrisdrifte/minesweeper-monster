import { Cell } from "@/types/Cell";
import { encodeCell } from "@/helpers/encodeCell";
import { encodeNumber } from "./encodeNumber";

export const encodeChangedCell = (cell: Cell) => {
  return `$${encodeCell(cell)}${encodeNumber(cell.x)}${encodeNumber(cell.y)}`;
};
