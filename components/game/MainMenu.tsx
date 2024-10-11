"use client";

import { ButtonWrapper } from "../layout/ButtonWrapper";
import { DailySolution } from "./daily/types/DailySolution";
import { LinkButton } from "../navigation/LinkButton";
import { useCampaign } from "@/game/campaign/useCampaign";
import { useDailySolution } from "./daily/useDailySolution";
import { useFormattedTimeToNextDailyPuzzle } from "./daily/useFormattedTimeToNextDailyPuzzle";

export type MainMenuProps = {
  initialDailySolution?: DailySolution;
  initialCampaignLevel: number;
};

export function MainMenu({
  initialDailySolution,
  initialCampaignLevel,
}: MainMenuProps) {
  const dailySolution = useDailySolution(initialDailySolution);

  const formattedTimeUntilNextDailyPuzzle = useFormattedTimeToNextDailyPuzzle(
    dailySolution.seed
  );

  const campaign = useCampaign(initialCampaignLevel);

  return (
    <ButtonWrapper>
      <LinkButton href="/play/daily#board">
        Daily Puzzle{" "}
        {formattedTimeUntilNextDailyPuzzle
          ? `(${formattedTimeUntilNextDailyPuzzle})`
          : null}
      </LinkButton>

      <LinkButton href="/play/beginner#board">Classic Beginner</LinkButton>

      <LinkButton href="/play/intermediate#board">
        Classic Intermediate
      </LinkButton>

      <LinkButton href="/play/expert#board">Classic Expert</LinkButton>

      <LinkButton href="/play/campaign#board">
        Campaign {campaign.progress}
      </LinkButton>

      <LinkButton href="/play/custom#board">Custom Game</LinkButton>

      <LinkButton href="/replay/history">Game History</LinkButton>
    </ButtonWrapper>
  );
}
