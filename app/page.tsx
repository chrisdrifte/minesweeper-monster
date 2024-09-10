"use client";

import Link from "next/link";

export default function StartScreen() {
  return (
    <div>
      <div className="my-8">
        Play the classic minesweeper game in your browser!
      </div>
      <div className="flex flex-col">
        <Link href="/tutorial/intro/001">Tutorial</Link>
        <Link href="/game">Play</Link>
      </div>
    </div>
  );
}
