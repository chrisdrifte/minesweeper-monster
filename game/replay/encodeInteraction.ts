import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { Target } from "@/types/Target";
import { encodeNumber } from "./encodeNumber";

export const encodeInteraction = (
  { x, y }: Target,
  type: "click" | "scroll"
) => {
  switch (type) {
    case "click":
      return `${ReplayDataMode.Click}${encodeNumber(x)}${encodeNumber(y)}`;

    case "scroll":
      return `${ReplayDataMode.Scroll}${encodeNumber(x)},${encodeNumber(y)}`;
  }
};
