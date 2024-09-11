import "./globals.css";

import { Center } from "@/components/layout/Center";
import { Footer } from "@/components/navigation/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { spaceMono } from "./fonts";

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
    <html lang="en">
      <body className="antialiased bg-black text-white flex flex-col items-center">
        <main className="max-w-[450px] w-full">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
