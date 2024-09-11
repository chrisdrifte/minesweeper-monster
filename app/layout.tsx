import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/navigation/Footer";
import type { Metadata } from "next";

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
        <main className="max-w-[450px] w-full px-4">
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
