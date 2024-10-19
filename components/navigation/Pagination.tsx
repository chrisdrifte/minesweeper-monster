import { ButtonWrapper } from "../layout/ButtonWrapper";
import { Center } from "../layout/Center";
import { ContentBlock } from "../layout/ContentBlock";
import { FormButton } from "../form/FormButton";
import { Fragment } from "react";
import { PaginationBreak } from "./PaginationBreak";
import { PaginationLink } from "./PaginationLink";
import { arrayUnique } from "@/helpers/arrayUnique";
import { noop } from "@/helpers/noop";

export type PaginationProps = {
  currentPage: number;
  numPages: number;
  onPrev?: VoidFunction;
  onNext?: VoidFunction;
  onSelect?: (currentPage: number) => void;
};

export function Pagination({
  currentPage,
  numPages,
  onPrev = noop,
  onNext = noop,
  onSelect = noop,
}: PaginationProps) {
  if (numPages <= 1) {
    return;
  }

  const groupedPagesToRender: number[][] = [[]];
  let currentGroup = groupedPagesToRender[0];

  arrayUnique([
    0,
    currentPage < 2 ? 1 : 0,
    currentPage < 2 ? 2 : 0,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage > numPages - 3 ? numPages - 3 : 0,
    currentPage > numPages - 3 ? numPages - 2 : 0,
    numPages - 1,
  ])
    .sort((a, b) => a - b)
    .filter((page) => page >= 0 && page < numPages)
    .forEach((page, i, arr) => {
      const prevPage = arr[i - 1];

      if (page - prevPage > 1) {
        currentGroup = [];
        groupedPagesToRender.push(currentGroup);
      }

      currentGroup.push(page);
    });

  return (
    <ContentBlock>
      <Center>
        <ButtonWrapper isHorizontal>
          <FormButton onClick={onPrev}>Prev</FormButton>
          <FormButton onClick={onNext}>Next</FormButton>
        </ButtonWrapper>
        <br />
        <ol className="flex items-baseline space-x-2 select-none">
          {groupedPagesToRender.map((group, i, arr) => {
            const isLastPage = i === arr.length - 1;

            return (
              <Fragment key={i}>
                {group.map((page) => (
                  <li key={page}>
                    <PaginationLink
                      isCurrentPage={page === currentPage}
                      onClick={() => onSelect(page)}
                    >
                      {page + 1}
                    </PaginationLink>
                  </li>
                ))}
                {!isLastPage && (
                  <li>
                    <PaginationBreak />
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </Center>
    </ContentBlock>
  );
}
