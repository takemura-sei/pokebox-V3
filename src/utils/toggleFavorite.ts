// src/utils/toggleFavorite.ts
import { usePokemonDataStoreV2 } from "@/stores/pokemonDataStore_V2";
import { useNuxtApp } from "#app"; // Nuxtのユーティリティをインポート

export const toggleFavorite = (isVisible: boolean, name: string, url: string) => {
  const { $pinia } = useNuxtApp(); // Piniaインスタンスを取得
  const pokemonDataStore = usePokemonDataStoreV2($pinia); // インスタンスを渡してストアを初期化

  if (!isVisible) {
    pokemonDataStore.addFavoritePokemon(name, url); 
  } else {
    pokemonDataStore.deleteFavoritePokemon(name);
  }
};
