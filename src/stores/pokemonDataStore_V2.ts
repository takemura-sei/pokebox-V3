// src/stores/pokemonDataStore_V2.ts
import { defineStore } from "pinia";
import { fetchPokemonDataV2, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { PokemonListType, DisplayDataType, LanguageNameObjType } from "@/types/pokemonDataStoreTypes";

export const usePokemonDataStoreV2 = defineStore('pokemonData', {
  state: () => ({
    pokemonList: [] as PokemonListType,
    displayPokemonList: [] as PokemonListType,
    paginatedPokemonList: [] as PokemonListType,
    favoritePokemonList: [] as PokemonListType,
    displayImageData: {} as DisplayDataType,
    displayJpNameData: {} as DisplayDataType,
    itemsPerPage: 30, // 1ページあたりのポケモン数
    currentPage: 1, // 現在のページ番号
    showFavorites: false as boolean,
  }),
  getters: {
    filteredPokemonList(state) {
      return state.paginatedPokemonList;
    }
  },
  actions: {
    // 386匹のポケモンを一括取得
    async getPokemonList() {
      const response = await fetchPokemonDataV2();
      this.pokemonList = response.results;
      this.setDisplayPokemonList(this.pokemonList); // 実際に表示されるリストにも格納しておく
      this.updatePaginatedPokemonList(1); // 初回ロード時は1ページ目を設定
    },
    // 表示させるポケモンリスト
    setDisplayPokemonList(list: PokemonListType) {
      this.displayPokemonList = list;
    },
    // お気に入りに追加
    addFavoritePokemon(name: string, url: string) {
      if (!this.favoritePokemonList.find(pokemon => pokemon.name === name)) {
        this.favoritePokemonList.push({ name, url });
      }
    },
    // お気に入りから削除
    deleteFavoritePokemon(name: string) {
      this.favoritePokemonList = this.favoritePokemonList.filter(pokemon => pokemon.name !== name);
    },
    // お気に入り表示の切り替え
    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites;
      this.setDisplayPokemonList(this.showFavorites ? this.favoritePokemonList : this.pokemonList);
      this.updatePaginatedPokemonList(1);
    },
    // ページデータを更新
    updatePaginatedPokemonList(page: number) {
      const sourceList = this.displayPokemonList;
      const startIndex = (page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedPokemonList = sourceList.slice(startIndex, endIndex);
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
