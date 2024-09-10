export function Center({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}
