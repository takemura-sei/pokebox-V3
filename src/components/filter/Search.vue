<script setup lang="ts">
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { useModalDataStore } from '@/stores/modalDataStore';
import { useFilterTypeDataStore } from '@/stores/filterTypeDataStore';
import { useFilterAreaDataStore } from '@/stores/filterAreaDataStore';
import { computed } from 'vue';

const pokemonDataStore = usePokemonDataStoreV2();
const modalDataStore = useModalDataStore();
const filterTypeDataStore = useFilterTypeDataStore();
const filterAreaDataStore = useFilterAreaDataStore();

/** 
 * タイプ or 地方のどちらか一つでも選択されているかどうかを判定
 * ここでは OR 条件（いずれかのフィルタが選択されていればtrue）
 */
const isAnyFilterSelected = computed(() => {
  return (
    filterTypeDataStore.filterTypeList.length > 0 ||
    filterAreaDataStore.filterAreaList.length > 0
  );
});

const handleSearch = () => {
  // もし何も選択されていないなら何もしない（フォローアップで空クリック無効化）
  if (!isAnyFilterSelected.value) return;

  // フィルタを適用して結果を表示用リストへ反映
  pokemonDataStore.applyFilter();
  // モーダルを閉じる
  modalDataStore.closeFilterModal();
};

const handleReset = () => {
  pokemonDataStore.resetFilter();
  // 必要に応じてリセット時にもモーダルを閉じたい場合は↓を有効化
  // modalDataStore.closeFilterModal();
};
</script>

<template>
  <div class="flex gap-4 justify-center mt-5">
    <button 
      @click="handleSearch" 
      class="border px-2 py-1 rounded search-button"
      :disabled="!isAnyFilterSelected"
    >
      検索する
    </button>
    <button 
      @click="handleReset" 
      class="border px-2 py-1 rounded"
    >
      条件をリセット
    </button>
  </div>
</template>

<style scoped>
.search-button {
  border-radius: 5px;
  color: #fff;
  background-color: #e40b20;
}

/* ボタンが disabled のときのスタイルを調整する場合 */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
