import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameTour } from "@/components/game/GameTour";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro003() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          If you suspect that a cell contains a mine, you can "flag" it.
        </Paragraph>

        <GameTour
          levelData={`
            1221
            1MM1
            1221
          `}
          steps={[
            { type: "select-flag" },
            { type: "flag", target: { x: 1, y: 1 } },
            { type: "flag", target: { x: 2, y: 1 } },
          ]}
        />
      </ContentBlock>

      <PageMenu
        prev="/tutorial/intro/002"
        next="/tutorial/intro/004"
        nextText="Next lesson"
      />
    </>
  );
}
