import { ContentBlock } from "@/components/layout/ContentBlock";
import { Count } from "@/components/cells/Count";
import { GameTour } from "@/components/game/GameTour";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro002() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          Some cells contain numbers which tell you how many mines they are
          touching.
        </Paragraph>

        <Paragraph>
          Other cells are empty, and let you open up large areas of the board.
        </Paragraph>

        <GameTour
          levelData={`
            XXXXX
            XXXXX
            XXMMX
            XXXXX
            XXXXX
          `}
          steps={[
            { type: "dig", target: { x: 0, y: 0 } },
            {
              type: "select-flag",
              description:
                "Nice, the empty cell gave enough clues to place flags",
            },
            {
              type: "flag",
              target: { x: 2, y: 2 },
              description:
                "This cell must be a mine, because the ones are touching it",
            },
            {
              type: "flag",
              target: { x: 3, y: 2 },
              description:
                "This cell must be a mine, because the twos are touching it",
            },
            {
              type: "select-dig",
              description:
                "The final cell must be safe, because each cell is touching the same number of mines as its value",
            },
            {
              type: "dig",
              target: { x: 4, y: 2 },
              description: "Digging this cell will finish the game",
            },
          ]}
        />

        <Paragraph>In the game above, we used the following logic:</Paragraph>

        <Paragraph>
          If a <Count count={2} /> touches exactly two unrevealed cells, they
          must both be mines.
        </Paragraph>

        <Paragraph>
          If a <Count count={1} /> is already touching exactly one mine, all the
          other cells around it must be safe.
        </Paragraph>
      </ContentBlock>
      <PageMenu
        prev="/tutorial/intro/001"
        next="/tutorial/intro/003"
        nextText="Next lesson"
      />
    </>
  );
}
