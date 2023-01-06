import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    //check if there is a value in localStorage
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)(); // this is a type assertion, it tells the compiler that the type of initialValue is a function that returns a T
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    //update localStorage when value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
