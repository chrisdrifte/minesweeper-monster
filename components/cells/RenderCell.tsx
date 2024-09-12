import { Cell } from "@/types/Cell";
import { CellWrapper } from "./CellWrapper";
import { Count } from "./Count";
import { FlagIcon } from "../icons/FlagIcon";
import { Mine } from "./Mine";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type RenderCellProps = {
  cell: Cell;
  action?: "dig" | "flag" | "select-dig" | "select-flag";
  isHighlighted?: boolean;
  onClick?: VoidFunction;
  onAltClick?: VoidFunction;
};

export function RenderCell({
  cell,
  action,
  isHighlighted = false,
  onClick = noop,
  onAltClick = noop,
}: RenderCellProps) {
  switch (cell.state) {
    case "hidden":
      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          background="white"
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
            onClick={onClick}
            onAltClick={onAltClick}
          >
            <Mine />
          </CellWrapper>
        );
      } else {
        return (
          <CellWrapper
            isHighlighted={isHighlighted}
            onClick={onClick}
            onAltClick={onAltClick}
          >
            <Count count={cell.count ?? 0} />
          </CellWrapper>
        );
      }
  }
}
