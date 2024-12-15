// src/services/pokeApi.ts
export {
  fetchPokemonList,
  fetchPokemonAbility,
};

const fetchPokemonList = async () => {
  const { $pokeApi } = useNuxtApp();
  const response = await $pokeApi.get('pokemon');
  return response.data;
};

const fetchPokemonAbility = async () => {
  const { $pokeApi } = useNuxtApp();
  const response = await $pokeApi.get('ability');
  return response.data;
};