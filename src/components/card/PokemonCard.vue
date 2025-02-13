<!-- src/components/card/PokemonCard.vue -->
<script setup>
import PokemonImages from '@/components/card/PokemonImages.vue';
import PokemonJpName from '@/components/card/PokemonJpName.vue';
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';
import { useModalDataStore } from '@/stores/modalDataStore';

const favoriteDataStore = useFavoriteDataStore();
const modalDataStore = useModalDataStore();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// カードクリック時に、選択された Pokémon のデータをストアにセットしてモーダルを開く
const onCardClick = () => {
  modalDataStore.setSelectedPokemon(props.data);
  modalDataStore.openFavoriteModal();
};
</script>

<template>
  <div class="bg-white p-2 rounded-lg" @click="onCardClick()">
    <div class="flex">
      <PokemonJpName :name="data.name" :url="data.url"/>
      <svg
        v-if="favoriteDataStore.favoritePokemonList.some(pokemon => pokemon.name === data.name)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="favorite-icon favorite-active"
      >
        <path
          fill="currentColor"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </div>
    <PokemonImages :name="data.name"/>
  </div>
</template>

<style scoped>
/* 星アイコンのサイズ調整 */
.favorite-icon {
  width: 24px;
  height: 24px;
  transition: color 0.3s ease;
}

/* 登録済みの場合の色 (黄色) */
.favorite-active {
  color: #ffc107;
}
</style>