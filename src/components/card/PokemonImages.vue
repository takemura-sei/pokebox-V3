<script setup>
import { usePokemonDataStore } from '@/stores/pokemonDataStore';
import { getLastElementUrl } from '@/utils/urlUtils';

const pokemonDataStore = usePokemonDataStore();
const imageUrl = ref('');

const props = defineProps ({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
const lastElementUrl = getLastElementUrl(props.url);

onMounted(async () => {
  await pokemonDataStore.loadPokemonImage(props.name, lastElementUrl);
  imageUrl.value = pokemonDataStore.displayImageData[props.name];
})

</script>

<template>
    <img :src=imageUrl alt="">
</template>