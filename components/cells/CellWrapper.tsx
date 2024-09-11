import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type CellWrapperProps = {
  isHighlighted?: boolean;
  background?: "none" | "white" | "red";
  onClick?: VoidFunction;
};

export function CellWrapper({
  children,
  isHighlighted = false,
  background = "none",
  onClick = noop,
}: React.PropsWithChildren<CellWrapperProps>) {
  return (
    <div
      className={classNames(
        {
          "bg-white": background === "white",
          "bg-red-500": background === "red",
        },
        "size-6 text-black m-1 cursor-pointer rounded-sm"
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          {
            "before:bg-orange-500 before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping relative":
              isHighlighted,
          },
          "size-full flex items-center justify-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}
