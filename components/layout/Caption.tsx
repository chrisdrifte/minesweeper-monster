export function Caption({ children }: React.PropsWithChildren) {
  return (
    <div className="text-sm text-gray-500 mb-8 mx-6 font-bold text-center">
      {children}
    </div>
  );
}
