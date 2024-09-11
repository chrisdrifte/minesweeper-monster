export function Grid({ children }: React.PropsWithChildren) {
  return <h2 className="grid gap-4 grid-cols-2">{children}</h2>;
}
