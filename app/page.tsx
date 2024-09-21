import { ButtonWrapper } from "@/components/layout/ButtonWrapper";
import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import { LinkButton } from "@/components/navigation/LinkButton";
import { LinkInline } from "@/components/navigation/LinkInline";
import { MainMenu } from "@/components/game/MainMenu";
import { Paragraph } from "@/components/layout/Paragraph";
import { getCampaignLevel } from "@/game/campaign/getCampaignLevel";
import { getDailySolution } from "@/components/game/daily/getDailySolution";

export default function IndexPage() {
  const initialDailySolution = getDailySolution();
  const initialCampaignLevel = getCampaignLevel();

  return (
    <>
      <Header />

      <Center>
        <GameStatic
          levelData={`
            111
            1M1
            111
          `}
          revealAllCells
        />
      </Center>
      <ContentBlock>
        <Paragraph align="center">
          Welcome to Minesweeper Monster! 👋
          <br /> Start with a{" "}
          <LinkInline href="/tutorial/how-to-play/001">
            two minute tutorial
          </LinkInline>{" "}
          or a <LinkInline href="/play/custom#board">quick game</LinkInline>.
        </Paragraph>

        <Paragraph align="center">Or select a game mode:</Paragraph>

        <MainMenu
          initialDailySolution={initialDailySolution}
          initialCampaignLevel={initialCampaignLevel}
        />
      </ContentBlock>
      <ContentBlock>
        <Center>
          <LearnIcon className="size-8 fill-fg-100" />
        </Center>

        <Paragraph>
          Learn how to play minesweeper via interactive tutorials.
        </Paragraph>

        <ButtonWrapper>
          <LinkButton href="/tutorial/how-to-play/001">
            Minesweeper Rules
          </LinkButton>
          <LinkButton href="/tutorial/strategies/001">
            Minesweeper Strategies
          </LinkButton>
        </ButtonWrapper>
      </ContentBlock>
    </>
  );
}
