import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type SelectActionButtonProps = {
  isHighlighted?: boolean;
  isActive?: boolean;
  onClick?: VoidFunction;
};

export function SelectActionButton({
  children,
  isHighlighted = false,
  isActive = false,
  onClick = noop,
}: React.PropsWithChildren<SelectActionButtonProps>) {
  return (
    <button
      className={classNames(
        {
          "bg-black text-white": isActive,
        },
        "size-full py-2 px-4 rounded"
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          {
            "before:bg-orange-500 before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping relative":
              isHighlighted,
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
