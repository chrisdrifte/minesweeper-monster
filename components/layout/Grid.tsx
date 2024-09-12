export function Grid({ children }: React.PropsWithChildren) {
  return <div className="grid gap-4 grid-cols-2">{children}</div>;
}
