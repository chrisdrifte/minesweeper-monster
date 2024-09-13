export function Caption({ children }: React.PropsWithChildren) {
  return (
    <div className="text-sm text-fg-50 mb-8 mx-6 font-bold text-center">
      {children}
    </div>
  );
}
