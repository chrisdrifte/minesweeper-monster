import Link from "next/link";
import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export type MenuButtonProps = {
  text: string;
  isSecondary?: boolean;
  href: string;
};

export function MenuButton({
  text,
  href,
  isSecondary = false,
}: MenuButtonProps) {
  return (
    <Link
      href={href}
      className={classNames(
        {
          "border-black hover:border-white": isSecondary,
          "border-white": !isSecondary,
        },
        spaceMono.className,
        "w-full border-2 text-white rounded-sm px-4 py-2 text-center text-sm hover:bg-white hover:text-black active:bg-white active:text-black"
      )}
    >
      {text}
    </Link>
  );
}
