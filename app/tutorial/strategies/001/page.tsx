import { Caption } from "@/components/layout/Caption";
import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/layout/Heading";
import { MinesCount } from "@/components/cells/MinesCount";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialStrategies001() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          The first step in any minesweeper game is to use the numbered cells to
          find and flag mines. Luckily, some common patterns appear in almost
          every game.
        </Paragraph>

        <Heading>1. Corners</Heading>
        <Paragraph>
          Corners are often the easiest cells to flag, especially at the start
          of a game.
        </Paragraph>

        <Center>
          <Caption>
            The top-right <MinesCount count={1} /> touches exactly one cell
            (flagged), which must contain a mine.
          </Caption>
          <GameStatic
            levelData={`
              0000
              1110
              XD10
              XX10
            `}
          />
        </Center>

        <Paragraph>
          Corner variations tend to have very simple solutions.
        </Paragraph>

        <Center>
          <Grid>
            <GameStatic
              levelData={`
                0000
                1110
                XD20
                XD20
              `}
            />
            <GameStatic
              levelData={`
                0000
                1100
                D210
                XD10
              `}
            />
            <GameStatic
              levelData={`
                0000
                2210
                DD20
                XD20
              `}
            />
            <GameStatic
              levelData={`
                0000
                1100
                D310
                DD10
              `}
            />
          </Grid>
        </Center>

        <Heading>2. Edges</Heading>
        <Paragraph>
          When multiple mines are in horizontal or vertical lines, they form
          distinctive patterns of numbers.
        </Paragraph>

        <Center>
          <Grid>
            <GameStatic
              levelData={`
              00000
              12321
              XDDDX
              XXXXX
            `}
            />
            <GameStatic
              levelData={`
              00000
              23332
              DDDDD
              XXXXX
            `}
            />
          </Grid>
        </Center>

        <Heading>3. Bridges</Heading>
        <Paragraph>
          When two mines are close, they often share several{" "}
          <MinesCount count={2} />s which act as a bridge between them.
        </Paragraph>

        <Center>
          <GameStatic
            levelData={`
              00000
              11211
              XD2DX
              XX2XX
            `}
          />
        </Center>
      </ContentBlock>

      <PageMenu next="/tutorial/strategies/002" nextText="Practice" />
    </>
  );
}
