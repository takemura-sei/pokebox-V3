<!-- src/components/card/PokemonCard.vue -->
<script setup>
import PokemonImages from '@/components/card/PokemonImages.vue';
import PokemonJpName from '@/components/card/PokemonJpName.vue';
import Modal from '@/components/modal/ Modal .vue';
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import useModal from '@/composables/useModal';

const usePokemonDataStore = usePokemonDataStoreV2();

const { isModalOpen, openModal, closeModal } = useModal();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white p-2 rounded-lg" @click="openModal()">
    <div class="flex">
      <PokemonJpName :name="data.name" :url="data.url"/>
      <svg
        v-if="usePokemonDataStore.favoriteBox[data.name]"
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
    <PokemonImages :name="data.name" :url="data.url"/>

    <!-- モーダルウィンドウの表示 -->
    <Modal v-if="isModalOpen" :name="data.name" :url="data.url" @close="closeModal()"/>
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