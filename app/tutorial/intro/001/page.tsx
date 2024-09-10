import { Caption } from "@/components/layout/Caption";
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
          Minesweeper is a game of logic and luck, in which you must reveal all
          the cells without triggering any of the hidden mines.
        </Paragraph>

        <Paragraph>
          By using the numbers as clues and placing flags, it is possible to win
          the game.
        </Paragraph>

        <Center>
          <Caption>Click to play through a winning game</Caption>

          <GameReplay
            levelData={`
              111XXX
              1M2XXX
              112MXX
              XXXXXX        
            `}
            steps={[
              { type: "flag", target: { x: 1, y: 1 } },
              { type: "dig", target: { x: 0, y: 3 } },
              { type: "dig", target: { x: 3, y: 0 } },
              { type: "flag", target: { x: 3, y: 2 } },
              { type: "dig", target: { x: 3, y: 3 } },
            ]}
          />
        </Center>
      </ContentBlock>

      <ContentBlock>
        <Paragraph>
          But take care - revealing a mine is an instant loss!
        </Paragraph>

        <Center>
          <Caption>Click to play through a losing game</Caption>

          <GameReplay
            levelData={`
              111XXX
              1M2XXX
              112MXX
              XXXXXX        
            `}
            steps={[{ type: "dig", target: { x: 1, y: 1 } }]}
          />
        </Center>
      </ContentBlock>

      <PageMenu next="/tutorial/intro/002" nextText="Next lesson" />
    </>
  );
}
