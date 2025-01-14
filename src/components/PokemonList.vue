<script setup>
import { usePokemonDataStore } from '#build/imports';

const pokemonDataStore = usePokemonDataStore();

// ポケモンの名前と ID のリスト
const pokemonList = [
  { id: 3 },
  { id: 6 },
  { id: 9 },
];

// データ取得処理
const fetchPokemonData = async () => {
  for (const pokemon of pokemonList) {
    await pokemonDataStore.loadPokemonImage(pokemon.id.toString());
    await pokemonDataStore.loadPokemonJpName(pokemon.id.toString());
  }
};

// コンポーネントが表示されたときにデータを取得
onMounted(() => {
  fetchPokemonData();
});
</script>

<template>
  <div class="container">
    <div v-for="pokemon in pokemonList" :key="pokemon.id" class="pokemon-card">
      <p>{{ pokemonDataStore.displayJpNameData[pokemon.id] }}</p>
      <img :src="pokemonDataStore.displayImageData[pokemon.id]"/>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  gap: 15px;
}
</style>
