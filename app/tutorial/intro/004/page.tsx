import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameTour } from "@/components/game/GameTour";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro004() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          Clicking an empty cell reveals all the cells around it!
        </Paragraph>

        <GameTour
          levelData={`
            XXXXX
            XXXXX
            XXMMX
            XXMXX
            XXXXX
          `}
          steps={[{ type: "dig", target: { x: 0, y: 0 } }]}
        />
      </ContentBlock>

      <PageMenu
        prev="/tutorial/intro/003"
        next="/tutorial/intro/005"
        nextText="Next lesson"
      />
    </>
  );
}
