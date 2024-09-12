import { Caption } from "@/components/layout/Caption";
import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { GameTour } from "@/components/game/GameTour";
import { Heading } from "@/components/layout/Heading";
import { MinesCount } from "@/components/cells/MinesCount";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro002() {
  return (
    <>
      <ContentBlock>
        <Heading>Finding Mines</Heading>

        <Paragraph>
          Cells display the number of mines they are touching. This allows you
          to use logic to avoid mines and dig safely.
        </Paragraph>

        <Center>
          <Caption>
            The flagged cell must be a mine, because it is the only cell
            touching <MinesCount count={1} />.
          </Caption>
          <GameStatic
            levelData={`
              XX10
              XD10
              1110
              0000
            `}
            annotations={{
              "1,1": "mine",
              "2,2": "info",
            }}
          />
        </Center>
      </ContentBlock>

      <ContentBlock>
        <Caption>
          All the <MinesCount count={1} />s already touch a flag, so you can
          safely dig the adjacent cells.
        </Caption>

        <Center>
          <GameStatic
            levelData={`
              XX10
              XD10
              1110
              0000
            `}
            annotations={{
              "0,1": "safe",
              "1,0": "safe",
            }}
          />
        </Center>

        <Paragraph>
          If a cell doesn't touch any mines, it is empty. Digging an empty cell
          reveals all the cells around them. Empty cells are often found in the
          corners of the board, so they are a good place to start playing.
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
