import { useEffect, useMemo, useState } from "react";

const deserialize = <T>(value: string) => JSON.parse(value) as T;
const serialize = <T>(value: T) => JSON.stringify(value);

const createStorage = <T>(key: string) => ({
  get: () => deserialize<T>(localStorage.getItem(key)!),
  set: (value: T) => localStorage.setItem(key, serialize(value)),
  exists: () => key in localStorage,
});

export const useLocalStorage = <T>(key: string, initialState: T) => {
  const { get, set, exists } = useMemo(() => createStorage<T>(key), [key]);

  if (!exists()) {
    set(initialState);
  }

  const [state, setState] = useState(get());

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) {
        setState(deserialize(e.newValue!));
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  });

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
