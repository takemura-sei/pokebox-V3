// src/stores/favoriteDataStore.ts
import { defineStore } from "pinia";
import type { PokemonListType } from "@/types/pokemonDataStoreTypes";
import { usePokemonDataStoreV2 } from "@/stores/pokemonDataStore_V2";

export const useFavoriteDataStore = defineStore('favoriteData', {
  state: () => ({
    favoritePokemonList: [] as PokemonListType,
    showFavorites: false as boolean,
  }),
  actions: {
    // お気に入りに追加
    addFavoritePokemon(name: string, url: string) {
      if (!this.favoritePokemonList.find(pokemon => pokemon.name === name)) {
        this.favoritePokemonList.push({ name, url });
        this.sortFavoritePokemonList();
        console.log(this.favoritePokemonList);
      }
    },
    // お気に入りから削除
    deleteFavoritePokemon(name: string) {
      this.favoritePokemonList = this.favoritePokemonList.filter(pokemon => pokemon.name !== name);
      console.log(this.favoritePokemonList);
    },
    // お気に入りリストをポケモンナンバー順に並び替え
    sortFavoritePokemonList() {
      const pokemonDataStore = usePokemonDataStoreV2();
      this.favoritePokemonList.sort((a, b) => {
        const idA = Number(pokemonDataStore.displayIdData[a.name]);
        const idB = Number(pokemonDataStore.displayIdData[b.name]);
        return idA - idB;
      });
    },
    // お気に入りページの再レンダリングのフラグ
    reloadFaovoritePageFlag() {
      if (this.showFavorites) { // お気に入りページを表示中のみ、お気に入り解除をしたポケモンを削除する
        this.reloadFaovoritePage();
        console.log('お気に入り画面を再レンダリング');
      } 
      else {
        return;
      }
    },
    // お気に入りページの再レンダリング
    reloadFaovoritePage() {
      const pokemonDataStore = usePokemonDataStoreV2();
      if(pokemonDataStore.paginatedPokemonList.length === 1 && pokemonDataStore.currentPage !== 1) {
        pokemonDataStore.setDisplayPokemonList(this.favoritePokemonList); 
        pokemonDataStore.updatePaginatedPokemonList(pokemonDataStore.currentPage - 1);
      } else {
        pokemonDataStore.setDisplayPokemonList(this.favoritePokemonList); 
        pokemonDataStore.updatePaginatedPokemonList(pokemonDataStore.currentPage);
      }
    }
  }
})