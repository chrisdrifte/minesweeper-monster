import { Center } from "../layout/Center";

export type FooterProps = {};

export function Footer({}: React.PropsWithChildren<FooterProps>) {
  return (
    <footer className="mt-16 mb-8 text-gray-500 text-xs">
      <Center>Built by Chris Drifte</Center>
    </footer>
  );
}
