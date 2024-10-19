"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type FormButtonProps = {
  isActive?: boolean;
  onClick?: VoidFunction;
};

export function FormButton({
  children,
  isActive = false,
  onClick = noop,
}: React.PropsWithChildren<FormButtonProps>) {
  return (
    <button
      className={classNames(
        {
          "text-fg-alt border-fg-alt bg-transparent pointer-events-none":
            isActive,
          "sm:hover:bg-fg-100 sm:hover:text-bg active:text-bg active:bg-fg-100":
            !isActive,
        },
        spaceMono.className,
        "w-full border-2 border-fg-100  text-fg-100 rounded-sm px-4 py-2 text-center text-sm "
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
