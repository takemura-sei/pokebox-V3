<script setup>
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
const pokemonDataStore = usePokemonDataStoreV2();

const props = defineProps ({
  name: {
    type: String,
    required: true
  },
});

</script>

<template>
    <img :src="pokemonDataStore.displayImageDataV2[props.name]" alt="" class="pokemon-img">
</template>

<style scoped>
@media (max-width: 640px) {
  .pokemon-img {
    width: 80px;
  } 
}
</style>