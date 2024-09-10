import { Action } from "@/types/Action";
import { noop } from "@/helpers/noop";

export type RenderControlsProps = {
  actionType: Action["type"];
  onSelectDig?: VoidFunction;
  onSelectFlag?: VoidFunction;
};

export function RenderControls({
  actionType,
  onSelectDig = noop,
  onSelectFlag = noop,
}: RenderControlsProps) {
  return (
    <div className="flex my-4 space-x-4">
      <button
        className={actionType === "dig" ? "underline" : ""}
        onClick={onSelectDig}
      >
        Dig
      </button>
      <button
        className={actionType === "flag" ? "underline" : ""}
        onClick={onSelectFlag}
      >
        Flag
      </button>
    </div>
  );
}
