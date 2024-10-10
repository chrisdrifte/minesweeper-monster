export function decodeNumber(n: string | string[]) {
  return parseInt(Array.isArray(n) ? n.join("") : n, 36);
}
