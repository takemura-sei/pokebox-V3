// src/services/pokeApi.ts
export {
  fetchPokemonData,
  fetchSingleData
};

const fetchPokemonData = async() => {
  const { $pokeApiPlugin } = useNuxtApp();
  const response = await $pokeApiPlugin.get('pokemon');
  return response.data;
}

const fetchSingleData = async(endpoint: string) => {
  const { $pokeApiPlugin } = useNuxtApp();
  const response = await $pokeApiPlugin.get(`pokemon/${endpoint}`)
  return response.data;
}