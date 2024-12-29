// src/services/pokeApi.ts
export {
  fetchPokemonData,
  fetchSingleData,
  fetchSpeciesData
};

const fetchPokemonData = async() => {
  const { $pokeApiPlugin } = useNuxtApp();
  const response = await $pokeApiPlugin.get('pokemon');
  return response.data;
};

const fetchSingleData = async(endpoint: string) => {
  const { $pokeApiPlugin } = useNuxtApp();
  const response = await $pokeApiPlugin.get(`pokemon/${endpoint}`)
  return response.data;
};

const fetchSpeciesData = async(endpoint: string) => {
  const { $pokeApiPlugin } = useNuxtApp();
  const response = await $pokeApiPlugin.get(`pokemon-species/${endpoint}`)
  return response.data;
}