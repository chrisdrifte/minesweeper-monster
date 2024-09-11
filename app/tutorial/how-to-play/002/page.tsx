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
          Most cells contain a number which represents the number of adjacent
          mines. For example, a cell which contains <Count count={1} /> can only
          be adjacent to exactly one mine. A cell which contains{" "}
          <Count count={2} /> can only be adjacent to exactly two mines. And so
          on.
        </Paragraph>

        <Paragraph>
          Finding cells without numbers is helpful too - they open up all other
          the empty cells around them!
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
                "Nice, the empty cell gave enough clues to place some flags. Let's switch to flag mode.",
            },
            {
              type: "flag",
              target: { x: 2, y: 2 },
              description:
                "We can deduce from the 1 that the first mine is here. We should flag it!",
            },
            {
              type: "flag",
              target: { x: 3, y: 2 },
              description:
                "And based on the 2, this is the only place the other mine could be. Place another flag.",
            },
            {
              type: "select-dig",
              description:
                "Perfect - each cell is next to the correct number of mines. Let's switch back to dig mode.",
            },
            {
              type: "dig",
              target: { x: 4, y: 2 },
              description:
                "Reveal the final cell to win the game. Hopefully it isn't a mine!",
            },
          ]}
        />
      </ContentBlock>
      <PageMenu
        prev="/tutorial/how-to-play/001"
        next="/tutorial/how-to-play/003"
        nextText="Next lesson"
      />
    </>
  );
}
