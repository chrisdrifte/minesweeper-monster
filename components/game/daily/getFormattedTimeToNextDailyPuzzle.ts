import { DailySolution } from "./types/DailySolution";
import { formatTimeDelta } from "@/helpers/formatTimeDelta";
import { getDailySeed } from "./getDailySeed";

export function getFormattedTimeToNextDailyPuzzle(
  dailySolutionSeed?: DailySolution["seed"]
) {
  // user has not completed the current daily puzzle
  if (dailySolutionSeed !== getDailySeed()) {
    return null;
  }

  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  const nextDay = Math.floor(now / oneDay) + 1;
  const nextDayTimestamp = nextDay * oneDay;
  const timeToNextDay = nextDayTimestamp - now;

  if (timeToNextDay <= 0) {
    return null;
  }

  const formattedTime = formatTimeDelta(timeToNextDay);

  if (formattedTime === "00:00:00") {
    return null;
  }

  return formattedTime;
}
