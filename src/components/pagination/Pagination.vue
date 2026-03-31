<script setup lang="ts">
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
const pokemonDataStore = usePokemonDataStoreV2();

// 総ページ数の算出（例: 総件数 ÷ 1ページあたりの件数）
const totalPages = computed(() => {
  return Math.ceil(pokemonDataStore.displayPokemonList.length / pokemonDataStore.itemsPerPage);
});

// 現在のページが最初または最後かどうか
const isFirstPage = computed(() => pokemonDataStore.currentPage === 1);
const isLastPage = computed(() => pokemonDataStore.currentPage === totalPages.value);

// ページ番号（または「…」）のリストを作成
const paginationItems = computed<(number | string)[]>(() => {
  const cp = pokemonDataStore.currentPage;
  const total = totalPages.value;
  let pages: (number | string)[] = [];

  // 総ページ数が少ない場合は全てのページ番号を表示
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 常に先頭のページは表示
  pages.push(1);

  // 現在のページの前後1ページを表示するための範囲を決定（ただし 2～(total-1) の間）
  let start = Math.max(cp - 1, 2);
  let end = Math.min(cp + 1, total - 1);

  // 先頭付近の場合、表示範囲を拡大（例: 1,2,3,4,...）
  if (cp === 1 || cp === 2) {
    start = 2;
    end = 3;
  }
  // 末尾付近の場合、表示範囲を拡大（例: ...,(total-3), (total-2), (total-1), total）
  if (cp === total || cp === total - 1) {
    start = total - 2;
    end = total - 1;
  }

  // 先頭ページと start ページの間に隙間があれば「…」を追加
  if (start > 2) {
    pages.push("...");
  }

  // 指定範囲のページを追加
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // end ページと最終ページの間に隙間があれば「…」を追加
  if (end < total - 1) {
    pages.push("...");
  }

  // 常に最終ページを表示
  pages.push(total);

  return pages;
});

// 指定ページに遷移する関数
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    pokemonDataStore.updatePaginatedPokemonList(page);
    console.log('ページネーション用に分割したポケモンリスト：', pokemonDataStore.paginatedPokemonList);
  }
};

// 前のページ、次のページへ移動する関数
const prevPage = () => {
  if (!isFirstPage.value) {
    goToPage(pokemonDataStore.currentPage - 1);
  }
};

const nextPage = () => {
  if (!isLastPage.value) {
    goToPage(pokemonDataStore.currentPage + 1);
  }
};
</script>

<template>
  <nav aria-label="Pagination" class="flex justify-center items-center mt-4 space-x-2">
    <!-- 前ページボタン -->
    <button @click="prevPage" :disabled="isFirstPage" class="pagination-btn">
      ＜
    </button>

    <!-- ページ番号および「…」の表示 -->
    <template v-for="(item, index) in paginationItems" :key="index">
      <!-- 数字の場合はクリック可能なリンク -->
      <button 
        v-if="typeof item === 'number'" 
        @click="goToPage(item)"
        :class="['pagination-btn', { active: item === pokemonDataStore.currentPage }]"
      >
        {{ item }}
      </button>
      <!-- 「…」の場合は単なるテキスト -->
      <span v-else class="pagination-ellipsis">{{ item }}</span>
    </template>

    <!-- 次ページボタン -->
    <button @click="nextPage" :disabled="isLastPage" class="pagination-btn">
      ＞
    </button>
  </nav>
</template>

<style scoped>
.pagination-btn {
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.pagination-btn:hover:not(:disabled) {
  background-color: #e2e2e2;
}
.pagination-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
.active {
  font-weight: bold;
  background-color: #ccc;
}
.pagination-ellipsis {
  margin: 0 5px;
  padding: 8px 16px;
}

/* メディアクエリでスマートフォン向けにサイズ調整 */
@media (max-width: 640px) {
  .pagination-btn {
    padding: 6px 12px;
    margin: 0 3px;
    font-size: 0.875rem;
  }

  .pagination-ellipsis {
    padding: 3px 0;
    margin: 0 1px;
    font-size: 0.875rem;
  }
}
</style>
