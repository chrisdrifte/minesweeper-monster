import { Center } from "@/components/layout/Center";
import { Heading } from "@/components/layout/Heading";
import { Paragraph } from "@/components/layout/Paragraph";

export default async function RateLimitPage() {
  return (
    <Center>
      <Heading>Sorry, you are doing that too much</Heading>
      <Paragraph>
        To keep this game free, you'll have to wait a little while before you
        can access this page again.
      </Paragraph>
    </Center>
  );
}
