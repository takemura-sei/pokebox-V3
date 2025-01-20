<!-- src/components/modal/Modal.vue -->
<script setup>
import PokemonImages from '@/components/card/PokemonImages.vue';
import PokemonJpName from '@/components/card/PokemonJpName.vue';
import { useFavoriteStore } from '@/stores/favoriteStore';

const favoriteStore = useFavoriteStore();

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

const isFavorite = computed(() => !!favoriteStore.favoriteBox[props.name]);

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoriteStore.deleteFavoritePokemon(props.name);
    console.log(favoriteStore.favoriteBox);
  } else {
    favoriteStore.choiseFavoritePokemon(props.name, props.url);
    console.log(favoriteStore.favoriteBox);
  }
};

</script>

<template>
  <div class="modal-overlay" @click.stop="$emit('close')">
    <div class="modal-content" @click.stop>
      <button @click="toggleFavorite" class="favorite-button">
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
      <PokemonJpName :name="name" :url="url"/>
      <PokemonImages :name="name" :url="url"/>
      <button class="block" @click="toggleFavorite">お気に入り</button>
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
