// src/utils/toggleFilter.ts
import { useFilterTypeDataStore } from "@/stores/filterTypeDataStore";

export const toggleFilterType = (type: string, id: number) => {
  const filterDataStore = useFilterTypeDataStore();
  const exists = filterDataStore.filterTypeList.some(item => item.id === id);

  if (!exists) {
    filterDataStore.addFilterType(type, id);
  } else {
    filterDataStore.deleteFilterType(id);
  }
};
