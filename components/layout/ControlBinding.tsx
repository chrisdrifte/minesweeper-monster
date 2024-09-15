import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export function ControlBinding({ children }: React.PropsWithChildren) {
  return (
    <strong
      className={classNames(
        spaceMono.className,
        "text-xs bg-bg-alt rounded px-2 py-1"
      )}
    >
      {children}
    </strong>
  );
}
