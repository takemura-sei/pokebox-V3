<script setup lang="ts">
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import PokemonCard from '@/components/card/PokemonCard.vue';

const pokemonDataStore = usePokemonDataStoreV2();

// 初回データロード
onMounted(async () => {
  await pokemonDataStore.loadAllPokemonData();
});
</script>

<template>
  <div v-if="pokemonDataStore.paginatedPokemonList.length" class="container">
    <ul class="flex flex-wrap gap-3 justify-center">
      <li v-for="pokemon in pokemonDataStore.paginatedPokemonList" :key="pokemon.name">
        <PokemonCard :data="pokemon" />
      </li>
    </ul>
  </div>
  <p v-else>Loading Pokémon data...</p>
</template>
