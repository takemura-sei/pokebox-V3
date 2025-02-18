// src/utils/toggleFavorite.ts
import { useFavoriteDataStore } from "@/stores/favoriteDataStore";

export const toggleFavorite = (isVisible: boolean, name: string, url: string) => {
  const favoriteDataStore = useFavoriteDataStore();

  if (!isVisible) {
    favoriteDataStore.addFavoritePokemon(name, url); 
  } else {
    favoriteDataStore.deleteFavoritePokemon(name);
  }
};
