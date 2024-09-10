import classNames from "classnames";

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
  return (
    <div
      className={classNames(
        {
          // places a triangle in the bottom-left to create an outer corner without removing the inner curve
          "before:content-[''] before:block before:absolute before:-bottom-1 before:-left-1 before:border-white before:size-[0px] before:border-r-transparent before:border-t-transparent before:border-4":
            hasControls,

          // places a triangle in the bottom-right to create an outer corner without removing the inner curve
          "after:content-[''] after:block after:absolute after:-bottom-1 after:-right-1 after:border-white after:size-[0px] after:border-l-transparent after:border-t-transparent after:border-4":
            hasControls,

          // shrinks the board area if no controls are present
          "w-full": hasControls,
          "w-min": !hasControls,
        },
        "relative border-4 rounded-lg border-white h-min p-2 flex justify-center"
      )}
    >
      <div
        className="grid"
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
