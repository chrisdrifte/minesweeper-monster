import type { Metadata } from "next";
import { NavMenu } from "@/components/navigation/NavMenu";

export const metadata: Metadata = {
  title: "Play Minesweeper",
  description: "Play minesweeper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <NavMenu />
    </>
  );
}
