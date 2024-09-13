import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export function Header({ children }: React.PropsWithChildren) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <header
      className={classNames(
        { "justify-center": !hasChildren, "justify-between": hasChildren },
        "mt-8 mb-12 flex items-center"
      )}
    >
      <hgroup>
        <h1 className={spaceMono.className}>
          <Link href="/">
            <strong>MINESWEEPER</strong>
            <span className="text-red">.MONSTER</span>
          </Link>
        </h1>
      </hgroup>

      {hasChildren && children}
    </header>
  );
}
