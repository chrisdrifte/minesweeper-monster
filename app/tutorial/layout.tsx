import { Header } from "@/components/navigation/Header";
import { LinkInline } from "@/components/navigation/LinkInline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to play Minesweeper",
  description: "Learn how to play minesweeper via fun interactive tutorials",
};

export default function TutorialLayout({
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
