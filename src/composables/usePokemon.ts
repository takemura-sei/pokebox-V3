// src/composables/usePokemon.ts
import { fetchPokemonList } from "@/services/pokeApi";

const useFetchPokemonList = async() => {
  const response = await fetchPokemonList();
  console.log(response.count);
};

export {
  useFetchPokemonList,
};