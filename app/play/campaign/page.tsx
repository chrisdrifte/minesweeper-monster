import { GamePlayCampaign } from "@/components/game/GamePlayCampaign";
import { getCampaignLevel } from "@/game/campaign/getCampaignLevel";

export default function CampaignPage() {
  return <GamePlayCampaign initialCampaignLevel={getCampaignLevel()} />;
}
