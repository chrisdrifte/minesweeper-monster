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
  annotation?: Annotation;
  onClick?: VoidFunction;
  onAltClick?: VoidFunction;
};

export function RenderCell({
  cell,
  action,
  isHighlighted = false,
  annotation,
  onClick = noop,
  onAltClick = noop,
}: RenderCellProps) {
  switch (cell.state) {
    case "hidden":
      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          background="white"
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          {action === "dig" && (
            <div
              className={classNames(
                {
                  "bg-red-500": isHighlighted,
                },
                "size-full sm:hover:bg-red-500 active:bg-rad-500"
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
          background="white"
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          <FlagIcon />
        </CellWrapper>
      );

    case "visible":
      if (cell.hasMine) {
        return (
          <CellWrapper
            isHighlighted={isHighlighted}
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
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          <MinesCount count={cell.count ?? 0} />
        </CellWrapper>
      );
  }
}
