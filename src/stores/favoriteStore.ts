import { defineStore } from "pinia";
import type { FavoriteBoxType } from "@/types/pokemonTypes";

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favoriteBox: {} as FavoriteBoxType,
  }),
  actions: {
    // お気に入りに追加
    choiseFavoritePokemon(name: string, endpoint: string) {
      if (!this.favoriteBox[name]) {
        this.favoriteBox[name] = endpoint;
      } 
    },
    // お気に入りから削除
    deleteFavoritePokemon(name: string) {
      if (this.favoriteBox[name]) {
        delete this.favoriteBox[name];
      }
    }
  }
});