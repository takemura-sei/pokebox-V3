// src/stores/pokemonList.ts
import { fetchPokemonData, fetchSingleData } from "@/services/pokeApi";
import { defineStore } from "pinia";

type DisplayImageData = {
  [key: string]: string,
};

export const usePokemonDataStore = defineStore('pokemon', {
  state: () => ({
    displayPokemonList: [],
    displayImageData: {} as DisplayImageData,
  }),
  actions: {
    async loadPokemonApi() {
      const response = await fetchPokemonData();
      this.displayPokemonList = response.results;
    },
    async loadPokemonImage(name: string, endpoint: string) {
      const response = await fetchSingleData(endpoint);
      const imageUrl = response.sprites.front_default;
      this.displayImageData[name] = imageUrl;
    }
  }
});