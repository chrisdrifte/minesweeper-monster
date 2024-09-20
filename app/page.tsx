import { ButtonWrapper } from "@/components/navigation/ButtonWrapper";
import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import Link from "next/link";
import { MenuButton } from "@/components/navigation/MenuButton";
import { Paragraph } from "@/components/layout/Paragraph";

export default function IndexPage() {
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
          Welcome to visitors from NextJS Weekly! 👋
          <br /> Why not start with a{" "}
          <Link
            href="/tutorial/how-to-play/001"
            className="underline sm:hover:no-underline"
          >
            two minute tutorial
          </Link>
          ?
        </Paragraph>

        <Paragraph>Select a game mode:</Paragraph>

        <ButtonWrapper>
          <MenuButton
            text="Monster Minesweeper (Recommended)"
            href="/play/custom#board"
          />
          <MenuButton text="Daily Puzzle" href="/play/daily#board" />
          <MenuButton text="Classic Beginner" href="/play/beginner#board" />
          <MenuButton
            text="Classic Intermediate"
            href="/play/intermediate#board"
          />
          <MenuButton text="Classic Expert" href="/play/expert#board" />{" "}
          <MenuButton text="Campaign" href="/play/campaign#board" />
        </ButtonWrapper>
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
