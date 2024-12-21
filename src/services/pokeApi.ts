// src/services/pokeApi.ts
export {
  pokemonList,
  abilityList
};

const pokemonList = async (endpoint: string) => {
  const { $pokemonData } = useNuxtApp();
  const response = await $pokemonData.get(endpoint);
  return response;
};

const abilityList = async (endpoint: string) => {
  const { $abilityData } = useNuxtApp();
  const response = await $abilityData.get(endpoint);
  return response.data;
};