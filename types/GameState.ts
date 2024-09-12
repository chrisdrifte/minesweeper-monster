import { Cell } from "./Cell";

export type GameState = {
  width: number;
  height: number;
  numMines: number;
  showTimer: boolean;
  safeFirstClick: boolean;
  revealContiguousNumbers: boolean;
  cells: Cell[];
  action: "dig" | "flag";
};
