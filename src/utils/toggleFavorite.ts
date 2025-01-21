// src/utils/toggleFavorite.ts
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useNuxtApp } from "#app"; // Nuxtのユーティリティをインポート

export const toggleFavorite = (isVisible: boolean, name: string, url: string) => {
  const { $pinia } = useNuxtApp(); // Piniaインスタンスを取得
  const favoriteStore = useFavoriteStore($pinia); // インスタンスを渡してストアを初期化

  if (!isVisible) {
    favoriteStore.choiseFavoritePokemon(name, url); 
    console.log(favoriteStore.favoriteBox);
  } else {
    favoriteStore.deleteFavoritePokemon(name);
    console.log(favoriteStore.favoriteBox);
  }
};
