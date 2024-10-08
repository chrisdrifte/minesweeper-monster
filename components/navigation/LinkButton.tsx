import Link from "next/link";
import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export type LinkButtonProps = {
  isSecondary?: boolean;
  href: string;
};

export function LinkButton({
  children,
  href,
  isSecondary = false,
}: React.PropsWithChildren<LinkButtonProps>) {
  return (
    <Link
      href={href}
      className={classNames(
        {
          "border-bg sm:hover:border-fg-100": isSecondary,
          "border-fg-100": !isSecondary,
        },
        spaceMono.className,
        "w-full border-2 text-fg-100 rounded-sm px-4 py-2 text-center text-sm sm:hover:bg-fg-100 sm:hover:text-bg active:bg-fg-100 active:text-bg"
      )}
    >
      {children}
    </Link>
  );
}
