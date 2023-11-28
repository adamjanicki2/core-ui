import { createWithEqualityFn } from "zustand/traditional";
import { persist, createJSONStorage } from "zustand/middleware";

type CacheValue<T> = {
  /**
   * The value to be cached
   */
  value: T;
  /**
   * The timestamp at which the cache value expires
   */
  expiresAt: number;
};
type Cache<T> = Record<string, CacheValue<T>>;
type CacheStore<T> = {
  cache: Cache<T>;
  setCache: (key: string, value: T, expiresAt: number) => void;
};
/**
 * The storage type to use for the cache
 */
type Storage = "local" | "session";

type CacheHook<T> = {
  /**
   * Gets a value from the cache
   * @param key the key of the value to get
   * @returns the value if it exists and is not expired; undefined otherwise
   */
  get: (key: string) => T | undefined;
  /**
   * Sets a value in the cache
   * @param key the key of the value to set
   * @param value the value to set
   * @param expiresAt the timestamp at which the cache value expires
   */
  set: (key: string, value: T, expiresAt: number) => void;
};

/**
 * A hook for caching values in local or session storage
 *
 * @param name the name of the cache (e.g. "user")
 * @param storage the storage type to use for the cache
 * @returns get and set functions for the cache
 */
const useCache = <T>(
  name: string,
  storage: Storage = "local"
): CacheHook<T> => {
  const { cache, setCache } = createWithEqualityFn(
    persist<CacheStore<T>>(
      (set) => ({
        cache: {},
        setCache: (key: string, value: T, expiresAt: number) => {
          set((state) => ({
            cache: {
              ...state.cache,
              [key]: {
                value,
                expiresAt,
              },
            },
          }));
        },
      }),
      {
        name: `cache-${name}`,
        storage: createJSONStorage(() => STORAGE_MAP[storage]),
      }
    ),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  )();

  const get = (key: string): T | undefined => {
    const cacheValue = cache[key];
    if (cacheValue && cacheValue.expiresAt > Date.now()) {
      return cacheValue.value;
    }
    return undefined;
  };

  return {
    get,
    set: setCache,
  };
};

const STORAGE_MAP = {
  local: localStorage,
  session: sessionStorage,
} as const;

export default useCache;
