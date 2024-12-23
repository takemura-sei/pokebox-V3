Nuxt.js（Nuxt 3）の`props`は、Vue.jsと同様に親コンポーネントから子コンポーネントにデータを渡すために使用します。以下は、基本的な使い方からNuxt特有のポイントまで説明します。

---

## **基本的な使い方**

### 子コンポーネントで`props`を定義
`<script setup>`構文を使用する場合、`defineProps`を使って受け取る`props`を定義します。

```vue
<!-- components/PokemonCard.vue -->
<template>
  <div class="pokemon-card">
    <h2>{{ name }}</h2>
    <img :src="image" :alt="name" />
  </div>
</template>

<script setup>
defineProps({
  name: String, // 必須の文字列型
  image: {
    type: String, // オプショナルの文字列型
    default: 'default-image.png', // デフォルト値
  },
})
</script>
```

### 親コンポーネントから`props`を渡す
親コンポーネントで子コンポーネントにデータを渡します。

```vue
<template>
  <div>
    <PokemonCard name="ピカチュウ" image="pikachu.png" />
    <PokemonCard name="イーブイ" />
  </div>
</template>

<script setup>
import PokemonCard from '@/components/PokemonCard.vue'
</script>
```

上記の場合、`イーブイ`のカードでは`image`にデフォルト値`default-image.png`が使用されます。

---

## **Nuxt特有のポイント**

### 1. **動的なページでの`props`渡し**
`pages`ディレクトリで動的なルート（例：`/pokemon/[id].vue`）を作成する場合、`defineProps`を使用してクエリパラメータやデータを直接受け取れます。

```vue
<!-- pages/pokemon/[id].vue -->
<template>
  <div>
    <h1>{{ id }}番のポケモン情報</h1>
  </div>
</template>

<script setup>
defineProps(['id'])
</script>
```

動的ルートの`id`は、Nuxtのルートマッチングによって自動的に渡されます。

---

### 2. **`<NuxtLink>`を使用したプロパティの渡し**
Nuxtでは`<NuxtLink>`を使用して他のページに移動できますが、`props`を渡す場合はURLパラメータやクエリを利用します。

```vue
<!-- 親コンポーネント -->
<template>
  <NuxtLink :to="{ name: 'pokemon-id', params: { id: 25 } }">ピカチュウのページへ</NuxtLink>
</template>
```

リンク先の`/pokemon/[id].vue`で`id`を`props`として受け取れます。

---

### 3. **サーバサイドデータと`props`の連携**
APIなどから取得したデータを`props`として渡す場合は、`fetch`や`asyncData`を使うことが一般的です。

```vue
<!-- pages/pokemon/[id].vue -->
<template>
  <div>
    <h1>{{ pokemon.name }}</h1>
    <img :src="pokemon.image" :alt="pokemon.name" />
  </div>
</template>

<script setup>
import { useFetch } from '#app'

const { data: pokemon } = await useFetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
</script>
```

---

## **注意点**
1. **型定義を活用**
   NuxtではTypeScriptをサポートしているため、型を定義しておくとコードの保守性が向上します。

2. **デフォルト値や型チェック**
   複雑な`props`を扱う場合、`type`や`default`を適切に設定することをお勧めします。

3. **プロパティの依存関係に注意**
   子コンポーネントで受け取った`props`を直接変更するのは避け、必要なら`computed`やローカルデータに変換してください。

---
