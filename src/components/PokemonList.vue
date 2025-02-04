<script setup lang="ts">
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';
import PokemonCard from '@/components/card/PokemonCard.vue';

const pokemonDataStore = usePokemonDataStoreV2();
const favoriteDataStore = useFavoriteDataStore();

// 初回データロード
onMounted(async () => {
  await pokemonDataStore.getPokemonList();
  pokemonDataStore.getPokemonIdList();
  pokemonDataStore.loadPokemonImageV2();
  pokemonDataStore.loadPokemonJpNameV2();
});
</script>

<template>
  <div>
    <button @click="pokemonDataStore.toggleShowFavorites" class="toggle-button">
        {{ favoriteDataStore.showFavorites ? '全ポケモンを見る' : 'お気に入りのみ表示' }}
    </button>
    <div v-if="pokemonDataStore.filteredPokemonList.length" class="container">
      <ul class="flex flex-wrap gap-3 justify-center">
        <li v-for="pokemon in pokemonDataStore.filteredPokemonList" :key="pokemon.name">
          <PokemonCard :data="pokemon" />
        </li>
      </ul>
    </div>
    <p v-else>Loading Pokémon data...</p>
  </div>
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

