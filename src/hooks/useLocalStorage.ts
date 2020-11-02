import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialState: T) => {
  const get = () => JSON.parse(localStorage.getItem(key) as string) as T;
  const set = (value: T) => localStorage.setItem(key, JSON.stringify(value));

  if (get() === null) {
    set(initialState);
  }

  const [state, setState] = useState(get());

  return [
    state,
    (valueOrFunc: (value: T) => T | T) => {
      if (valueOrFunc instanceof Function) {
        setState((prevValue) => {
          const value = valueOrFunc(prevValue);
          set(value);
          return value;
        });
      } else {
        setState(valueOrFunc);
        set(valueOrFunc);
      }
    },
  ] as const;
};
