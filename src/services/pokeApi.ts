// src/services/pokeApi.ts
const fetchPokemonList = async () => {
  const { $pokeApi } = useNuxtApp();
  const response = await $pokeApi.get('pokemon');
  console.log(response.data);
};

const fetchPokemonAbility = async () => {
  const { $pokeApi } = useNuxtApp();
  const response = await $pokeApi.get('ability');
  console.log(response.data);
};

export {
  fetchPokemonList,
  fetchPokemonAbility,
};