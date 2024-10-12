"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type PaginationLinkProps = {
  isCurrentPage?: boolean;
  onClick?: VoidFunction;
};

export function PaginationLink({
  children,
  isCurrentPage = false,
  onClick = noop,
}: React.PropsWithChildren<PaginationLinkProps>) {
  return (
    <button
      className={classNames(
        {
          "border-fg-100 pointer-events-none": isCurrentPage,
          "border-transparent": !isCurrentPage,
        },
        spaceMono.className,
        "border-2 w-full text-fg-100 rounded-sm px-4 py-2 text-center text-sm sm:hover:bg-fg-100 sm:hover:text-bg"
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
