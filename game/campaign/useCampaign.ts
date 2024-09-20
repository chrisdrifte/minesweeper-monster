import { campaignLevels } from "./campaignLevels";
import { useCookie } from "@/hooks/useCookie";
import { useState } from "react";

export function useCampaign(initialCampaignLevel = 0) {
  const {
    value: campaignLevel,
    setCookieOnly: saveCampaignLevel,
    set: setCampaignLevel,
  } = useCookie("campaign-level", initialCampaignLevel);

  const [hasWon, setHasWon] = useState(false);

  const levelData = campaignLevels[campaignLevel];
  const maxLevel = campaignLevels.length - 1;
  const nextLevel = Math.min(campaignLevel + 1, maxLevel + 1);
  const noMoreLevels = campaignLevel > maxLevel;

  const getProgress = () => {
    if (!campaignLevel) {
      return "";
    }

    if (!noMoreLevels) {
      return `(${campaignLevel}/${maxLevel + 1})`;
    }

    return "(Complete)";
  };

  const completeLevel = () => {
    saveCampaignLevel(nextLevel);
    setHasWon(true);
  };

  const goToNextLevel = () => {
    setCampaignLevel(nextLevel);
    setHasWon(false);
  };

  return {
    levelName: `Level ${campaignLevel + 1}`,
    progress: getProgress(),
    levelData,
    isLevelComplete: hasWon,
    noMoreLevels,
    completeLevel,
    goToNextLevel,
  };
}
