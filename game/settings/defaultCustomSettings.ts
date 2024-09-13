import { GameSettings } from "@/types/GameSettings";

export const defaultCustomSettings: GameSettings = Object.freeze({
  width: 10,
  height: 15,
  numMines: 25,
  showTimer: false,
  safeFirstClick: true,
  revealContiguousNumbers: true,
  autoRestart: false,
  timeLimit: 0,
});
