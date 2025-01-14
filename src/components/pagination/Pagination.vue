<script setup>
import { usePaginationStore } from '@/stores/paginationStore'
const paginationStore = usePaginationStore()

const currentPage = computed(() => paginationStore.currentPage)
const totalPages = computed(() => paginationStore.totalPages)

const isFirstPage = computed(() => currentPage.value === 1)
const isLastPage = computed(() => currentPage.value === totalPages.value)

const prevPage = () => {
  if (!isFirstPage.value) {
    paginationStore.setCurrentPage(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (!isLastPage.value) {
    paginationStore.setCurrentPage(currentPage.value + 1)
  }
}
</script>

<template>
  <nav aria-label="Pagination">
    <ul class="pagination">
      <li>
        <button @click="prevPage" :disabled="isFirstPage">＜</button>
      </li>
      <li>
        <button>
          {{ currentPage }}
        </button>
      </li>
      <li>
        <button @click="nextPage" :disabled="isLastPage">＞</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-top: 32px;
}

.pagination li {
  margin: 0 5px;
}

.pagination li button {
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
}

button.active {
  font-weight: bold;
  color: blue;
}
</style>
