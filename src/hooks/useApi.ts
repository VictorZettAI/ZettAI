import { useState, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { useCache } from '@/hooks/useCache';
import { openaiService, ChatMessage, ImageGenerationResult } from '@/services/api/openai';

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const { setCache, getCache } = useCache();
  const { setError } = useStore();

  const handleApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    cacheKey?: string,
    options = { ttl: 5 * 60 * 1000 } // 5 minutes default TTL
  ): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first if cacheKey is provided
      if (cacheKey) {
        const cachedData = getCache(cacheKey);
        if (cachedData) {
          return cachedData;
        }
      }

      const result = await apiCall();

      // Cache the result if cacheKey is provided
      if (cacheKey) {
        setCache(cacheKey, result, options);
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setCache, getCache, setError]);

  const chat = useCallback(async (messages: ChatMessage[]) => {
    return handleApiCall(
      () => openaiService.chat(messages)
    );
  }, [handleApiCall]);

  const generateImage = useCallback(async (prompt: string): Promise<ImageGenerationResult> => {
    const cacheKey = `image_${prompt}`;
    return handleApiCall(
      () => openaiService.generateImage(prompt),
      cacheKey,
      { ttl: 24 * 60 * 60 * 1000 } // Cache images for 24 hours
    );
  }, [handleApiCall]);

  const analyzeText = useCallback(async (text: string) => {
    const cacheKey = `analysis_${text}`;
    return handleApiCall(
      () => openaiService.analyzeText(text),
      cacheKey
    );
  }, [handleApiCall]);

  return {
    isLoading,
    chat,
    generateImage,
    analyzeText
  };
}
