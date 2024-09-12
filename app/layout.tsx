import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/navigation/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minesweeper Monster",
  description:
    "Play minesweeper for free, without ads, or learn via interactive tutorials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white flex flex-col items-center">
        <main className="max-w-[568px] w-full px-4">
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
