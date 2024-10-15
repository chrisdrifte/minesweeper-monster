import { useCookie } from "@/hooks/useCookie";

const PLAYBACK_SPEEDS = [1, 5, 10];

export function useReplaySpeed() {
  const replaySpeedCookie = useCookie<number>("replaySpeed", 1);

  const replaySpeed = PLAYBACK_SPEEDS.includes(replaySpeedCookie.value)
    ? replaySpeedCookie.value
    : PLAYBACK_SPEEDS[0];

  const toggleReplaySpeed = () => {
    replaySpeedCookie.set(
      PLAYBACK_SPEEDS[PLAYBACK_SPEEDS.indexOf(replaySpeed) + 1] ||
        PLAYBACK_SPEEDS[0]
    );
  };

  return { replaySpeed, toggleReplaySpeed };
}
