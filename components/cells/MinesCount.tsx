import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export type MinesCountProps = {
  count: number;
};

export function MinesCount({ count }: MinesCountProps) {
  return (
    <span
      className={classNames(spaceMono.className, "font-bold", {
        "text-blue": count === 1,
        "text-green": count === 2,
        "text-red": count === 3,
        "text-indigo": count === 4,
        "text-orange": count === 5,
        "text-cyan": count === 6,
        "text-violet": count === 7,
        "text-grey": count === 8,
      })}
    >
      {count || null}
    </span>
  );
}
