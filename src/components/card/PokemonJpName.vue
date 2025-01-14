<script setup>
import { usePokemonDataStore } from '@/stores/pokemonDataStore';
import { getLastElementUrl } from '@/utils/urlUtils';

const pokemonDataStore = usePokemonDataStore();
const jpName = ref('');

const props = defineProps({
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
  await pokemonDataStore.loadPokemonJpName(props.name, lastElementUrl);
  jpName.value = pokemonDataStore.displayJpNameData[props.name];
})

</script>

<template>
  <p>{{ jpName }}</p>
</template>