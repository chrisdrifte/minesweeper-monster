import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play Minesweeper",
  description: "Play minesweeper on easy, hard, or expert modes",
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
            <Link
              href="/tutorial/how-to-play/001"
              className="text-white flex space-x-2 items-center"
            >
              <LearnIcon fill="white" className="size-4" />
              <span>How to play</span>
            </Link>
          </div>
        </nav>
      </Header>
      {children}
    </>
  );
}
