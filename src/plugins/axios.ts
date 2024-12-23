import axios from 'axios';

export default defineNuxtPlugin(() => {
  const pokeApiPlugin = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const pokemonDataPlugin = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const abilityDataPlugin = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/ability/',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return {
    provide: {
      pokeApiPlugin,
      pokemonDataPlugin,
      abilityDataPlugin,
    },
  };
});