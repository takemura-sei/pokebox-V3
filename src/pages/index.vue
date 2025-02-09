<!-- src/pages/index.vue -->
<script setup lang="ts">
import PageHeader from '@/components/pageHeader/PageHeader.vue';
import PokemonList from '@/components/PokemonList.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import Modal from '@/components/modal/Modal.vue';
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { useModalDataStore } from '@/stores/modalDataStore';

const pokemonDataStore = usePokemonDataStoreV2();
const modalDataStore = useModalDataStore();

onMounted(async () => {
  await pokemonDataStore.getPokemonType();
});
</script>

<template>
  <div class="container">
    <PageHeader />
    <PokemonList class="mb-8"/>
    <Pagination />
    <Modal
      v-if="modalDataStore.isFavoriteModalOpen"
      :name="modalDataStore.selectedPokemon?.name"
      :url="modalDataStore.selectedPokemon?.url"
      @close="modalDataStore.closeFavoriteModal(modalDataStore.selectedPokemon?.name)"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(203, 238, 238);
}
</style>