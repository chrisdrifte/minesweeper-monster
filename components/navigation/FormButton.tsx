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
        "w-full border-2 border-white  text-white rounded-sm px-4 py-2 text-center text-sm sm:hover:bg-white sm:hover:text-black active:bg-white active:text-black"
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
