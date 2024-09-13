import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/navigation/Footer";
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
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased bg-bg text-fg-100 flex flex-col items-center">
        <main className="max-w-[568px] w-full px-4">
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
