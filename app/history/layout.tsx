import { Header } from "@/components/navigation/Header";
import { LinkInline } from "@/components/navigation/LinkInline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minesweeper Replay",
};

export default function ReplayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <nav className="text-xs">
          <div className="flex justify-center space-x-4">
            <LinkInline href="/">Main menu</LinkInline>
          </div>
        </nav>
      </Header>
      {children}
    </>
  );
}
