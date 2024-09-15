export function getDailySeed() {
  return `${Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000))}`;
}
