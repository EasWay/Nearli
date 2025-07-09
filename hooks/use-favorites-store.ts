import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favorites: string[];
  addFavorite: (businessId: string) => void;
  removeFavorite: (businessId: string) => void;
  isFavorite: (businessId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (businessId: string) => {
        set((state) => ({
          favorites: [...state.favorites, businessId],
        }));
      },
      removeFavorite: (businessId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== businessId),
        }));
      },
      isFavorite: (businessId: string) => {
        return get().favorites.includes(businessId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);