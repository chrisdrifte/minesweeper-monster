import { LearnIcon } from "../icons/LearnIcon";
import Link from "next/link";

export function NavMenu() {
  return (
    <nav className="text-xs">
      <div className="flex justify-center space-x-4">
        <Link
          href="/tutorial/intro/001"
          className="text-white flex space-x-2 items-center"
        >
          <LearnIcon fill="white" className="size-4" />
          <span>How to play</span>
        </Link>
      </div>
    </nav>
  );
}
