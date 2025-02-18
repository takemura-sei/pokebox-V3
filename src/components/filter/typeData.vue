<!-- src/components/filter/typeData.vue -->
<script setup>
import { useFilterTypeDataStore } from '@/stores/filterTypeDataStore';
import { typeList, typeJpName as typeJpNameData, typeImage as typeImageData } from '@/utils/typeData';
import { toggleFilterType } from '@/utils/toggleFilter';

const filterTypeDataStore = useFilterTypeDataStore();

// 静的データなのでそのまま使ってOK
const typeJpName = typeJpNameData;
const typeImage = typeImageData;
</script>

<template>
  <div>
    <div class="flex">
      <img src="@/assets/images/ball.svg" alt="" width="20" height="20">
      <p class="ml-2">タイプ</p>
    </div>
    <ul class="flex flex-wrap">
      <li
        v-for="item in typeList"
        :key="item.type"
        class="typeDataItem"
        @click="toggleFilterType(item.type, item.id)"
      >
        <img :src="typeImage[item.type]" alt="" class="mb-1 p-1" :class="{ 'selectedType-filter': filterTypeDataStore.filterTypeList.some(filter => filter.id === item.id) }">
        <p class="text-xs">{{ typeJpName[item.type] }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.typeDataItem {
  flex: 0 0 calc(100% / 9);
  box-sizing: border-box;
  padding: 5px;
  text-align: center;
}

.selectedType-filter {
  border: 2px solid #fa0;
  border-radius: 5px;
}

@media (max-width: 640px) {
  .typeDataItem {
    flex: 0 0 calc(100% / 6);
    padding: 1px;
  }
}
</style>
