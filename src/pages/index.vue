<!-- src/pages/index.vue -->
<script setup lang="ts">
import { usePokemonDataStore } from '@/stores/pokemonDataStore';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonDataStore = usePokemonDataStore();

onMounted(async () => {
  await pokemonDataStore.loadPokemonApi();
});

</script>

<template>
  <div v-if="pokemonDataStore.displayPokemonList" class="container">
    <ul class="flex flex-wrap gap-3 justify-center">
      <li v-for="pokemon in pokemonDataStore.displayPokemonList" :key="pokemon">
        <PokemonCard :data="pokemon" />
      </li>
    </ul>
  </div>
  <p v-else>Loading Pokémon data...</p>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(203, 238, 238);
}
</style>