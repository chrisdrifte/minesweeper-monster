export function parseJsonString(input: string | undefined) {
  if (!input) {
    return;
  }

  let output;

  try {
    output = JSON.parse(input);
  } catch (error) {
    // do nothing
  }

  return output;
}
