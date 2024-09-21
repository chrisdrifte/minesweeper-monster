import Link from "next/link";

export type LinkInlineProps = {
  href: string;
  newTab?: boolean;
};

export function LinkInline({
  children,
  href,
  newTab = false,
}: React.PropsWithChildren<LinkInlineProps>) {
  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link
      href={href}
      className="underline sm:hover:no-underline"
      {...newTabProps}
    >
      {children}
    </Link>
  );
}
