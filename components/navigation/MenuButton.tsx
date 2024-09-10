"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type MenuButtonProps = {
  text: string;
  isSecondary?: boolean;
  onClick?: VoidFunction;
};

export function MenuButton({
  text,
  isSecondary = false,
  onClick = noop,
}: MenuButtonProps) {
  return (
    <button
      className={classNames(
        {
          "border-black hover:border-white": isSecondary,
          "border-white": !isSecondary,
        },
        spaceMono.className,
        "w-full border-2 text-white rounded-sm px-4 py-2 text-center text-sm hover:bg-white hover:text-black active:bg-white active:text-black"
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
