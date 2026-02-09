import { useState, useEffect, useCallback } from 'react';

interface StorageValue<T> {
  version: number;
  data: T;
}

interface UseLocalStorageStateReturn<T> {
  state: T;
  setState: (value: T | ((prev: T) => T)) => boolean;
  lastError: Error | null;
}

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  version: number = 1
): UseLocalStorageStateReturn<T> {
  const [state, setStateInternal] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed: StorageValue<T> = JSON.parse(item);
        if (parsed.version === version) {
          return parsed.data;
        }
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
    return defaultValue;
  });

  const [lastError, setLastError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const storageValue: StorageValue<T> = {
        version,
        data: state,
      };
      window.localStorage.setItem(key, JSON.stringify(storageValue));
      setLastError(null);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to save to localStorage');
      console.error(`Error saving ${key} to localStorage:`, err);
      setLastError(err);
    }
  }, [key, state, version]);

  const setState = useCallback((value: T | ((prev: T) => T)): boolean => {
    try {
      setStateInternal((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        return newValue;
      });
      return true;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to update state');
      setLastError(err);
      return false;
    }
  }, []);

  return { state, setState, lastError };
}
