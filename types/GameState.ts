import { Cell } from "./Cell";

export type GameState = {
  width: number;
  height: number;
  numMines: number;
  safeFirstClick: boolean;
  cells: Cell[];
  action: "dig" | "flag";
};
