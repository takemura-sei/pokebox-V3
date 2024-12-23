// src/services/pokeApi.ts
export {
  pokemonApiPlugin,
  pokemonDataPlugin,
  abilityListPlugin
};

const pokemonApiPlugin = async(endpoint: string = '') => {
  const { $pokeApiPlugin } = useNuxtApp();
  const response = await $pokeApiPlugin.get(endpoint);
  return response;
}

const pokemonDataPlugin = async(endpoint: string = '') => {
  const { $pokemonDataPlugin } = useNuxtApp();
  const response = await $pokemonDataPlugin.get(endpoint);
  return response;
};

const abilityListPlugin = async(endpoint: string) => {
  const { $abilityDataPlugin } = useNuxtApp();
  const response = await $abilityDataPlugin.get(endpoint);
  return response;
};