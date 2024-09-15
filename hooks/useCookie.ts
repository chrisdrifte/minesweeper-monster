import { useCallback, useState } from "react";

import { getCookie } from "@/helpers/getCookie";
import { parseJsonString } from "@/helpers/parseJsonString";
import { setCookie } from "@/helpers/setCookie";

export const useCookie = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    let currentValue;

    try {
      currentValue = parseJsonString(getCookie(key)) || defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  const set = useCallback((value: T) => {
    setValue(structuredClone(value));
    setCookie(key, JSON.stringify(value));
  }, []);

  return { value, set };
};
