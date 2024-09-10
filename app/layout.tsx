import "./globals.css";

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
      <body className={` antialiased bg-black text-white`}>
        <main className="flex flex-col items-center">
          <header className="m-8">
            <hgroup>
              <h1 className={spaceMono.className}>
                <Link href="/">Minesweeper</Link>
              </h1>
            </hgroup>
          </header>

          <div className="w-96">{children}</div>
        </main>
      </body>
    </html>
  );
}
