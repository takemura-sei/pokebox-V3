import axios from 'axios';

export default defineNuxtPlugin(() => {
  const pokemonData = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const abilityData = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/ability/',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return {
    provide: {
      pokemonData,
      abilityData
    },
  };
});