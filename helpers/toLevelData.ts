import { GameState } from "@/types/GameState";
import { encodeCell } from "./encodeCell";
import { getCell } from "./getCell";

export function toLevelData(gameState: GameState): string {
  const { width, height } = gameState;

  let levelData = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = getCell(gameState, { x, y });
      if (!cell) {
        throw new Error("Couldn't convert game state to level data");
      }

      levelData += encodeCell(cell);
    }
    levelData += "\n";
  }

  return levelData;
}
