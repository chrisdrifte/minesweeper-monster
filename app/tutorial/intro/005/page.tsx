import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameReplay } from "@/components/game/GameReplay";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro005() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          Win the game by revealing all the cells that do not contain mines
        </Paragraph>

        <Center>
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

      <PageMenu
        prev="/tutorial/intro/004"
        next="/tutorial/intro/006"
        nextText="Next Lesson"
      />
    </>
  );
}
