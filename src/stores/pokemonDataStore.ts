// src/stores/pokemonList.ts
import { defineStore } from "pinia";
import { usePaginationStore } from "~/stores/paginationStore";
import { fetchPokemonData, fetchPokemonSelectionData, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { DisplayImageDataType, DisplayJpNameDataType, LanguageNameObjType } from "@/types/pokemonTypes";

// const paginationStore = usePaginationStore();

export const usePokemonDataStore = defineStore('pokemon', {
  state: () => ({
    displayPokemonList: [],
    displayImageData: {} as DisplayImageDataType,
    displayJpNameData: {} as DisplayJpNameDataType,
  }),
  actions: {
    async loadPokemonApi() {
      const response = await fetchPokemonData();
      this.displayPokemonList = response.results;
    },
    async loadPokemonSelection() {
      const paginationStore = usePaginationStore();
      const offset = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
      const limit = paginationStore.itemsPerPage;
      const response = await fetchPokemonSelectionData(offset, limit);
      this.displayPokemonList = response.results;
      paginationStore.setTotalPage();
    },
    async loadPokemonImage(name: string, endpoint: string) {
      const response = await fetchSingleData(endpoint);
      const imageUrl = response.sprites.front_default;
      this.displayImageData[name] = imageUrl;
    },
    async loadPokemonJpName(name: string, endpoint: string) {
      const response = await fetchSpeciesData(endpoint);
      const jpNameObj = response.names.find(
        (obj: LanguageNameObjType) => obj.language.name === 'ja'
      );
      this.displayJpNameData[name] = jpNameObj.name;
    }
  }
});