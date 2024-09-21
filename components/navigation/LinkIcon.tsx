import Link from "next/link";

export type LinkIconProps = {
  icon: React.FC<{ className?: string }>;
  href: string;
};

export function LinkIcon({
  icon: Icon,
  children,
  href,
}: React.PropsWithChildren<LinkIconProps>) {
  return (
    <Link href={href} className="flex space-x-2 items-center group">
      <Icon className="size-4 fill-fg-100" />
      <span className="underline sm:group-hover:no-underline">{children}</span>
    </Link>
  );
}
