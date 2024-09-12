import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import { MenuButton } from "@/components/navigation/MenuButton";
import { MenuWrapper } from "@/components/navigation/MenuWrapper";
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
        <Paragraph>
          Play minesweeper in your browser or on your mobile, totally free and
          without ads.
        </Paragraph>

        <MenuWrapper>
          <MenuButton
            text="Monster Minesweeper (Recommended)"
            href="/play/custom#board"
          />
          <MenuButton text="Classic Beginner" href="/play/beginner#board" />
          <MenuButton
            text="Classic Intermediate"
            href="/play/intermediate#board"
          />
          <MenuButton text="Classic Expert" href="/play/expert#board" />
        </MenuWrapper>
      </ContentBlock>
      <ContentBlock>
        <Center>
          <LearnIcon fill="white" className="size-8" />
        </Center>

        <Paragraph>
          Learn how to play minesweeper via interactive tutorials.
        </Paragraph>

        <MenuWrapper>
          <MenuButton
            text="Minesweeper Rules"
            href="/tutorial/how-to-play/001"
          />
          <MenuButton
            text="Minesweeper Strategies"
            href="/tutorial/strategies/001"
          />
        </MenuWrapper>
      </ContentBlock>
    </>
  );
}
