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
  await pokemonDataStore.getPokemonTypeList();
  pokemonDataStore.loadPokemonImageV2();
  pokemonDataStore.loadPokemonJpNameV2();
});
</script>

<template>
  <div>
    <div v-if="pokemonDataStore.filteredPokemonList.length" class="container">
      <ul class="flex flex-wrap gap-3 justify-center">
        <li v-for="pokemon in pokemonDataStore.filteredPokemonList" :key="pokemon.name">
          <PokemonCard :data="pokemon" />
        </li>
      </ul>
    </div>
    <p v-else>{{ favoriteDataStore.showFavorites ? 'お気に入り登録しているポケモンがいません。' : 'Loading Pokémon data...' }}</p>
  </div>
</template>


