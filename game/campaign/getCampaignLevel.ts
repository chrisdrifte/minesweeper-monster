import { cookies } from "next/headers";
import { parseJsonString } from "@/helpers/parseJsonString";

export function getCampaignLevel(): number {
  const cookiesStore = cookies();
  const campaignLevelCookie = cookiesStore.get("campaign-level");
  const campaignLevel = parseJsonString(campaignLevelCookie?.value);

  return campaignLevel || 0;
}
