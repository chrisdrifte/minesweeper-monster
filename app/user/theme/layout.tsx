import { Header } from "@/components/navigation/Header";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monster Minesweeper | Select Theme",
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
            <Link
              href="/play/beginner"
              className="text-fg-100 underline sm:hover:no-underline"
            >
              Play now
            </Link>
          </div>
        </nav>
      </Header>
      {children}
    </>
  );
}
