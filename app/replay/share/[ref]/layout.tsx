import { Header } from "@/components/navigation/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minesweeper Replay",
};

export default function ReplayShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
