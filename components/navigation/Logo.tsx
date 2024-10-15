import Link from "next/link";
import { spaceMono } from "@/app/fonts";

export function Logo() {
  return (
    <h1 className={spaceMono.className}>
      <Link href="/">
        <strong>MINESWEEPER</strong>
        <span className="text-fg-alt">.MONSTER</span>
        {process.env.IS_PREVIEW && <sup className="px-2 text-fg-50">BETA</sup>}
      </Link>
    </h1>
  );
}
