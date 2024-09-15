export function toParamsString(obj: Record<string, unknown>) {
  const params = new URLSearchParams();

  const toParamValue = (value: unknown) => {
    if (typeof value === "boolean") {
      return value ? "1" : "0";
    }

    if (typeof value === "undefined") {
      return value ? "1" : "0";
    }

    return String(value);
  };

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "undefined") {
      continue;
    }

    params.set(key, toParamValue(value));
  }

  return params.toString();
}
