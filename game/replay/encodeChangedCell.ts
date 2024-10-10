import { Cell } from "@/types/Cell";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { encodeCell } from "@/helpers/encodeCell";
import { encodeNumber } from "./encodeNumber";

export const encodeChangedCell = (cell: Cell) => {
  return `${ReplayDataMode.Cell}${encodeCell(cell)}${encodeNumber(
    cell.x
  )}${encodeNumber(cell.y)}`;
};
