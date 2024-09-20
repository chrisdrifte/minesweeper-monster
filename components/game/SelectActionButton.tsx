import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type SelectActionButtonProps = {
  isHighlighted?: boolean;
  isActive?: boolean;
  isEnabled?: boolean;
  onClick?: VoidFunction;
};

export function SelectActionButton({
  children,
  isHighlighted = false,
  isActive = false,
  isEnabled = true,
  onClick = noop,
}: React.PropsWithChildren<SelectActionButtonProps>) {
  return (
    <button
      className={classNames(
        {
          "bg-bg text-fg-100": isActive,
          "cursor-not-allowed": !isEnabled,
        },
        "size-full py-2 px-4 rounded"
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          {
            "before:bg-highlight-click before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping relative":
              isHighlighted && isEnabled,
            "opacity-50": !isEnabled,
          },
          spaceMono.className,
          "size-full"
        )}
      >
        {children}
      </div>
    </button>
  );
}
