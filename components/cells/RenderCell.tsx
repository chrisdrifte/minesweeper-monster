import { Annotation } from "@/types/Annotation";
import { Cell } from "@/types/Cell";
import { CellWrapper } from "./CellWrapper";
import { FlagIcon } from "../icons/FlagIcon";
import { Mine } from "./Mine";
import { MinesCount } from "./MinesCount";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type RenderCellProps = {
  cell: Cell;
  action?: "dig" | "flag" | "select-dig" | "select-flag";
  isHighlighted?: boolean;
  isExploded?: boolean;
  annotation?: Annotation;
  onClick?: VoidFunction;
  onAltClick?: VoidFunction;
};

export function RenderCell({
  cell,
  action,
  isHighlighted = false,
  isExploded = false,
  annotation,
  onClick = noop,
  onAltClick = noop,
}: RenderCellProps) {
  switch (cell.state) {
    case "hidden":
      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          isExploded={isExploded}
          background="fg"
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          {action === "dig" && (
            <div
              className={classNames(
                {
                  "bg-red": isHighlighted,
                },
                "size-full sm:hover:bg-red active:bg-red rounded-sm"
              )}
            />
          )}
          {action === "flag" && (
            <div className="size-full opacity-50 group">
              <FlagIcon
                fill="black"
                className={classNames(
                  {
                    hidden: !isHighlighted,
                    block: isHighlighted,
                  },
                  "sm:group-hover:block group-active:block"
                )}
              />
            </div>
          )}
        </CellWrapper>
      );

    case "flagged":
      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          isExploded={isExploded}
          background="fg"
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          <FlagIcon className="size-full" />
        </CellWrapper>
      );

    case "visible":
      if (cell.hasMine) {
        return (
          <CellWrapper
            isHighlighted={isHighlighted}
            isExploded={isExploded}
            background="red"
            annotation={annotation}
            onClick={onClick}
            onAltClick={onAltClick}
          >
            <Mine />
          </CellWrapper>
        );
      }

      if (!cell.count) {
        return <div></div>;
      }

      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          isExploded={isExploded}
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          <MinesCount count={cell.count ?? 0} />
        </CellWrapper>
      );
  }
}
