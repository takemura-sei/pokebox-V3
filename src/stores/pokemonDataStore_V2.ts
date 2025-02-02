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
    displayIdData: {} as DisplayDataType,
    displayImageDataV2: {} as DisplayDataType,
    displayJpNameDataV2: {} as DisplayDataType,
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
    // ポケモンのIDを格納する
    getPokemonIdList() {
      this.pokemonList.map((pokemon) => {
        const id = getLastElementUrl(pokemon.url);
        this.displayIdData[pokemon.name] = id;
      });
    },
    // 先にポケモン画像を先に取得する
    loadPokemonImageV2() {
      this.pokemonList.map(async (pokemon) => {
        const id = getLastElementUrl(pokemon.url);
        const response = await fetchSingleData(id);
        const imageUrl = response.sprites.front_default;
        this.displayImageDataV2[pokemon.name] = imageUrl;
      });
    },
    loadPokemonJpNameV2() {
      this.pokemonList.map(async (pokemon) => {
        const id = getLastElementUrl(pokemon.url);
        const response = await fetchSpeciesData(id);
        const jpName = response.names.find(
          (obj: LanguageNameObjType) => obj.language.name === 'ja'
        );
        this.displayJpNameDataV2[pokemon.name] = jpName.name;
      });
    }
  },
});
