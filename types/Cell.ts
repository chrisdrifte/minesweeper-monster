import { CellId } from "./CellId";

export type Cell = {
  id: CellId;
  x: number;
  y: number;
  state: "hidden" | "flagged" | "visible";
  count?: number;
  hasMine?: boolean;
};
