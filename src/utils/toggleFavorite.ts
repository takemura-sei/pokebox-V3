// src/utils/toggleFavorite.ts
import { usePokemonDataStoreV2 } from "@/stores/pokemonDataStore_V2";

export const toggleFavorite = (isVisible: boolean, name: string, url: string) => {
  const pokemonDataStore = usePokemonDataStoreV2();

  if (!isVisible) {
    pokemonDataStore.addFavoritePokemon(name, url); 
  } else {
    pokemonDataStore.deleteFavoritePokemon(name);
  }
};
