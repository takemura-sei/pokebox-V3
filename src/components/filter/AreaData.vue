<script setup>
import { useFilterAreaDataStore } from '@/stores/filterAreaDataStore';
import { areaList, areaName as areaNameData } from '@/utils/areaData';

const filterAreaDataStore = useFilterAreaDataStore();
</script>

<template>
  <div>
    <div class="flex mb-2">
      <img src="@/assets/images/ball.svg" alt="" width="20" height="20">
      <p class="ml-2">地方</p>
    </div>
    <ul class="flex flex-wrap gap-2 justify-center">
      <li v-for="item in areaList" :key="item.area" class="areaDataItem" @click="toggleFilterArea(item.id, item.area)" :class="{ 'selectedArea-filter': filterAreaDataStore.filterAreaList.some(filter => filter.id === item.id) }">
        <p>{{ areaName[item.area] }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.areaDataItem {
  flex: 0 0 calc(90% / 4);
  padding: 8px 16px;
  border: 1px solid rgb(125, 125, 125);
  border-radius: 20px;
  text-align: center;
}

.selectedArea-filter {
  border: 1.5px solid #fa0;
  background-color: #fff7e6;
}

@media (max-width: 640px) {
  .areaDataItem {
    flex: 0 0 calc(90% / 2);
  }
}
</style>