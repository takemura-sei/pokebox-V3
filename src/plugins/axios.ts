import axios from 'axios';

export default defineNuxtPlugin(() => {
  const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
      'Content-Type': 'application/json',
    }
  }) ;

  return {
    provide: {
      pokeApi
    },
  };
});