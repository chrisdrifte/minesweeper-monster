import { useEffect, useState } from "react";

import { getCookie } from "@/helpers/getCookie";
import { parseJsonString } from "@/helpers/parseJsonString";
import { setCookie } from "@/helpers/setCookie";

export const useCookies = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    let currentValue;

    try {
      currentValue = parseJsonString(getCookie(key)) || defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    setCookie(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};
