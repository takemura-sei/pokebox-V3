// src/composables/useModal.ts
import { ref } from 'vue';
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';

export default function useModal() {
  const isFavoriteModalOpen = ref(false);
  const isFilterModalOpen = ref(false);

  const openFavoriteModal = () => {
    isFavoriteModalOpen.value = true;
  };

  const closeFavoriteModal = (name: string) => {
    isFavoriteModalOpen.value = false;

    // ここで store を呼び出す（関数内で使う）
    const favoriteDataStore = useFavoriteDataStore()
    if (!favoriteDataStore.favoritePokemonList.find(pokemon => pokemon.name === name)) {
      favoriteDataStore.reloadFaovoritePageFlag();
    }
  };

  const openFilterModalOpen = () => {
    isFilterModalOpen.value = true;
  }

  const closeFilterModalOpen = () => {
    isFilterModalOpen.value = false;
  }

  return {
    isFavoriteModalOpen,
    openFavoriteModal,
    closeFavoriteModal,
    isFilterModalOpen,
    openFilterModalOpen,
    closeFilterModalOpen,
  };
}
