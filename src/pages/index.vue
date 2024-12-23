<!-- src/pages/index.vue -->
<script setup lang="ts">
import { usePokemonDataStore } from '@/stores/pokemonDataStore';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonDataStore = usePokemonDataStore();

onMounted(async () => {
  await pokemonDataStore.fetchPokemonApi();
});

</script>

<template>
  <div v-if="pokemonDataStore.displayPokemonList">
    <h1 class="bg-blue-500">Hello World!</h1>
    <ul>
      <li v-for="pokemon in pokemonDataStore.displayPokemonList" :key="pokemon">
        <PokemonCard :data="pokemon"></PokemonCard>
      </li>
    </ul>
  </div>
  <p v-else>Loading Pokémon data...</p>
</template>