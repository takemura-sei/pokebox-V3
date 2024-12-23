<script setup>
import { usePokemonDataStore } from '@/stores/pokemonDataStore';

const pokemonDataStore = usePokemonDataStore();

defineProps ({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

</script>

<template>
  <div>
    <p>{{ name }}</p>
    <p>{{ url }}</p>
  </div>
</template>