import Link from "next/link";
import { spaceMono } from "@/app/fonts";

export function Logo() {
  return (
    <h1 className={spaceMono.className}>
      <Link href="/">
        <strong>MINESWEEPER</strong>
        <span className="text-fg-alt">.MONSTER</span>
      </Link>
    </h1>
  );
}
