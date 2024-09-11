import { Action } from "@/types/Action";
import { SelectActionButton } from "./SelectActionButton";
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
  return (
    <div className="flex p-1 pt-0 items-center space-x-2 bg-white text-black w-full rounded-b">
      <SelectActionButton
        isHighlighted={isHighlightedDig}
        isActive={actionType === "dig"}
        onClick={onSelectDig}
      >
        Dig
      </SelectActionButton>

      <SelectActionButton
        isHighlighted={isHighlightedFlag}
        isActive={actionType === "flag"}
        onClick={onSelectFlag}
      >
        Flag
      </SelectActionButton>
    </div>
  );
}
