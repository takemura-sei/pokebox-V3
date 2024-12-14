<!-- src/pages/index.vue -->
<script setup lang="ts">
import { useFetchPokemonList} from '@/composables/usePokemon';

useFetchPokemonList();
</script>

<template>
  <h1 class="bg-blue-500">
    Hello World!
  </h1>
</template>