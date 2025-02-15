// src/stores/pokemonDataStore_V2.ts
import { defineStore } from "pinia";
import { fetchPokemonDataV2, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { defaultPokemonListType, PokemonListType, DisplayDataType, LanguageNameObjType, PokemonTypesObjType } from "@/types/pokemonDataStoreTypes";
import { useFavoriteDataStore } from "@/stores/favoriteDataStore";
import { useFilterTypeDataStore } from "@/stores/filterTypeDataStore";
import { useFilterAreaDataStore } from "@/stores/filterAreaDataStore";

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
    /* 追加: フィルタをかけるアクション */
    applyFilter() {
      const filterTypeDataStore = useFilterTypeDataStore();
      const filterAreaDataStore = useFilterAreaDataStore();

      // いったん全ポケモンをコピーして、そこに対して順次絞り込みをかける
      let filtered = [...this.pokemonList];

      //----------------------------------
      // 1. 地方フィルタ
      //----------------------------------
      if (filterAreaDataStore.filterAreaList.length > 0) {
        // 選択されている地方(area)を配列で取得
        const selectedAreas = filterAreaDataStore.filterAreaList.map(a => a.area);
        // area ごとに何番のポケモンを含めるかを決める
        filtered = filtered.filter((pokemon) => {
          const idNum = Number(pokemon.id);

          // ポケモンが属する世代に合致しているかチェック (OR 条件)
          // 例: カントー=1..151, ジョウト=152..251, ホウエン=252..386, シンオウ=387..493
          const inKanto  = selectedAreas.includes('Kanto')  && (idNum >= 1   && idNum <= 151);
          const inJohto  = selectedAreas.includes('Johto')  && (idNum >= 152 && idNum <= 251);
          const inHoenn  = selectedAreas.includes('Hoeen')  && (idNum >= 252 && idNum <= 386);
          const inSinnoh = selectedAreas.includes('Sinnoh') && (idNum >= 387 && idNum <= 493);

          return inKanto || inJohto || inHoenn || inSinnoh;
        });
      }

      //----------------------------------
      // 2. タイプフィルタ
      //----------------------------------
      if (filterTypeDataStore.filterTypeList.length > 0) {
        // 選択されているタイプの文字列を配列で取得
        const selectedTypes = filterTypeDataStore.filterTypeList.map(t => t.type);
        filtered = filtered.filter((pokemon) => {
          // pokemon.type1 or type2 のいずれかが含まれていればマッチ (OR検索)
          return selectedTypes.includes(pokemon.type1 ?? '') || selectedTypes.includes(pokemon.type2 ?? '');
        });
      }

      // フィルタ結果を表示リストとしてセットし、ページネーションを先頭にリセット
      this.setDisplayPokemonList(filtered);
      this.updatePaginatedPokemonList(1);
    },
    /* 追加: フィルタを全部リセットするアクション（必要なら） */
    resetFilter() {
      // フィルタ用ストアを呼び出して、filterリストを空に
      const filterTypeDataStore = useFilterTypeDataStore();
      const filterAreaDataStore = useFilterAreaDataStore();
      filterTypeDataStore.filterTypeList = [];
      filterAreaDataStore.filterAreaList = [];

      // 全部表示に戻して、ページネーションも1ページ目へ
      this.setDisplayPokemonList(this.pokemonList);
      this.updatePaginatedPokemonList(1);
    },
  },
});
