import { HomeIcon } from "../icons/HomeIcon";
import { LearnIcon } from "../icons/LearnIcon";
import Link from "next/link";

export function NavMenu() {
  return (
    <nav className="text-xs mt-32 mb-16 mx-8">
      <div className="flex justify-center m-8 space-x-4">
        <Link
          href="/"
          title="Back to home"
          className="text-white flex space-x-2"
        >
          <HomeIcon fill="white" className="size-4" />
          <span>Home</span>
        </Link>

        <Link
          href="/tutorial/intro/001"
          title="Back to home"
          className="text-white flex space-x-2"
        >
          <LearnIcon fill="white" className="size-4" />
          <span>Guide</span>
        </Link>
      </div>
    </nav>
  );
}
