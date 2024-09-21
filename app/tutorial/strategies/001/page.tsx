import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Heading } from "@/components/layout/Heading";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro002() {
  return (
    <>
      <ContentBlock>
        <Heading>Starting move</Heading>

        <Paragraph>
          In classic minesweeper, it's best to start by digging some or all of
          the corners. These are cells which are least likely to touch any
          mines, so they could open up the board.
        </Paragraph>

        <Center>
          <GameStatic
            levelData={`
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            `}
            annotations={{
              "0,0": "info",
              "0,8": "info",
              "8,0": "info",
              "8,8": "info",
            }}
          />
        </Center>
      </ContentBlock>

      <ContentBlock>
        <Paragraph>
          In custom games, <strong>"no adjacent mines on first click"</strong>{" "}
          may be enabled. In this mode it's better to start somewhere in the
          center, as the surrounding cells are guaranteed to be empty.
        </Paragraph>

        <Center>
          <GameStatic
            levelData={`
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            XXXXXXXXX
            `}
            annotations={{
              "4,4": "safe", // center
              "4,3": "safe", // top
              "5,3": "safe", // top right
              "5,4": "safe", // right
              "5,5": "safe", // bottom right
              "4,5": "safe", // bottom
              "3,5": "safe", // bottom left
              "3,4": "safe", // left
              "3,3": "safe", // top left
            }}
          />
        </Center>

        <Paragraph>
          Note that you cannot place flags until you've made your starting move.
        </Paragraph>
      </ContentBlock>

      <PageMenu next="/tutorial/strategies/002" nextText="Next lesson" />
    </>
  );
}
