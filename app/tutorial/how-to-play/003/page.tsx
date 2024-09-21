import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlayFromLevelData } from "@/components/game/GamePlayFromLevelData";
import { LinkInline } from "@/components/navigation/LinkInline";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TutorialIntro003() {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          Sometimes it is not possible to use logic alone. When multiple cells
          could contain mines, you have to guess.
        </Paragraph>

        <Paragraph>Are you feeling lucky?</Paragraph>

        <GamePlayFromLevelData
          levelData={`
            XMMX
            X22X
            X22X
            XMMX       
          `}
          showRestart
        />
      </ContentBlock>

      <Paragraph>
        Congratulations! You now have all the skills you need to{" "}
        <LinkInline href="/">start playing for real</LinkInline>.
      </Paragraph>

      <Paragraph>
        Why not keep practicing with the{" "}
        <LinkInline href="/play/daily#board">daily puzzle</LinkInline>?
      </Paragraph>

      <PageMenu
        prev="/tutorial/how-to-play/002"
        next="/tutorial/strategies/001"
        nextText="Advanced Strategies"
      />
    </>
  );
}
