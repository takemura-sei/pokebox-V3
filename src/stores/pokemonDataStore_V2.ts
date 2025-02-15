// src/stores/pokemonDataStore_V2.ts
import { defineStore } from "pinia";
import { fetchPokemonDataV2, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { defaultPokemonListType, PokemonListType, DisplayDataType, LanguageNameObjType, PokemonTypesObjType } from "@/types/pokemonDataStoreTypes";
import { useFavoriteDataStore } from "@/stores/favoriteDataStore";

export const usePokemonDataStoreV2 = defineStore('pokemonData', {
  state: () => ({
    pokemonList: [] as defaultPokemonListType,
    displayPokemonList: [] as PokemonListType,
    paginatedPokemonList: [] as PokemonListType,
    typeListData: {} as DisplayDataType,
    displayIdData: {} as DisplayDataType,
    displayImageDataV2: {} as DisplayDataType,
    displayJpNameDataV2: {} as DisplayDataType,
    itemsPerPage: 30, // 1ページあたりのポケモン数
    currentPage: 1, // 現在のページ番号
  }),
  getters: {
    filteredPokemonList(state) {
      return state.paginatedPokemonList;
    }
  },
  actions: {
    // 493匹のポケモンを一括取得
    async getPokemonList() {
      const response = await fetchPokemonDataV2();
      this.pokemonList = response.results;
      this.setDisplayPokemonList(this.pokemonList); // 実際に表示されるリストにも格納しておく
      this.updatePaginatedPokemonList(1); // 初回ロード時は1ページ目を設定
    },
    // 表示させるポケモンリスト
    setDisplayPokemonList(list: PokemonListType) {
      this.displayPokemonList = list;
      console.log(this.displayPokemonList);
    },
    // お気に入り表示の切り替え
    toggleShowFavorites() {
      const favoriteDataStore = useFavoriteDataStore();
      favoriteDataStore.showFavorites = !favoriteDataStore.showFavorites;
      this.setDisplayPokemonList(favoriteDataStore.showFavorites ? favoriteDataStore.favoritePokemonList : this.pokemonList);
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
      this.pokemonList = this.pokemonList.map((pokemon) => {
        const id = getLastElementUrl(pokemon.url);
        this.displayIdData[pokemon.name] = id;
        return {
          ...pokemon,
          id,
        };
      });
    },
    // ポケモンのタイプ情報を pokemonList に格納する
    async getPokemonTypeList() {
      // Promiseの配列を作る (fetchSingleData の呼び出し)
      const promiseArray = this.pokemonList.map(async (pokemon) => {
        const response = await fetchSingleData(pokemon.id);
        const type1Data = response.types.find(
          (obj: PokemonTypesObjType) => obj.slot === 1
        );
        const type1 = type1Data ? type1Data.type.name : "";
        const type2Data = response.types.find(
          (obj: PokemonTypesObjType) => obj.slot === 2
        );
        const type2 = type2Data ? type2Data.type.name : "";
        return {
          ...pokemon,
          type1,
          type2,
        };
      });
      // すべての非同期処理が終わるのを待ってから結果を配列で受け取る
      const result = await Promise.all(promiseArray);
      this.pokemonList = result;
      console.log(this.pokemonList);
    },
    // ポケモン画像を取得する
    loadPokemonImageV2() {
      this.pokemonList.map(async (pokemon) => {
        const id = getLastElementUrl(pokemon.url);
        const response = await fetchSingleData(id);
        const imageUrl = response.sprites.front_default;
        this.displayImageDataV2[pokemon.name] = imageUrl;
      });
    },
    // ポケモンの日本名を取得する
    loadPokemonJpNameV2() {
      this.pokemonList.map(async (pokemon) => {
        const id = getLastElementUrl(pokemon.url);
        const response = await fetchSpeciesData(id);
        const jpName = response.names.find(
          (obj: LanguageNameObjType) => obj.language.name === 'ja'
        );
        this.displayJpNameDataV2[pokemon.name] = jpName.name;
      });
    },
  },
});
