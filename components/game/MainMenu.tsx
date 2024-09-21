"use client";

import { ButtonWrapper } from "../layout/ButtonWrapper";
import { LinkButton } from "../navigation/LinkButton";
import { useCampaign } from "@/game/campaign/useCampaign";

export type MainMenuProps = {
  initialCampaignLevel: number;
};

export function MainMenu({ initialCampaignLevel }: MainMenuProps) {
  const campaign = useCampaign(initialCampaignLevel);

  return (
    <ButtonWrapper>
      <LinkButton href="/play/daily#board">Daily Puzzle</LinkButton>

      <LinkButton href="/play/beginner#board">Classic Beginner</LinkButton>

      <LinkButton href="/play/intermediate#board">
        Classic Intermediate
      </LinkButton>

      <LinkButton href="/play/expert#board">Classic Expert</LinkButton>

      <LinkButton href="/play/campaign#board">
        Campaign {campaign.progress}
      </LinkButton>

      <LinkButton href="/play/custom#board">Custom Game</LinkButton>
    </ButtonWrapper>
  );
}
