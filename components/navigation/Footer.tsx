import { Center } from "../layout/Center";

export function Footer({}: React.PropsWithChildren) {
  return (
    <footer className="mt-16 mb-8 text-gray-500 text-xs">
      <Center>Built by Chris Drifte</Center>
    </footer>
  );
}
