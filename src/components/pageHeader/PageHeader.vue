<script setup>
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';
import { useModalDataStore } from '@/stores/modalDataStore';
import Modal from '@/components/modal/Modal.vue';

const pokemonDataStore = usePokemonDataStoreV2();
const favoriteDataStore = useFavoriteDataStore();
const modalDataStore = useModalDataStore();

</script>

<template>
  <div>
    <div class="flex item-center gap-4 justify-end mb-5">
      <button @click="pokemonDataStore.toggleShowFavorites" class="toggle-button">
          {{ favoriteDataStore.showFavorites ? '全ポケモンを見る' : 'お気に入りのみ表示' }}
      </button>
      <button @click="modalDataStore.openFilterModal()">
        <img src="../../assets/images/icon_search.svg" alt="検索ボタン" width="40" height="40">
      </button>
    </div>
    <Modal v-if="modalDataStore.isFilterModalOpen" @close="modalDataStore.closeFilterModal()"/>
  </div>
</template>

<style scoped>
.toggle-button {
  background-color: #ffcc00;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
</style>