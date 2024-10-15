import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { encodeNumber } from "./encodeNumber";

export const encodeTime = (time: number) => {
  return `${ReplayDataMode.Time}${encodeNumber(time)}`;
};
