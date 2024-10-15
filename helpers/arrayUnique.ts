export function arrayUnique<T>(array: T[]) {
  return Array.from(new Set(array));
}
