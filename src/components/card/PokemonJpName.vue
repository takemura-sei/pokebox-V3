<script setup>
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
const pokemonDataStore = usePokemonDataStoreV2();

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

</script>

<template>
  <p>{{ pokemonDataStore.displayJpNameDataV2[props.name] }}</p>
</template>