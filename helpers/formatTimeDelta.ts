export function formatTimeDelta(delta: number) {
  return new Date(delta).toISOString().slice(11, 19); // only works for times < 1 day
}
