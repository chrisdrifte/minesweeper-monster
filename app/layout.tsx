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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentTheme = getCurrentTheme();

  console.log(currentTheme);

  return (
    <html lang="en" data-theme={currentTheme.id}>
      <body className="antialiased bg-bg text-fg-100 flex flex-col items-center select-none sm:select-auto">
        <main className="max-w-[568px] w-full px-4">
          {children}
          <Footer />
        </main>

        {currentTheme.id === "halloween" && (
          <>
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
            <div className="fog hidden">
              <img src="/halloween/fog1.png" role="presentation" />
              <img src="/halloween/fog2.png" role="presentation" />
              <img src="/halloween/fog3.png" role="presentation" />
              <img src="/halloween/fog4.png" role="presentation" />
              <img src="/halloween/fog5.png" role="presentation" />
              <img src="/halloween/fog1.png" role="presentation" />
              <img src="/halloween/fog2.png" role="presentation" />
              <img src="/halloween/fog3.png" role="presentation" />
              <img src="/halloween/fog4.png" role="presentation" />
              <img src="/halloween/fog5.png" role="presentation" />
            </div>
          </>
        )}

        <Analytics />
      </body>
    </html>
  );
}
