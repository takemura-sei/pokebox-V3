<script setup>
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';

const pokemonDataStore = usePokemonDataStoreV2();

// ページネーション操作
const isFirstPage = computed(() => pokemonDataStore.currentPage === 1);
const isLastPage = computed(() => {
  return pokemonDataStore.paginatedPokemonList.length < pokemonDataStore.itemsPerPage;
});

const prevPage = () => {
  if (!isFirstPage.value) {
    pokemonDataStore.updatePaginatedPokemonList(pokemonDataStore.currentPage - 1);
  }
};

const nextPage = () => {
  if (!isLastPage.value) {
    pokemonDataStore.updatePaginatedPokemonList(pokemonDataStore.currentPage + 1);
  }
};
</script>

<template>
  <nav aria-label="Pagination" class="flex justify-center items-center mt-4">
    <button @click="prevPage" :disabled="isFirstPage">＜</button>
    <span>Page {{ pokemonDataStore.currentPage }}</span>
    <button @click="nextPage" :disabled="isLastPage">＞</button>
  </nav>
</template>

<style scoped>
button {
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
