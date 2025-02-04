import { ref } from 'vue';

export default function useModal(name: string) {
  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;

    // ここで store を呼び出す（関数内で使う）
    const pokemonDataStore = usePokemonDataStoreV2();
    if (!pokemonDataStore.favoritePokemonList.find(pokemon => pokemon.name === name)) {
      pokemonDataStore.reloadFaovoritePage();
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
