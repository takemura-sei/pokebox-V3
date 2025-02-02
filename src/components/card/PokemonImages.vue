<script setup>
import { usePokemonDataStoreV2 } from '@/stores/pokemonDataStore_V2';
import { getLastElementUrl } from '@/utils/urlUtils';

const pokemonDataStore = usePokemonDataStoreV2();
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
})

// `watchEffect` を追加して imageUrl をリアクティブに更新
watchEffect(() => {
  imageUrl.value = pokemonDataStore.displayImageData[props.name] || '';
});

</script>

<template>
    <img :src=imageUrl alt="">
</template>