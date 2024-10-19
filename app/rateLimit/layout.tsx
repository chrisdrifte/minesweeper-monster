import { Header } from "@/components/navigation/Header";
import { LinkInline } from "@/components/navigation/LinkInline";

export default function RateLimitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <nav className="text-xs">
          <div className="flex justify-center space-x-4">
            <LinkInline href="/play/beginner">Play now</LinkInline>
          </div>
        </nav>
      </Header>
      {children}
    </>
  );
}
