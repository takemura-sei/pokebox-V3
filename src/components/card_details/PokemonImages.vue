<script setup>
import { usePokemonDataStore } from '@/stores/pokemonDataStore';
import { getLastElementUrl } from '@/utils/urlUtils';

const pokemonDataStore = usePokemonDataStore();
const pokemonImageUrl = ref('');

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
  pokemonDataStore.loadPokemonImage(props.name, lastElementUrl);
})

</script>

<template>
  <div>
    <p>aa</p>
  </div>
</template>