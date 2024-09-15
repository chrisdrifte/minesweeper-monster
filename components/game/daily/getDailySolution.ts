import { DailySolution } from "./types/DailySolution";
import { cookies } from "next/headers";
import { parseJsonString } from "@/helpers/parseJsonString";

export function getDailySolution(): DailySolution | undefined {
  const cookiesStore = cookies();
  const dailySolutionCookie = cookiesStore.get("daily-solution");
  const dailySolution = parseJsonString(dailySolutionCookie?.value);

  return dailySolution;
}
