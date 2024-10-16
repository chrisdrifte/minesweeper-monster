export type GameSettings = {
  seed?: string;
  width: number;
  height: number;
  numMines: number;
  showTimer: boolean;
  noGuess: boolean;
  noAdjacentMinesOnFirstClick: boolean;
  revealContiguousNumbers: boolean;
  revealBoardOnLoss: boolean;
  autoRestart: boolean;
  timeLimit: number;
};
