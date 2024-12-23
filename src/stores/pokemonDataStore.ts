// src/stores/pokemonList.ts
import { pokemonApiPlugin, pokemonDataPlugin } from "@/services/pokeApi";

import { defineStore } from "pinia";

export const usePokemonDataStore = defineStore('pokemon', {
  state: () => ({
    displayPokemonList: [],
  }),
  actions: {
    async fetchPokemonApi() {
      const response = await pokemonDataPlugin();
      this.displayPokemonList = response.data.results;
    },
    async fetchGetPokemonImage(url: string) {
      const response = await pokemonDataPlugin(url);
      console.log(response.data);
    }
  }
});