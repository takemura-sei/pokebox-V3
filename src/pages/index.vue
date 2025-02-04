<!-- src/pages/index.vue -->
<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue';
import Pagination from '@/components/pagination/Pagination.vue';

</script>

<template>
  <div class="container">
    <PokemonList class="mb-8"/>
    <Pagination />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(203, 238, 238);
}
</style>