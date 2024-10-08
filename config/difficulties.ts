export const difficulties = {
  beginner: {
    width: 9,
    height: 9,
    numMines: 10,
    showTimer: true,
    noAdjacentMinesOnFirstClick: false,
    revealContiguousNumbers: false,
    revealBoardOnLoss: true,
    autoRestart: false,
    timeLimit: 0,
  },
  intermediate: {
    width: 16,
    height: 16,
    numMines: 40,
    showTimer: true,
    noAdjacentMinesOnFirstClick: false,
    revealContiguousNumbers: false,
    revealBoardOnLoss: true,
    autoRestart: false,
    timeLimit: 0,
  },
  expert: {
    width: 30,
    height: 16,
    numMines: 99,
    showTimer: true,
    noAdjacentMinesOnFirstClick: false,
    revealContiguousNumbers: false,
    revealBoardOnLoss: true,
    autoRestart: false,
    timeLimit: 0,
  },
  practice: {
    width: 8,
    height: 8,
    numMines: 8,
    showTimer: false,
    noAdjacentMinesOnFirstClick: true,
    revealContiguousNumbers: false,
    revealBoardOnLoss: true,
    autoRestart: false,
    timeLimit: 0,
  },
  daily: {
    width: 10,
    height: 10,
    numMines: 20,
    showTimer: false,
    noAdjacentMinesOnFirstClick: false,
    revealContiguousNumbers: false,
    revealBoardOnLoss: false,
    autoRestart: true,
    timeLimit: 0,
  },
};
