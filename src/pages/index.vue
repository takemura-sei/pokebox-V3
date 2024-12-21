<!-- src/pages/index.vue -->
<script setup lang="ts">
import { usePokemonListStore } from '@/stores/pokemonListStore';

const pokemonListStore = usePokemonListStore();

onMounted(async () => {
  await pokemonListStore.fetchpokemonList("1");
})

</script>

<template>
  <h1 class="bg-blue-500">
    Hello World!
  </h1>
  <p>Count:{{ pokemonListStore.pokemonCount }}</p>
  <p>Name:{{ pokemonListStore.pokemonList }}</p>
</template>