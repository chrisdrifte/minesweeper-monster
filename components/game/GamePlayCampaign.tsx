"use client";

import { ButtonWrapper } from "../navigation/ButtonWrapper";
import { FormButton } from "../navigation/FormButton";
import { GamePlayFromLevelData } from "@/components/game/GamePlayFromLevelData";
import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { Paragraph } from "@/components/layout/Paragraph";
import { track } from "@vercel/analytics";
import { useCampaign } from "@/game/campaign/useCampaign";

export type GamePlayCampaignProps = {
  initialCampaignLevel: number;
};

export function GamePlayCampaign({
  initialCampaignLevel,
}: GamePlayCampaignProps) {
  const campaign = useCampaign(initialCampaignLevel);

  if (campaign.noMoreLevels) {
    return (
      <>
        <Heading>Campaign complete!</Heading>
        <Paragraph>You've completed all the levels for now.</Paragraph>
        <Paragraph>
          But campaign mode is a work in progress. Check back in a few days, and
          there may be more levels to play!
        </Paragraph>
        <Paragraph>
          Until then, why not try the{" "}
          <Link
            href="/play/daily#board"
            className="underline sm:hover:no-underline"
          >
            Daily Puzzle
          </Link>
          ?
        </Paragraph>
      </>
    );
  }

  if (!campaign.levelData) {
    throw new Error("Could not load level data");
  }

  return (
    <>
      <Heading>{campaign.levelName}</Heading>
      <GamePlayFromLevelData
        key={campaign.levelName}
        levelData={campaign.levelData}
        settings={{
          showTimer: false,
          safeFirstClick: false,
          revealContiguousNumbers: false,
          revealBoardOnLoss: false,
          autoRestart: true,
          timeLimit: 0,
        }}
        onWin={() => {
          campaign.completeLevel();

          track("CampaignLevelCompleted", { level: campaign.levelName });
        }}
      />
      {campaign.isLevelComplete && (
        <ButtonWrapper>
          <FormButton
            text="Next level"
            onClick={() => {
              campaign.goToNextLevel();
            }}
          />
        </ButtonWrapper>
      )}
    </>
  );
}
