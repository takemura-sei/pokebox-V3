<script setup lang="ts">
  const { $pokeApi } = useNuxtApp();

  const fetchData = async () => {
    await $pokeApi.get('pokemon')
    .then(response => {
      console.log(response.data)
    })
  }

  const pokemonData = async () => {
    const res = await $pokeApi.get('ability');
    console.log(res.data);
  }

  fetchData();
  pokemonData();
</script>

<template>
  <h1 class="bg-blue-500">
    Hello World!
  </h1>
</template>