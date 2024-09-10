import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { GameTour } from "@/components/game/GameTour";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro002() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          Clicking a cell next to a mine will reveal a number.
        </Paragraph>
        <GameTour
          levelData={`
          XXX
          XMX
          XXX
        `}
          steps={[{ type: "dig", target: { x: 0, y: 0 } }]}
        />
      </ContentBlock>
      <ContentBlock>
        <Paragraph>
          The number corresponds to the number of mines that the cell is
          touching.
        </Paragraph>
        <Center>
          <GameStatic
            levelData={`
          12321
          1MMM1
          12321
        `}
          />
        </Center>
      </ContentBlock>
      <PageMenu
        prev="/tutorial/intro/001"
        next="/tutorial/intro/003"
        nextText="Next lesson"
      />
    </>
  );
}
