import { ContentBlock } from "@/components/layout/ContentBlock";
import GamePlayWithRestart from "@/components/game/GamePlayWithRestart";
import { Heading } from "@/components/layout/Heading";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialStrategies002() {
  return (
    <>
      <ContentBlock>
        <Heading>Practice!</Heading>
        <Paragraph>
          Test out your new strategies with a quick game of minesweeper:
        </Paragraph>

        <GamePlayWithRestart settings={{ width: 8, height: 8, numMines: 8 }} />
      </ContentBlock>

      <PageMenu prev="/tutorial/strategies/001" next="/" nextText="Finish" />
    </>
  );
}
