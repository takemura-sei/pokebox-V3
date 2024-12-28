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


onMounted(async () => {
  const lastElementUrl = getLastElementUrl(props.url);
  await pokemonDataStore.loadPokemonImage(props.name, lastElementUrl);
  imageUrl.value = pokemonDataStore.displayImageData[props.name];
})

</script>

<template>
  <div>
    <p>{{ imageUrl }}</p>
  </div>
</template>