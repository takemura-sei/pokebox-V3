<script setup>
import axios from 'axios'

// 画像URLを格納するリアクティブな変数を定義（初期値はnull）
const pokemonImage = ref(null)

// リザードンの画像を取得する非同期関数
const fetchCharizardImage = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/6')
  pokemonImage.value = response.data.sprites.front_default
}

// コンポーネントが画面に表示されたときにデータを取得
onMounted(() => {
  fetchCharizardImage()
})

</script>

<template>
  <div class="container">
    <img :src="pokemonImage" alt="リザードン" />
  </div>
</template>