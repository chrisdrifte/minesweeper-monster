import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monster Minesweeper",
  description:
    "A fully customizable minesweeper game with interactive tutorials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
