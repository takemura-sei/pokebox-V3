import { ref } from 'vue';

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
      favoriteDataStore.reloadFaovoritePage();
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
