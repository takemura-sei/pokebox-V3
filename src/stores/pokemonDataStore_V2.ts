// src/stores/pokemonDataStore_V2.ts
import { defineStore } from "pinia";
import { fetchPokemonDataV2, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { PokemonListType, DisplayImageDataType, DisplayJpNameDataType, LanguageNameObjType } from "@/types/pokemonTypes";

export const usePokemonDataStoreV2 = defineStore('pokemonData', {
  state: () => ({
    pokemonList: [] as PokemonListType,
    paginatedPokemonList: [] as PokemonListType,
    favoriteBox: [] as PokemonListType,
    displayImageData: {} as DisplayImageDataType,
    displayJpNameData: {} as DisplayJpNameDataType,
    itemsPerPage: 30, // 1ページあたりのポケモン数
    currentPage: 1, // 現在のページ番号
    showFavorites: false as Boolean,
  }),
  getters: {
    filteredPokemonList(state) {
      return state.showFavorites ? state.favoriteBox : state.paginatedPokemonList;
    }
  },
  actions: {
    // 151匹のポケモンを一括取得
    async loadAllPokemonData() {
      const response = await fetchPokemonDataV2();
      this.pokemonList = response.results;
      this.updatePaginatedList(1); // 初回ロード時は1ページ目を設定
    },
    // お気に入りに追加
    choiseFavoritePokemon(name: string, url: string) {
      if (!this.favoriteBox.find(pokemon => pokemon.name === name)) {
        this.favoriteBox.push({ name, url });
      }
    },
    // お気に入りから削除
    deleteFavoritePokemon(name: string) {
      this.favoriteBox = this.favoriteBox.filter(pokemon => pokemon.name !== name);
    },
    // お気に入り表示の切り替え
    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites;
    },
    // ページデータを更新
    updatePaginatedList(page: number) {
      if (this.showFavorites) return; // お気に入り表示時はページネーションを変更しない
      const startIndex = (page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedPokemonList = this.pokemonList.slice(startIndex, endIndex);
      this.currentPage = page;
    },
    // ポケモンの画像を取得
    async loadPokemonImage(name: string, endpoint: string) {
      const response = await fetchSingleData(endpoint);
      const imageUrl = response.sprites.front_default;
      this.displayImageData[name] = imageUrl;
    },
    // ポケモンの日本語名を取得
    async loadPokemonJpName(name: string, endpoint: string) {
      const response = await fetchSpeciesData(endpoint);
      const jpNameObj = response.names.find(
        (obj: LanguageNameObjType) => obj.language.name === 'ja'
      );
      this.displayJpNameData[name] = jpNameObj.name;
    },
  },
});
