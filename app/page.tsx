import { ButtonWrapper } from "@/components/navigation/ButtonWrapper";
import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import Link from "next/link";
import { MainMenu } from "@/components/game/MainMenu";
import { MenuButton } from "@/components/navigation/MenuButton";
import { Paragraph } from "@/components/layout/Paragraph";
import { getCampaignLevel } from "@/game/campaign/getCampaignLevel";

export default function IndexPage() {
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
          Welcome to visitors from r/webdev and NextJS Weekly! 👋
          <br /> Start with a{" "}
          <Link
            href="/tutorial/how-to-play/001"
            className="underline sm:hover:no-underline"
          >
            two minute tutorial
          </Link>{" "}
          or a{" "}
          <Link
            href="/play/custom#board"
            className="underline sm:hover:no-underline"
          >
            quick game
          </Link>
          .
        </Paragraph>

        <Paragraph>Select a game mode:</Paragraph>

        <MainMenu initialCampaignLevel={initialCampaignLevel} />
      </ContentBlock>
      <ContentBlock>
        <Center>
          <LearnIcon className="size-8 fill-fg-100" />
        </Center>

        <Paragraph>
          Learn how to play minesweeper via interactive tutorials.
        </Paragraph>

        <ButtonWrapper>
          <MenuButton
            text="Minesweeper Rules"
            href="/tutorial/how-to-play/001"
          />
          <MenuButton
            text="Minesweeper Strategies"
            href="/tutorial/strategies/001"
          />
        </ButtonWrapper>
      </ContentBlock>
    </>
  );
}
