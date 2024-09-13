import { Cell } from "./Cell";
import { GameSettings } from "./GameSettings";

export type GameState = GameSettings & {
  cells: Cell[];
  action: "dig" | "flag";
};
