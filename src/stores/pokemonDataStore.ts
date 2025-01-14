// src/stores/pokemonList.ts
import { defineStore } from "pinia";
import { fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import type { DisplayImageDataType, DisplayJpNameDataType } from "@/types/pokemonTypes";

export const usePokemonDataStore = defineStore('pokemon', {
  state: () => ({
    displayImageData: {} as DisplayImageDataType,
    displayJpNameData: {} as DisplayJpNameDataType,
  }),
  actions: {
    async loadPokemonImage(endpoint: string) {
      const response = await fetchSingleData(endpoint);
      const imageUrl = response.sprites.front_default;
      this.displayImageData[endpoint] = imageUrl;
    },
    async loadPokemonJpName(endpoint: string) {
      const response = await fetchSpeciesData(endpoint);
      const jpNameObj = response.names[9].name;
      this.displayJpNameData[endpoint] = jpNameObj;
    }
  }
});