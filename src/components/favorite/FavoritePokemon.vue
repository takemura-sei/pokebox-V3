<script setup>
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';

const favoriteDataStore = useFavoriteDataStore()

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

const isFavorite = ref(false);

watchEffect(() => {
  isFavorite.value = favoriteDataStore.favoritePokemonList.some(pokemon => pokemon.name === props.name);
});
</script>

<template>
  <button @click="toggleFavorite(isFavorite, name, url)" class="favorite-button">
    <!-- お気に入り登録時は黄色、未登録時は灰色 -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="favorite-icon"
      :class="{ 'favorite-active': isFavorite, 'favorite-inactive': !isFavorite }"
    >
      <path
        fill="currentColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  </button>
</template>

<style scoped>
/* ボタンのデザインを調整 */
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

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

/* 未登録の場合の色 (灰色) */
.favorite-inactive {
  color: #ccc;
}
</style>