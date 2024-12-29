// src/stores/pokemonList.ts
import { fetchPokemonData, fetchSingleData, fetchSpeciesData } from "@/services/pokeApi";
import { defineStore } from "pinia";

type DisplayImageDataType = {
  [key: string]: string,
};

type DisplayJpNameDataType = {
  [key: string]: string,
};

type LanguageNameObjType = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

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