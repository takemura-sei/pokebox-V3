// src/stores/pokemonDataStore_V2.ts
import { defineStore } from "pinia";
import { fetchPokemonDataV2, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { DisplayImageDataType, DisplayJpNameDataType, FavoriteBoxType, LanguageNameObjType } from "@/types/pokemonTypes";

export const usePokemonDataStoreV2 = defineStore('pokemonData', {
  state: () => ({
    pokemonList: [] as { name: string; url: string }[],
    paginatedPokemonList: [] as { name: string; url: string }[], // 現在表示中のページデータ
    displayImageData: {} as DisplayImageDataType,
    displayJpNameData: {} as DisplayJpNameDataType,
    favoriteBox: {} as FavoriteBoxType,
    itemsPerPage: 30, // 1ページあたりのポケモン数
    currentPage: 1, // 現在のページ番号
    showFavorites: false as Boolean,
  }),
  getters: {
    filteredPokemonList(state) {
      if (state.showFavorites) {
        return Object.keys(state.favoriteBox).map(name => ({
          name,
          url: state.favoriteBox[name]
        }));
      }
      return state.paginatedPokemonList;
    }
  },
  actions: {
    // 151匹のポケモンを一括取得
    async loadAllPokemonData() {
      const response = await fetchPokemonDataV2();
      this.pokemonList = response.results;
      this.updatePaginatedList(1); // 初回ロード時は1ページ目を設定
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
  },
});
