"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type FormButtonProps = {
  text: string;
  onClick?: VoidFunction;
};

export function FormButton({ text, onClick = noop }: FormButtonProps) {
  return (
    <button
      className={classNames(
        spaceMono.className,
        "w-full border-2 border-fg-100  text-fg-100 rounded-sm px-4 py-2 text-center text-sm sm:hover:bg-fg-100 sm:hover:text-bg active:bg-fg-100 active:text-bg"
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </button>
  );
}
