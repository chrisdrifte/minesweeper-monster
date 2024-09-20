"use client";

import { ButtonWrapper } from "../navigation/ButtonWrapper";
import { MenuButton } from "../navigation/MenuButton";
import { useCampaign } from "@/game/campaign/useCampaign";

export type MainMenuProps = {
  initialCampaignLevel: number;
};

export function MainMenu({ initialCampaignLevel }: MainMenuProps) {
  const campaign = useCampaign(initialCampaignLevel);

  return (
    <ButtonWrapper>
      <MenuButton text="Daily Puzzle" href="/play/daily#board" />
      <MenuButton text="Classic Beginner" href="/play/beginner#board" />
      <MenuButton text="Classic Intermediate" href="/play/intermediate#board" />
      <MenuButton text="Classic Expert" href="/play/expert#board" />
      <MenuButton
        text={`Campaign ${campaign.progress}`}
        href="/play/campaign#board"
      />
      <MenuButton text="Custom Game" href="/play/custom#board" />
    </ButtonWrapper>
  );
}
