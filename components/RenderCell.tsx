import { Cell } from "@/types/Cell";
import { CellWrapper } from "./CellWrapper";
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
        <CellWrapper isHighlighted={isHighlighted} onClick={onClick}>
          X
        </CellWrapper>
      );

    case "flagged":
      return (
        <CellWrapper isHighlighted={isHighlighted} onClick={onClick}>
          F
        </CellWrapper>
      );

    case "visible":
      if (cell.hasMine) {
        return (
          <CellWrapper isHighlighted={isHighlighted} onClick={onClick}>
            M
          </CellWrapper>
        );
      } else {
        return (
          <CellWrapper isHighlighted={isHighlighted} onClick={onClick}>
            {cell.count}
          </CellWrapper>
        );
      }
  }
}
