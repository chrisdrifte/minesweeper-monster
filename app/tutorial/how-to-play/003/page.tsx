import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlay } from "@/components/game/GamePlay";
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

        <GamePlay
          levelData={`
            1221XM
            1MM2XM
            134MXX
            XXMXXX       
          `}
        />
      </ContentBlock>

      <Paragraph>
        Congratulations! You now have all the skills you need to start playing
        for real.
      </Paragraph>

      <PageMenu prev="/tutorial/how-to-play/002" next="/" nextText="Finish" />
    </>
  );
}
