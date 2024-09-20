import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlayFromSettings } from "@/components/game/GamePlayFromSettings";
import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";
import { difficulties } from "@/config/difficulties";

export default function TutorialStrategies002() {
  return (
    <>
      <ContentBlock>
        <Heading>Practice!</Heading>
        <Paragraph>
          Test out your new strategies with a quick game of minesweeper:
        </Paragraph>

        <GamePlayFromSettings settings={difficulties["practice"]} showRestart />

        <Paragraph>
          Or see if you can complete all the levels in{" "}
          <Link
            href="/play/campaign#board"
            className="underline sm:hover:no-underline"
          >
            campaign mode
          </Link>
          .
        </Paragraph>
      </ContentBlock>

      <PageMenu prev="/tutorial/strategies/003" next="/" nextText="Finish" />
    </>
  );
}
