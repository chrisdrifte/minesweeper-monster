import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

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
          { "bg-orange-500 motion-safe:animate-ping": isHighlighted },
          "size-full rounded-sm flex items-center justify-center"
        )}
      >
        <span>{children}</span>
      </div>
    </div>
  );
}
