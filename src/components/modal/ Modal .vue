<!-- src/components/modal/Modal.vue -->
<script setup>
import FavoritePokemon from '@/components/favorite/FavoritePokemon.vue';
import PokemonImages from '@/components/card/PokemonImages.vue';
import PokemonJpName from '@/components/card/PokemonJpName.vue';
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { toggleFavorite } from '@/utils/toggleFavorite';

const pokemonDataStore = usePokemonDataStoreV2();

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
  pokemonDataStore.favoritePokemonList.some(pokemon => pokemon.name === props.name)
);
</script>

<template>
  <div class="modal-overlay" @click.stop="$emit('close')">
    <div class="modal-content" @click.stop>
      <FavoritePokemon :name="name" :url="url"/>
      <PokemonJpName :name="name" :url="url"/>
      <PokemonImages :name="name" :url="url"/>
      <button class="block" @click="toggleFavorite(isFavorite, name, url)">お気に入り</button>
      <button class="close-button" @click.stop="$emit('close')">閉じる</button>
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
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.close-button {
  margin-top: 20px;
}
</style>
