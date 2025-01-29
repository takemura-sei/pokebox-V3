<script setup>
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { getLastElementUrl } from '@/utils/urlUtils';

const pokemonDataStore = usePokemonDataStoreV2();
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