import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type CellWrapperProps = {
  isHighlighted?: boolean;
  onClick?: VoidFunction;
};

export function CellWrapper({
  children,
  isHighlighted = false,
  onClick = noop,
}: React.PropsWithChildren<CellWrapperProps>) {
  return (
    <div
      className={classNames(
        {
          "bg-white": !isHighlighted,
          "bg-yellow-500": isHighlighted,
        },
        "size-6 flex items-center justify-center text-black m-1 cursor-pointer"
      )}
      onClick={onClick}
    >
      <span>{children}</span>
    </div>
  );
}
