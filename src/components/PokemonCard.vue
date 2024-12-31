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
  <div class="bg-white p-2 rounded-lg">
    <PokemonJpName :name="props.data.name" :url="props.data.url"/>
    <PokemonImages :name="props.data.name" :url="props.data.url"/>
  </div>
</template>