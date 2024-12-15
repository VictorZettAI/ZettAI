import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ImageGenerationResult } from '../services/api/openai';

interface AppState {
  // Chat state
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;

  // Image generation state
  generatedImages: ImageGenerationResult[];
  addGeneratedImage: (image: ImageGenerationResult) => void;
  clearGeneratedImages: () => void;

  // UI state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Chat state
      chatMessages: [],
      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),
      clearChatMessages: () => set({ chatMessages: [] }),

      // Image generation state
      generatedImages: [],
      addGeneratedImage: (image) =>
        set((state) => ({
          generatedImages: [...state.generatedImages, image],
        })),
      clearGeneratedImages: () => set({ generatedImages: [] }),

      // UI state
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading }),
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        chatMessages: state.chatMessages.slice(-50), // Solo guardar últimos 50 mensajes
        generatedImages: state.generatedImages.slice(-10), // Solo guardar últimas 10 imágenes
      }),
    }
  )
);
