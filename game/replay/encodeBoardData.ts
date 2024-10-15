import { BoardData } from "@/types/BoardData";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { encodeNumber } from "./encodeNumber";

export const encodeBoardData = ({ width, height, numMines }: BoardData) => {
  return `${ReplayDataMode.Board}${encodeNumber(width)}${encodeNumber(
    height
  )}${encodeNumber(numMines)}`;
};
