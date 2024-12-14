// src/composables/usePokemon.ts
import { fetchPokemonList } from "@/services/pokeApi";

const useFetchPokemonList = () => {
  return fetchPokemonList();
};

export {
  useFetchPokemonList,
};