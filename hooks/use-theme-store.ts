import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook with safe defaults
export const useTheme = () => {
  const store = useThemeStore();
  
  // Ensure we always have a valid theme
  const theme = store?.theme || 'light';
  const toggleTheme = store?.toggleTheme || (() => {});
  const setTheme = store?.setTheme || (() => {});
  
  return {
    theme,
    toggleTheme,
    setTheme,
  };
};