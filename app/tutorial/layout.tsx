import type { Metadata } from "next";
import { NavMenu } from "@/components/navigation/NavMenu";

export const metadata: Metadata = {
  title: "How to play Minesweeper",
  description: "Learn how to play minesweeper with these interactive lessons",
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
