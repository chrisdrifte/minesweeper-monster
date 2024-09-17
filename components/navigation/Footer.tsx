import { Center } from "../layout/Center";
import Link from "next/link";

export function Footer({}: React.PropsWithChildren) {
  return (
    <footer className="mt-16 mb-8 text-fg-50 text-xs">
      <Center>
        <div className="flex space-x-2">
          <span>
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/chris-drifte/"
              target="_blank"
              className="underline sm:hover:no-underline"
            >
              Chris Drifte
            </a>
          </span>
          <span>|</span>
          <span>
            <Link
              href="/user/theme"
              className="underline sm:hover:no-underline"
            >
              Select Theme
            </Link>
          </span>
          <span>|</span>
          <span>
            <Link
              href="/about/terms"
              className="underline sm:hover:no-underline"
            >
              Terms
            </Link>
          </span>
        </div>
      </Center>
    </footer>
  );
}
