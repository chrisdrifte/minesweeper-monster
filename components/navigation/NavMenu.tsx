import { HomeIcon } from "../icons/HomeIcon";
import { LearnIcon } from "../icons/LearnIcon";
import Link from "next/link";

export function NavMenu() {
  return (
    <nav className="text-xs mt-32 mb-16 mx-8">
      <div className="flex justify-center m-8 space-x-4">
        <Link href="/" className="text-white flex space-x-2 items-center">
          <HomeIcon fill="white" className="size-4" />
          <span>Home</span>
        </Link>

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
