import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameTour } from "@/components/game/GameTour";
import { Heading } from "@/components/layout/Heading";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialStrategies001() {
  return (
    <>
      <ContentBlock>
        <Heading>Chording</Heading>
        <Paragraph>
          When a cell is touching the correct number of flags, you can click it
          to reveal all of its hidden neighbors at once.
        </Paragraph>

        <GameTour
          levelData={`
            XXXXX
            XMXMX
            XXXXX
            XXD2D
            MX121
          `}
          steps={[
            {
              type: "dig",
              target: { x: 3, y: 3 },
              description:
                "Click the 2 to reveal all its hidden neighbours at once",
            },
            {
              type: "dig",
              target: { x: 2, y: 4 },
              description:
                "Click the 1 to reveal all its hidden neighbours at once",
            },
            {
              type: "select-flag",
            },
            {
              type: "flag",
              target: { x: 1, y: 2 },
              description: "Let's make a guess that this is a mine",
            },
            {
              type: "select-dig",
            },
            {
              type: "dig",
              target: { x: 1, y: 3 },
              description:
                "Click the 2 to reveal all its hidden neighbours at once",
            },
          ]}
          doneMessage="Oops, chording doesn't protect you from wrong guesses!"
        />
      </ContentBlock>

      <Paragraph>
        Chording is key to playing efficiently. Its name comes from the original
        version of minesweeper, which required you to click both the left and
        the right mouse buttons to reveal the cells.
      </Paragraph>

      <PageMenu
        prev="/tutorial/strategies/002"
        next="/tutorial/strategies/004"
        nextText="Practice"
      />
    </>
  );
}
