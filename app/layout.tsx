import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/navigation/Footer";
import type { Metadata } from "next";
import { getCurrentTheme } from "@/game/theme/getCurrentTheme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Monster Minesweeper",
  description:
    "A fully customizable minesweeper game with interactive tutorials",
  robots: {
    index: !process.env.IS_PREVIEW,
    follow: !process.env.IS_PREVIEW,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentTheme = getCurrentTheme();

  return (
    <html lang="en" data-theme={currentTheme.id}>
      <body className="antialiased bg-bg text-fg-100 flex flex-col items-center select-none sm:select-auto">
        <main className="max-w-[568px] w-full px-4">
          {children}
          <Footer />
        </main>

        <div className="halloween hidden">
          <div className="opacity-20">
            {[...Array(20).keys()].map((key) => (
              <hr
                key={key}
                className="rain"
                style={{
                  left: Math.floor(Math.random() * 100) + "vw",
                  animationDuration: 0.2 + Math.random() * 0.3 + "s",
                  animationDelay: Math.random() * 5 + "s",
                }}
              />
            ))}
          </div>
          <div className="fog">
            <img src="/halloween/fog1.png" alt="" loading="lazy" />
            <img src="/halloween/fog2.png" alt="" loading="lazy" />
            <img src="/halloween/fog3.png" alt="" loading="lazy" />
            <img src="/halloween/fog4.png" alt="" loading="lazy" />
            <img src="/halloween/fog5.png" alt="" loading="lazy" />
            <img src="/halloween/fog1.png" alt="" loading="lazy" />
            <img src="/halloween/fog2.png" alt="" loading="lazy" />
            <img src="/halloween/fog3.png" alt="" loading="lazy" />
            <img src="/halloween/fog4.png" alt="" loading="lazy" />
            <img src="/halloween/fog5.png" alt="" loading="lazy" />
          </div>
        </div>

        <Analytics />
      </body>
    </html>
  );
}
