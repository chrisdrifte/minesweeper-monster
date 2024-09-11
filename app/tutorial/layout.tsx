import { Header } from "@/components/navigation/Header";
import { HomeIcon } from "@/components/icons/HomeIcon";
import Link from "next/link";
import type { Metadata } from "next";
import { Mine } from "@/components/cells/Mine";

export const metadata: Metadata = {
  title: "How to play Minesweeper",
  description: "Learn how to play minesweeper with these interactive lessons",
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
              href="/play/easy"
              className="text-white flex space-x-2 items-center"
            >
              <span>Play now</span>
            </Link>
          </div>
        </nav>
      </Header>
      {children}
    </>
  );
}
