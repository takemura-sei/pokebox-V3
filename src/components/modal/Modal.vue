<!-- src/components/modal/Modal.vue -->
<script setup>
import FavoritePokemon from '@/components/favorite/FavoritePokemon.vue';
import PokemonImages from '@/components/card/PokemonImages.vue';
import PokemonJpName from '@/components/card/PokemonJpName.vue';
import typeData from '@/components/filter/typeData.vue';
import AreaData from '@/components/filter/AreaData.vue';
import Search from '@/components/filter/Search.vue';
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';
import { useModalDataStore } from '@/stores/modalDataStore';

const favoriteDataStore = useFavoriteDataStore();
const modalDataStore = useModalDataStore();

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const isFavorite = computed(() =>
  favoriteDataStore.favoritePokemonList.some(pokemon => pokemon.name === props.name)
);
</script>

<template>
  <div class="modal-overlay" @click.stop="$emit('close')">
    <div v-if="modalDataStore.isFavoriteModalOpen" class="modal-content-pokemon" @click.stop>
      <button class="close-button" @click.stop="$emit('close')">×</button>
      <FavoritePokemon :name="name" :url="url"/>
      <PokemonJpName :name="name"/>
      <PokemonImages :name="name"/>
      <button class="block" @click="toggleFavorite(isFavorite, name, url)">お気に入り</button>
    </div>
    <div v-if="modalDataStore.isFilterModalOpen" class="modal-content" @click.stop>
      <button class="close-button" @click.stop="modalDataStore.closeFilterModal()">×</button>
      <div>
        <typeData class="mb-5 pt-5 px-5"/>
        <AreaData class="mb-5 px-5" />
      </div>
      <Search class="p-3 search-compornent"/>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content-pokemon {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.modal-content {
  position: relative;
  background: white;
  max-width: 50%;
  min-width: 355px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.close-button {
  position: absolute;
  top: -12px;
  right: -7px;
  padding: 2px 10px 4px;
  border-radius: 50%;
  background-color: rgb(207, 207, 207);
  z-index: 1001;
}

.search-compornent {
  background-color: #f2f2f2;
  border-radius: 8px;
}
</style>
