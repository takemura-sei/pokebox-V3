<script setup>
import PokemonImages from '@/components/card_details/PokemonImages.vue';
import PokemonJpName from '@/components/card_details/PokemonJpName.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div>
    <PokemonJpName :name="data.name" :url="data.url"/>
    <PokemonImages :name="props.data.name" :url="props.data.url"/>
  </div>
</template>