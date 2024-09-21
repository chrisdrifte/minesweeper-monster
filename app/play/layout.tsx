import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import { LinkIcon } from "@/components/navigation/LinkIcon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play Minesweeper",
  description:
    "Play classic minesweeper, customize with your own rules, or solve the daily puzzle",
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <nav className="text-xs">
          <div className="flex justify-center space-x-4">
            <LinkIcon icon={LearnIcon} href="/tutorial/how-to-play/001">
              How to play
            </LinkIcon>
          </div>
        </nav>
      </Header>
      {children}
    </>
  );
}
