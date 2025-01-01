<script setup lang="ts">
import { usePokemonDataStore } from '@/stores/pokemonDataStore';
import PokemonCard from '@/components/card/PokemonCard.vue';

const pokemonDataStore = usePokemonDataStore();

onMounted(async () => {
  await pokemonDataStore.loadPokemonSelection();
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