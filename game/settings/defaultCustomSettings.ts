import { GameSettings } from "@/types/GameSettings";

export const defaultCustomSettings: GameSettings = Object.freeze({
  width: 10,
  height: 15,
  numMines: 25,
  safeFirstClick: true,
  revealContiguousNumbers: true,
});
