import axios from 'axios';

export default defineNuxtPlugin(() => {
  const pokeApiPlugin = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return {
    provide: {
      pokeApiPlugin,
    },
  };
});