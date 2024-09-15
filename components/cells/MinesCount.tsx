import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export type MinesCountProps = {
  count: number;
};

export function MinesCount({ count }: MinesCountProps) {
  return (
    <span
      className={classNames(spaceMono.className, "font-bold", {
        "text-one": count === 1,
        "text-two": count === 2,
        "text-three": count === 3,
        "text-four": count === 4,
        "text-five": count === 5,
        "text-six": count === 6,
        "text-seven": count === 7,
        "text-eight": count === 8,
      })}
    >
      {count || null}
    </span>
  );
}
