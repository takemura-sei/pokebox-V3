<!-- src/pages/index.vue -->
<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue';

</script>

<template>
  <div class="container">
    <PokemonList />
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