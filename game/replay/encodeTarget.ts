import { Target } from "@/types/Target";
import { encodeNumber } from "./encodeNumber";

export const encodeTarget = ({ x, y }: Target) => {
  return `@${encodeNumber(x)}${encodeNumber(y)}`;
};
