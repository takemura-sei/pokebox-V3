// src/stores/filterTypeDataStore.ts
import { defineStore } from "pinia";
import type { FilterListType } from "@/types/pokemonDataStoreTypes";

export const useFilterTypeDataStore = defineStore('filterTypeData', {
  state: () => ({
    filterTypeList: [] as FilterListType,
  }),
  getters: {
    isAnyFilterSelected: (state) => state.filterTypeList.length > 0,
  },
  actions: {
    addFilterType(type: string, id: number) {
      if (!this.filterTypeList.find(item => item.id === id)) {
        this.filterTypeList.push({ type, id });
        console.log(this.filterTypeList);
      }
    },
    deleteFilterType(id: number) {
      this.filterTypeList = this.filterTypeList.filter(item => item.id !== id);
      console.log(this.filterTypeList);
    },
  }
});
