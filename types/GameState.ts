import { Cell } from "./Cell";

export type GameState = {
  width: number;
  height: number;
  numMines: number;
  cells: Cell[];
  action: "dig" | "flag";
};
