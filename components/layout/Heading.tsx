import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export function Heading({ children }: React.PropsWithChildren) {
  return (
    <h2
      className={classNames(spaceMono.className, "font-bold mt-8 mb-4 text-xl")}
    >
      {children}
    </h2>
  );
}
