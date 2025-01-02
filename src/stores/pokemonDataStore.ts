// src/stores/pokemonList.ts
import { defineStore } from "pinia";
import { fetchPokemonSelectionData, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import { getDisplayRange } from "@/utils/displayRangeUtils";
import type { DisplayImageDataType, DisplayJpNameDataType, LanguageNameObjType } from "@/types/pokemonTypes";

export const usePokemonDataStore = defineStore('pokemon', {
  state: () => ({
    displayPokemonList: [],
    displayImageData: {} as DisplayImageDataType,
    displayJpNameData: {} as DisplayJpNameDataType,
  }),
  actions: {
    async loadPokemonSelection() {
      const { offset, finalLimit } = getDisplayRange();
      const response = await fetchPokemonSelectionData(offset, finalLimit);
      this.displayPokemonList = response.results;
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