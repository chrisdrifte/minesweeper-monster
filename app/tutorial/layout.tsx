import type { Metadata } from "next";
import { NavMenu } from "@/components/navigation/NavMenu";

export const metadata: Metadata = {
  title: "Minesweeper Tutorial",
  description: "Learn how to play minesweeper",
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
