import { Center } from "../layout/Center";

export function Footer({}: React.PropsWithChildren) {
  return (
    <footer className="mt-16 mb-8 text-fg-50 text-xs">
      <Center>
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
      </Center>
    </footer>
  );
}
