export type BoardWrapperProps = {
  width: number;
  height: number;
};

export function BoardWrapper({
  width,
  height,
  children,
}: React.PropsWithChildren<BoardWrapperProps>) {
  return (
    <div className="border-4 rounded-lg border-white w-min h-min p-2 my-4">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${width}, 32px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
