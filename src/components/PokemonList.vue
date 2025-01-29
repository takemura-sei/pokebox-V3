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
  <button @click="pokemonDataStore.toggleShowFavorites" class="toggle-button">
      {{ pokemonDataStore.showFavorites ? '全ポケモンを見る' : 'お気に入りのみ表示' }}
  </button>

  <div v-if="pokemonDataStore.filteredPokemonList.length" class="container">
    <ul class="flex flex-wrap gap-3 justify-center">
      <li v-for="pokemon in pokemonDataStore.filteredPokemonList" :key="pokemon.name">
        <PokemonCard :data="pokemon" />
      </li>
    </ul>
  </div>
  <p v-else>Loading Pokémon data...</p>
</template>

<style scoped>
.toggle-button {
  background-color: #ffcc00;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>

