import { Cell } from "@/types/Cell";
import { CellWrapper } from "./CellWrapper";
import { Count } from "./Count";
import { Flag } from "./Flag";
import { Mine } from "./Mine";
import { noop } from "@/helpers/noop";

export type RenderCellProps = {
  cell: Cell;
  isHighlighted?: boolean;
  onClick?: VoidFunction;
};

export function RenderCell({
  cell,
  isHighlighted = false,
  onClick = noop,
}: RenderCellProps) {
  switch (cell.state) {
    case "hidden":
      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          background="white"
          onClick={onClick}
        ></CellWrapper>
      );

    case "flagged":
      return (
        <CellWrapper
          isHighlighted={isHighlighted}
          background="white"
          onClick={onClick}
        >
          <Flag />
        </CellWrapper>
      );

    case "visible":
      if (cell.hasMine) {
        return (
          <CellWrapper
            isHighlighted={isHighlighted}
            background="red"
            onClick={onClick}
          >
            <Mine />
          </CellWrapper>
        );
      } else {
        return (
          <CellWrapper isHighlighted={isHighlighted} onClick={onClick}>
            <Count count={cell.count ?? 0} />
          </CellWrapper>
        );
      }
  }
}
