import { useCallback } from 'react';

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function useCache() {
  const setCache = useCallback((key: string, data: any, options: CacheOptions = {}) => {
    const { ttl = DEFAULT_TTL } = options;
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  }, []);

  const getCache = useCallback((key: string): any | null => {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;

    const { data, timestamp, ttl } = JSON.parse(item);
    const now = Date.now();

    if (now - timestamp > ttl) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }

    return data;
  }, []);

  const clearCache = useCallback((key?: string) => {
    if (key) {
      localStorage.removeItem(`cache_${key}`);
    } else {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith('cache_')) {
          localStorage.removeItem(k);
        }
      });
    }
  }, []);

  return { setCache, getCache, clearCache };
}
