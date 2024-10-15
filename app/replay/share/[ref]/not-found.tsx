import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { Heading } from "@/components/layout/Heading";
import { Paragraph } from "@/components/layout/Paragraph";

export default async function ShareRefNotFoundPage() {
  return (
    <ContentBlock>
      <Center>
        <Heading>Failed to load game data</Heading>
      </Center>
      <Paragraph align="center">
        If you are sure the link is correct, the content may have been deleted.
      </Paragraph>
    </ContentBlock>
  );
}
