import { Logo } from "./Logo";
import React from "react";
import classNames from "classnames";

export function Header({ children }: React.PropsWithChildren) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <header
      className={classNames(
        { "justify-center": !hasChildren, "justify-between": hasChildren },
        "mt-8 mb-12 flex items-center"
      )}
    >
      <Logo />

      {hasChildren && children}
    </header>
  );
}
