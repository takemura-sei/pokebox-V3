// src/stores/pokemonList.ts
import { pokemonList } from "@/services/pokeApi";

import { defineStore } from "pinia";

export const usePokemonListStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: {},
    pokemonName: [],
    pokemonCount: 0,
  }),
  actions: {
    async fetchpokemonList(endpoint: string) {
      const response = await pokemonList(endpoint);
      this.pokemonList = response.data.name;
    }
  }
});