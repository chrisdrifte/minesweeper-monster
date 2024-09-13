import classNames from "classnames";
import useWindowSize from "@/hooks/useWindowSize";

export type BoardWrapperProps = {
  width: number;
  height: number;
  hasControls?: boolean;
};

export function BoardWrapper({
  width,
  height,
  hasControls = false,
  children,
}: React.PropsWithChildren<BoardWrapperProps>) {
  const { width: windowWidth } = useWindowSize();
  const minBoardWidth = 568;
  const boardWidth = width * 32 + 24;
  const shouldUseBoardWidth =
    boardWidth < windowWidth - 32 && boardWidth > minBoardWidth;

  return (
    <div
      id="#board"
      className={classNames(
        {
          // places a triangle in the bottom-left to create an outer corner without removing the inner curve
          "before:content-[''] before:block before:absolute before:-bottom-1 before:-left-1 before:border-fg-100 before:size-[0px] before:border-r-transparent before:border-t-transparent before:border-4":
            hasControls,

          // places a triangle in the bottom-right to create an outer corner without removing the inner curve
          "after:content-[''] after:block after:absolute after:-bottom-1 after:-right-1 after:border-fg-100 after:size-[0px] after:border-l-transparent after:border-t-transparent after:border-4":
            hasControls,

          // shrinks the board area if no controls are present
          "w-full": hasControls,
          "w-min": !hasControls,
        },
        "relative border-4 rounded-lg border-fg-100 h-min p-2 flex justify-center select-none"
      )}
      style={shouldUseBoardWidth ? { width: boardWidth } : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div
        className="grid overflow-auto overscroll-none"
        style={{
          gridTemplateColumns: `repeat(${width}, 32px)`,
          gridTemplateRows: `repeat(${height}, 32px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
