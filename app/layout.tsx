import "./globals.css";

import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <main className="flex flex-col items-center">
          <header className="m-8">
            <hgroup>
              <h1>
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
