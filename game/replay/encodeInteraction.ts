import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { Target } from "@/types/Target";
import { encodeNumber } from "./encodeNumber";

export const encodeInteraction = ({ x, y }: Target) => {
  return `${ReplayDataMode.Interaction}${encodeNumber(x)}${encodeNumber(y)}`;
};
