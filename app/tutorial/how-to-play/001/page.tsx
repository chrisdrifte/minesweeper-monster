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
          Minesweeper is a game of logic and luck, in which you must solve clues
          and place flags in order to reveal all the cells - without triggering
          any of the hidden mines.
        </Paragraph>

        <Center>
          <Caption>Use the slider to step through a winning game.</Caption>

          <GameReplay
            levelData={`
              XXXXXX
              XXMXXX
              XXXMXX
              XXXXXX        
            `}
            steps={[
              { type: "dig", target: { x: 1, y: 3 } },
              { type: "flag", target: { x: 2, y: 1 } },
              { type: "dig", target: { x: 2, y: 0 } },
              { type: "dig", target: { x: 3, y: 0 } },
              { type: "dig", target: { x: 3, y: 1 } },
              { type: "dig", target: { x: 4, y: 0 } },
              { type: "flag", target: { x: 3, y: 2 } },
              { type: "dig", target: { x: 3, y: 3 } },
            ]}
          />
        </Center>
      </ContentBlock>

      <ContentBlock>
        <Paragraph>Take care - revealing a mine is an instant loss!</Paragraph>
      </ContentBlock>

      <PageMenu next="/tutorial/how-to-play/002" nextText="Next lesson" />
    </>
  );
}
