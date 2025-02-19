import { defineStore } from "pinia";
import type { FilterAreaType } from "@/types/pokemonDataStoreTypes";

export const useFilterAreaDataStore = defineStore('filterAreaData', {
  state: () => ({
    filterAreaList: [] as FilterAreaType,
  }),
  actions: {
    addFilterArea(id: number, area: string) {
      if(!this.filterAreaList.find(item => item.id === id)) {
        this.filterAreaList.push({ id, area });
      }
    },
    deleteFilterArea(id: number) {
      this.filterAreaList = this.filterAreaList.filter(item => item.id !== id);
    },
  }
})