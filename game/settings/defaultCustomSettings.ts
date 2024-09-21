import { GameSettings } from "@/types/GameSettings";

export const defaultCustomSettings: GameSettings = Object.freeze({
  width: 9,
  height: 9,
  numMines: 10,
  showTimer: false,
  noAdjacentMinesOnFirstClick: true,
  revealContiguousNumbers: true,
  revealBoardOnLoss: true,
  autoRestart: false,
  timeLimit: 0,
});
