import { SelectActionButton } from "./SelectActionButton";
import { noop } from "@/helpers/noop";

export type SelectEndGameOptions = {
  onSaveReplayData?: VoidFunction;
};

export function SelectEndGameOptions({
  onSaveReplayData = noop,
}: SelectEndGameOptions) {
  return (
    <div className="flex p-1 pt-0 items-center space-x-2 bg-fg-100 text-bg w-full max-w-[480px] rounded-b">
      <SelectActionButton onClick={onSaveReplayData}>
        Save Replay?
      </SelectActionButton>
    </div>
  );
}
