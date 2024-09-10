import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export type CountProps = {
  count: number;
};

export function Count({ count }: CountProps) {
  return (
    <div
      className={classNames(spaceMono.className, "font-bold", {
        "text-violet-500": count === 8,
        "text-lime-500": count === 7,
        "text-yellow-500": count === 6,
        "text-orange-500": count === 5,
        "text-cyan-500": count === 4,
        "text-red-500": count === 3,
        "text-green-500": count === 2,
        "text-blue-500": count === 1,
      })}
    >
      {count || null}
    </div>
  );
}
