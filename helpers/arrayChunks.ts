export function* arrayChunks<T>(arrayToChunk: T[], numChunks: number) {
  for (let i = 0; i < arrayToChunk.length; i += numChunks) {
    yield arrayToChunk.slice(i, i + numChunks);
  }
}
