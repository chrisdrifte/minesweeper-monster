import { Center } from "../layout/Center";
import { LinkInline } from "./LinkInline";

export function Footer({}: React.PropsWithChildren) {
  return (
    <footer className="mt-16 mb-8 text-fg-50 text-xs">
      <Center>
        <div className="flex space-x-2">
          <span>
            Built by{" "}
            <LinkInline href="https://www.linkedin.com/in/chris-drifte/" newTab>
              Chris Drifte
            </LinkInline>
          </span>
          <span>|</span>
          <span>
            <LinkInline href="/user/theme">Select Theme</LinkInline>
          </span>
          <span>|</span>
          <span>
            <LinkInline href="/about/terms">Terms</LinkInline>
          </span>
        </div>
      </Center>
    </footer>
  );
}
