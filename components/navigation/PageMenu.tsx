import { ButtonWrapper } from "./ButtonWrapper";
import { MenuButton } from "./MenuButton";

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
    <ButtonWrapper isHorizontal>
      {prev && <MenuButton href={prev} text="Back" isSecondary />}
      {next && <MenuButton href={next} text={nextText} />}
    </ButtonWrapper>
  );
}
