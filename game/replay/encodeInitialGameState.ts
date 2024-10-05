import { GameState } from "@/types/GameState";
import { encodeNumber } from "./encodeNumber";

export const encodeInitialGameState = ({
  width,
  height,
  numMines,
}: GameState) => {
  return `!${encodeNumber(width)}${encodeNumber(height)}${encodeNumber(
    numMines
  )}`;
};
