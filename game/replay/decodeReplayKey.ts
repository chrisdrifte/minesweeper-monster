export function decodeReplayKey(encodedKey: string) {
  return encodedKey.replace(/^replayData:/, "");
}
