import { Cell } from "@/types/Cell";

export function encodeCell(cell: Cell) {
  if (cell.state === "hidden") {
    return "X";
  }

  if (cell.state === "visible") {
    return cell.hasMine ? "M" : String(cell.count);
  }

  if (cell.state === "flagged") {
    return cell.hasMine ? "D" : "F";
  }
}
