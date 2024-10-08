import { Action } from "@/types/Action";
import { SelectActionButton } from "./SelectActionButton";
import { noop } from "@/helpers/noop";

export type SelectActionType = {
  actionType: Action["type"];
  isHighlightedDig?: boolean;
  isHighlightedFlag?: boolean;
  isFlaggingEnabled?: boolean;
  onSelectDig?: VoidFunction;
  onSelectFlag?: VoidFunction;
};

export function SelectActionType({
  actionType,
  isHighlightedDig = false,
  isHighlightedFlag = false,
  isFlaggingEnabled = true,
  onSelectDig = noop,
  onSelectFlag = noop,
}: SelectActionType) {
  return (
    <div className="flex p-1 pt-0 items-center space-x-2 bg-fg-100 text-bg w-full max-w-[480px] rounded-b">
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
        isEnabled={isFlaggingEnabled}
        onClick={onSelectFlag}
      >
        Flag
      </SelectActionButton>
    </div>
  );
}
