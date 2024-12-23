<script setup>
import PokemonImages from '@/components/card_details/PokemonImages.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div>
    <PokemonImages :name="data.name" :url="data.url"/>
  </div>
</template>