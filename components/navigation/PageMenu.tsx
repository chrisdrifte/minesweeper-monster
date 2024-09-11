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
      {prev && <MenuButton href={prev} text="Back" isSecondary />}
      {next && <MenuButton href={next} text={nextText} />}
    </MenuWrapper>
  );
}
