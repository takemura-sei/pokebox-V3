// src/stores/modalDataStore
import { defineStore } from "pinia";
import { useFavoriteDataStore } from "@/stores/favoriteDataStore";

export const useModalDataStore = defineStore('modalData', {
  state: () => ({
    selectedPokemon: null as { name: string; url: string } | null,  
    isFavoriteModalOpen: false as boolean,
    isFilterModalOpen: false as boolean,
  }),
  actions: {
    openFavoriteModal() {
      this.isFavoriteModalOpen = true;
    },
    closeFavoriteModal(name: string | undefined) {
      this.isFavoriteModalOpen = false;

      const favoriteDataStore = useFavoriteDataStore()
      if (!favoriteDataStore.favoritePokemonList.find(pokemon => pokemon.name === name)) {
        favoriteDataStore.reloadFaovoritePageFlag();
      }
      this.selectedPokemon = null;
    },
    openFilterModal() {
      this.isFilterModalOpen = true;
    },
    closeFilterModal() {
      this.isFilterModalOpen = false;
    },
    // 選択したポケモンのデータを設定するアクション
    setSelectedPokemon(pokemon: { name: string; url: string }) {
      this.selectedPokemon = pokemon;
    }
  }
});