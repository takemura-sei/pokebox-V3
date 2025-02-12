<!-- src/components/filter/typeData.vue -->
<script setup>
import { typeList, typeJpName as typeJpNameData, typeImage as typeImageData } from '@/utils/typeData';

const typeJpName = ref(typeJpNameData);
const typeImage = ref(typeImageData);
</script>

<template>
  <div>
    <ul class="flex flex-wrap">
      <li v-for="item in typeList" :key="item.type" class="typeDataItem">
        <!-- typeImage[item.type] には既にインポート済みの画像パスが入っているので表示される -->
        <img :src="typeImage[item.type]" alt="" class="mb-1 p-1">
        <p class="text-xs">{{ typeJpName[item.type] }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.typeDataItem {
  flex: 0 0 calc(100% / 9);
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

/* .aa {
  border: 1px solid red;
  border-radius: 6px;
} */
</style>
