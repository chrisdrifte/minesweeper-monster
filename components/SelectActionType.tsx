import { Action } from "@/types/Action";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type SelectActionType = {
  actionType: Action["type"];
  isHighlightedDig?: boolean;
  isHighlightedFlag?: boolean;
  onSelectDig?: VoidFunction;
  onSelectFlag?: VoidFunction;
};

export function SelectActionType({
  actionType,
  isHighlightedDig = false,
  isHighlightedFlag = false,
  onSelectDig = noop,
  onSelectFlag = noop,
}: SelectActionType) {
  const highlightedStyles =
    "before:bg-orange-500 before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping relative";
  return (
    <div className="flex my-4 space-x-4">
      <button
        className={actionType === "dig" ? "underline" : ""}
        onClick={onSelectDig}
      >
        <div
          className={classNames(
            { [highlightedStyles]: isHighlightedDig },
            "size-full"
          )}
        >
          Dig
        </div>
      </button>
      <button
        className={actionType === "flag" ? "underline" : ""}
        onClick={onSelectFlag}
      >
        <div
          className={classNames(
            {
              [highlightedStyles]: isHighlightedFlag,
            },
            "size-full"
          )}
        >
          Flag
        </div>
      </button>
    </div>
  );
}
