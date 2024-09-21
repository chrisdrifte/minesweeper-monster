import { ButtonWrapper } from "../layout/ButtonWrapper";
import { LinkButton } from "./LinkButton";

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
      {prev && (
        <LinkButton href={prev} isSecondary>
          Back
        </LinkButton>
      )}
      {next && <LinkButton href={next}>{nextText}</LinkButton>}
    </ButtonWrapper>
  );
}
