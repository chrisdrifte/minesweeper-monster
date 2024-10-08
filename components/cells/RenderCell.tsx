import { Annotation } from "@/types/Annotation";
import { Cell } from "@/types/Cell";
import { CellWrapper } from "./CellWrapper";
import { FlagIcon } from "../icons/FlagIcon";
import { MineIcon } from "../icons/MineIcon";
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
          variant="hidden"
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          {action === "dig" && (
            <div
              className={classNames(
                {
                  "bg-hightlight-dig": isHighlighted,
                },
                "size-full sm:hover:bg-highlight-dig active:bg-highlight-dig rounded-sm"
              )}
            />
          )}
          {action === "flag" && (
            <div className="size-full opacity-50 group">
              <FlagIcon
                className={classNames(
                  {
                    hidden: !isHighlighted,
                    block: isHighlighted,
                  },
                  "fill-flag-fg sm:group-hover:block group-active:block"
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
          variant="flag"
          annotation={annotation}
          onClick={onClick}
          onAltClick={onAltClick}
        >
          <FlagIcon className="size-full fill-flag-fg" />
        </CellWrapper>
      );

    case "visible":
      if (cell.hasMine) {
        return (
          <CellWrapper
            isHighlighted={isHighlighted}
            isExploded={isExploded}
            variant="mine"
            annotation={annotation}
            onClick={onClick}
            onAltClick={onAltClick}
          >
            <MineIcon className="fill-mine-fg" />
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
