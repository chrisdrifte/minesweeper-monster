import { campaignLevels } from "./campaignLevels";
import { useCookie } from "@/hooks/useCookie";
import { useState } from "react";

export function useCampaign(initialCampaignLevel = 0) {
  const { value: campaignLevel, set: setCampaignLevel } = useCookie(
    "campaign-level",
    initialCampaignLevel
  );

  const [hasWon, setHasWon] = useState(false);

  const levelData = campaignLevels[campaignLevel];
  const maxLevel = campaignLevels.length - 1;

  const completeLevel = () => {
    setHasWon(true);
  };

  const goToNextLevel = () => {
    const nextLevel = Math.min(campaignLevel + 1, maxLevel + 1);
    setCampaignLevel(nextLevel);
    setHasWon(false);
  };

  return {
    levelName: `Level ${campaignLevel + 1}`,
    levelData,
    isLevelComplete: hasWon,
    noMoreLevels: campaignLevel > maxLevel,
    completeLevel,
    goToNextLevel,
  };
}
