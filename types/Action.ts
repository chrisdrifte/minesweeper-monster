import { Target } from "./Target";

export type Action =
  | {
      type: "dig" | "flag";
      target: Target;
    }
  | {
      type: "select-dig" | "select-flag";
    };
