// src/utils/toggleFilter.ts
import { useFilterTypeDataStore } from "@/stores/filterTypeDataStore";
import { useFilterAreaDataStore } from "@/stores/filterAreaDataStore";

export const toggleFilterType = (type: string, id: number) => {
  const filterTypeDataStore = useFilterTypeDataStore();
  const exists = filterTypeDataStore.filterTypeList.some(item => item.id === id);

  if (!exists) {
    filterTypeDataStore.addFilterType(type, id);
  } else {
    filterTypeDataStore.deleteFilterType(id);
  }
};

export const toggleFilterArea = (id: number, area: string) => {
  const filterAreaDataStore = useFilterAreaDataStore();
  const exists = filterAreaDataStore.filterAreaList.some(item => item.id === id);

  if (!exists) {
    filterAreaDataStore.addFilterArea(id, area);
  } else {
    filterAreaDataStore.deleteFilterArea(id);
  }
}