import { Cell } from "./Cell";

export type GameState = {
  width: number;
  height: number;
  cells: Cell[];
  action: "dig" | "flag";
};
