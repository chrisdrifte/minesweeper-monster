import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameReplay } from "@/components/game/GameReplay";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro001() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          Minesweeper consists of a grid of cells, like the one below. Some
          cells contain mines. You lose the game by clicking a cell with a mine.
        </Paragraph>

        <Center>
          <GameReplay
            levelData={`
              XXX
              XMX
              XXX
            `}
            steps={[{ type: "dig", target: { x: 1, y: 1 } }]}
          />
        </Center>
      </ContentBlock>
      <PageMenu next="/tutorial/intro/002" nextText="Next lesson" />
    </>
  );
}
