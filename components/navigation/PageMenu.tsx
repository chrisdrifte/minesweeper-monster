import { HomeIcon } from "../icons/HomeIcon";
import { LearnIcon } from "../icons/LearnIcon";
import Link from "next/link";
import { MenuButton } from "./MenuButton";
import { MenuWrapper } from "./MenuWrapper";

export type PageMenuProps = {
  prev?: string;
  next?: string;
  nextText: string;
};

export function PageMenu({ prev, next, nextText }: PageMenuProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <MenuWrapper isHorizontal>
      {prev && (
        <Link href={prev} className="size-full">
          <MenuButton text="Back" isSecondary />
        </Link>
      )}

      {next && (
        <Link href={next} className="size-full">
          <MenuButton text={nextText} />
        </Link>
      )}
    </MenuWrapper>
  );
}
