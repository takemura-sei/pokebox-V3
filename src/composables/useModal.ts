import { ref } from 'vue';
import { useFavoriteDataStore } from '@/stores/favoriteDataStore';

export default function useModal() {
  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = (name: string) => {
    isModalOpen.value = false;

    // ここで store を呼び出す（関数内で使う）
    const favoriteDataStore = useFavoriteDataStore()
    if (!favoriteDataStore.favoritePokemonList.find(pokemon => pokemon.name === name)) {
      favoriteDataStore.reloadFaovoritePageFlag();
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
