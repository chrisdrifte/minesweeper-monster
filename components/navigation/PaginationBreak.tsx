"use client";

import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export function PaginationBreak() {
  return (
    <span
      className={classNames(
        spaceMono.className,
        "w-full text-fg-100 rounded-sm px-4 py-2 text-center text-sm "
      )}
    >
      ...
    </span>
  );
}
