import { defineStore } from "pinia";

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 30,
  }),
  actions: {
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    setTotalPage() {
      // ポケモンは151匹までなので、151匹に基づいてページ数を計算
      this.totalPages = Math.ceil(151 / this.itemsPerPage);
    }
  }
})