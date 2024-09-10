export function MenuWrapper({ children }: React.PropsWithChildren) {
  return <nav className="flex flex-col space-y-4">{children}</nav>;
}
