export type GameSettings = {
  seed?: string;
  width: number;
  height: number;
  numMines: number;
  showTimer: boolean;
  safeFirstClick: boolean;
  revealContiguousNumbers: boolean;
  revealBoardOnLoss: boolean;
  autoRestart: boolean;
  timeLimit: number;
};
