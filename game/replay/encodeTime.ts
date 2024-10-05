import { encodeNumber } from "./encodeNumber";

export const encodeTime = (time: number) => {
  return `#${encodeNumber(time)}`;
};
