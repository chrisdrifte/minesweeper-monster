import { Cell } from "@/types/Cell";
import { GameSettings } from "@/types/GameSettings";
import { GameState } from "@/types/GameState";
import { createCellId } from "./createCellId";
import { getCount } from "./getCount";

const defaultSettings = {
  showTimer: false,
  noAdjacentMinesOnFirstClick: false,
  revealContiguousNumbers: false,
  revealBoardOnLoss: false,
  autoRestart: false,
  timeLimit: 0,
};

export function loadGameState(
  levelData: string,
  settings: Omit<
    GameSettings,
    "width" | "height" | "numMines"
  > = defaultSettings
): GameState {
  const parsedLevelData = levelData
    .replace(/[^XMDF0-9\n]/g, "")
    .split("\n")
    .filter(Boolean)
    .map((str) => [...str]);

  const width = parsedLevelData[0].length;
  const height = parsedLevelData.length;

  // ensure all rows have same number of columns
  for (const row of parsedLevelData) {
    const rowWidth = row.length;
    if (rowWidth !== width) {
      throw new Error(
        "Invalid level data: all rows must have the same number of columns"
      );
    }
  }

  // convert string characters into cells
  const characterToCell = (character: string, x: number, y: number): Cell => {
    const baseCell = {
      id: createCellId({ x, y }),
      x,
      y,
    };

    switch (character) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
        return {
          ...baseCell,
          state: "visible",
          count: parseInt(character),
        };

      case "M":
        return {
          ...baseCell,
          state: "hidden",
          hasMine: true,
        };

      case "D":
        return {
          ...baseCell,
          state: "flagged",
          hasMine: true,
        };

      case "F":
        return {
          ...baseCell,
          state: "flagged",
        };
    }

    return {
      ...baseCell,
      state: "hidden",
    };
  };

  const cells: Cell[] = [];

  let y = -1;
  while (y++ < height - 1) {
    let x = -1;
    while (x++ < width - 1) {
      const character = parsedLevelData[y][x];

      if (!character) {
        continue;
      }

      const cell = characterToCell(character, x, y);

      cells.push(cell);
    }
  }

  const gameState: GameState = {
    ...settings,
    width,
    height,
    numMines: cells.filter((cell) => cell.hasMine).length,
    cells,
    action: "dig",
  };

  // detect counts
  for (const cell of cells) {
    if (cell.hasMine) {
      continue;
    }

    const assignedCount = cell.count;
    const realCount = getCount(gameState, cell);

    if (typeof assignedCount === "number" && assignedCount !== realCount) {
      throw new Error(
        `Invalid level data: cell ${cell.id} should be "${realCount}" not "${assignedCount}`
      );
    }

    cell.count = realCount;
  }

  return gameState;
}
