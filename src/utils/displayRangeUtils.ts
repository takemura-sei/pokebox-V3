import { usePaginationStore } from "@/stores/paginationStore";

export const getDisplayRange = () => {
  const paginationStore = usePaginationStore();
  const offset = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
  const limit = paginationStore.itemsPerPage;

  const remainingPokemons = 151 - offset;
  const finalLimit = remainingPokemons < limit ? remainingPokemons : limit;

  paginationStore.setTotalPage();
  return { offset, finalLimit };
}