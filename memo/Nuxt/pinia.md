# ✨Piniaとは？

**Pinia** は Vue.js の公式の状態管理ライブラリで、シンプルかつ柔軟な状態管理を提供します。Pinia は Vuex の後継とされ、より軽量で使いやすい設計になっています。

以下では、Pinia の概要と使い方について解説します。

---

## **Pinia の特徴**
1. **シンプルで直感的**  
   API がシンプルで学習コストが低いです。Vuex のように複雑な記述が不要です。

2. **TypeScript サポートが充実**  
   TypeScript を使った型推論が強力で、開発者体験が向上しています。

3. **Vue DevTools との統合**  
   Vue DevTools に組み込まれており、状態の追跡やデバッグが容易です。

4. **モジュールの代わりにストアごとのファイル管理**  
   各ストアが独立しており、Vuex のようにモジュール分割のための追加設定は不要です。

5. **小さくて効率的**  
   Pinia は Vue 3 のリアクティブ性を活用しており、軽量でパフォーマンスに優れています。

---

## **インストール**
Pinia は Vue 3 に最適化されています。Nuxt 3 でも使用できます。

### **Nuxt 3 プロジェクトでのインストール**
```bash
npm install pinia
```

---

## **基本的な使い方**

### **1. Pinia ストアの作成**
慣例的に `stores` ディレクトリを作成し、各ストアを独立したファイルとして管理します。

以下は、カウンター機能を持つシンプルなストアの例です。

```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0, // カウンターの初期値
  }),
  getters: {
    doubleCount: (state) => state.count * 2, // 倍の値を返すゲッター
  },
  actions: {
    increment() {
      this.count++; // カウンターを増加
    },
  },
});
```

### **2. Pinia をアプリケーションに登録**
Nuxt 3 ではプラグインで登録します。

```javascript
// plugins/pinia.js
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
});
```

このプラグインを作成することで、全体で Pinia ストアを利用できるようになります。

---

### **3. コンポーネント内でストアを使用**

以下のようにストアをインポートして使います。

```vue
<template>
  <div>
    <p>カウンターの値: {{ counterStore.count }}</p>
    <p>倍の値: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">カウントアップ</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';

// ストアを取得
const counterStore = useCounterStore();
</script>
```

**ポイント**:  
- **リアクティブ**: `counterStore.count` はリアクティブに値を更新します。
- **直感的な使用方法**: `increment()` メソッドを呼び出すだけで状態が更新されます。

---

### **4. 状態を永続化 (オプション)**
状態を永続化したい場合は、Pinia プラグイン `pinia-plugin-persistedstate` を利用します。

#### **永続化の設定**
```bash
npm install pinia-plugin-persistedstate
```

```javascript
// plugins/pinia.js
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedState);
  nuxtApp.vueApp.use(pinia);
});
```

#### **永続化を有効化するストア**
```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  persist: true, // 永続化を有効化
});
```

---

## **Pinia の API 詳細**

1. **State**: アプリケーションの状態を保持するためのオブジェクト。
2. **Getters**: 状態を基に計算された値を取得するための関数。
3. **Actions**: 状態を変更するためのメソッド。

---

## **Vuex との比較**

| 機能                 | Vuex                     | Pinia                          |
|----------------------|--------------------------|--------------------------------|
| 状態の定義           | オブジェクト (state)     | 関数 (state: `() => {}`)       |
| ゲッターの記述       | `getters`                | `getters` (シンプルな記法)     |
| ミューテーションの必須 | 必須                     | 不要 (直接 state を変更可能)  |
| 非同期アクションの記述 | `actions`                | `actions`                     |
| TypeScript サポート  | 部分的                   | ネイティブサポート             |

---

## **まとめ**
- Pinia はシンプルで Vue 3 向けに最適化された状態管理ライブラリです。
- Nuxt 3 で公式にサポートされており、プラグインとして簡単に導入できます。
- Vuex よりも直感的で柔軟に使えるため、これからの Vue.js アプリケーションでは Pinia を使用するのが推奨されます。

状態管理の複雑さやプロジェクト規模に応じて、Pinia を効果的に活用してください！



# 🍔Pinia の API 詳細


Pinia は、状態管理のために以下の **3つの主要な要素** を提供します：  
- **State**  
- **Getters**  
- **Actions**  

これらの要素を組み合わせて、状態の管理、計算、変更を行います。それぞれについて、より深く解説します。

---

## 1. **State**
`State` は、アプリケーションの状態（データ）を保持するためのオブジェクトです。ストアの初期化時に状態を定義します。状態は**リアクティブ**であり、Vue コンポーネントで使用すると、状態が変更されたときに自動的に更新されます。

### **Stateの定義方法**
`state` は関数として定義され、状態がオブジェクトとして返されます。この関数を使うことで、各ストアが独自の状態を持つことができます。

#### **例: カウンターのストア**
```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,  // カウンターの値
  }),
});
```

### **Stateの利用**
ストアをコンポーネントで使用する際、`state` に定義したプロパティは自動的にリアクティブになります。

```vue
<template>
  <div>
    <p>カウンター: {{ counterStore.count }}</p>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
</script>
```

### **State の更新**
状態を更新するのは、`actions` または直接 `state` を操作することで行いますが、推奨される方法は **actions** を使用することです。

---

## 2. **Getters**
`Getters` は、ストアの状態を基に計算された派生データ（コンピューティッドプロパティ）を返すための関数です。`state` の値を元にして計算を行い、キャッシュされるため、同じ状態に基づいた計算は再実行されません。これにより、パフォーマンスが向上します。

### **Gettersの定義方法**
`getters` は関数として定義され、`state` を引数として受け取ります。この関数は、`state` に依存する計算を行い、返り値として計算結果を返します。

#### **例: ゲッターを使用したストア**
```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,  // count の2倍を返す
  },
});
```

### **Gettersの利用**
ゲッターは、ストアのプロパティのようにアクセスできます。

```vue
<template>
  <div>
    <p>カウンターの2倍の値: {{ counterStore.doubleCount }}</p>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
</script>
```

### **ゲッターの特徴**
- **キャッシュされる**: `state` が変更されない限り、ゲッターは再計算されません。
- **Vue のコンピューテッドプロパティ**に似た役割を果たします。

---

## 3. **Actions**
`Actions` は、`state` を変更したり、非同期処理を行ったりするメソッドです。Pinia では、直接 `state` を操作するのではなく、`actions` を通じて状態を変更することが推奨されています。`actions` は、非同期処理やロジックを記述するために使用されます。

### **Actionsの定義方法**
`actions` はオブジェクトの中で定義され、通常はメソッドとして記述します。これらのメソッドは、`this` を使って `state` にアクセスし、状態を変更します。

#### **例: アクションを使用したストア**
```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;  // count を増加させる
    },
    async fetchData() {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      this.count = data.count;  // 非同期処理で状態を変更
    },
  },
});
```

### **Actionsの利用**
アクションは、コンポーネント内で呼び出すことができます。非同期処理もアクション内で扱うことができます。

```vue
<template>
  <div>
    <p>カウンター: {{ counterStore.count }}</p>
    <button @click="counterStore.increment">増加</button>
    <button @click="counterStore.fetchData">データ取得</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
</script>
```

### **Actions の特徴**
- 非同期処理が得意です。API 呼び出しやタイマーなどを管理できます。
- `state` への変更を行う方法として推奨されています。

---

## **Pinia ストアの総括**
Pinia のストアでは、状態（`state`）を保持し、計算された値（`getters`）を提供し、状態を変更する方法（`actions`）を提供します。これらを組み合わせることで、状態管理のロジックをシンプルに保ちながら、柔軟で効率的な管理が可能です。

| **要素**   | **目的**                                      | **使用方法**                                               |
|------------|-----------------------------------------------|------------------------------------------------------------|
| **State**  | アプリケーションの状態を保持する             | `state: () => ({ count: 0 })`                               |
| **Getters**| 状態を基に計算された値を取得する            | `getters: { doubleCount: (state) => state.count * 2 }`       |
| **Actions**| 状態を変更するメソッド、非同期処理を含む     | `actions: { increment() { this.count++ } }`                 |

Pinia を使うことで、状態管理がより直感的かつ効率的に行え、特に Vue 3 のリアクティブ機能を活用した柔軟な状態管理が可能になります。



# 🧐composablesとの使い分けは

`Pinia` と `composables` の使い分けについては、両者の役割や用途に基づいて、適切なシナリオを選ぶことが大切です。ここでは、それぞれの特徴と、どのように使い分けるかについて詳しく説明します。

### **Pinia と composables の役割**
- **Pinia**: 状態管理ライブラリで、アプリケーション全体の状態（例えば、カート情報や認証情報）を一元的に管理するために使用します。ストアを使用して状態を管理し、その状態に基づくロジックや非同期処理も扱います。状態管理がグローバルに共有され、複数のコンポーネントやページで利用されることが多いです。
  
- **Composables**: Vue 3 の Composition API を活用して、機能やロジックを再利用可能な形でまとめたものです。状態管理だけでなく、ロジック、非同期処理、イベントハンドリングなどをカプセル化して再利用できるようにします。主にコンポーネント単位で使われますが、状態をグローバルに扱う場合には Pinia と組み合わせて使うこともあります。

---

## **Pinia と composables の使い分け**

### **1. グローバルな状態管理**
- **Pinia** は、アプリケーション全体で必要な **グローバルな状態管理** を提供します。例えば、ユーザー情報、認証トークン、ショッピングカートのアイテムなど、異なるページやコンポーネント間で共有する必要のある状態を管理します。

#### **例: Pinia の使用例**
```javascript
// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    login(user, token) {
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
```

このような状態管理が **グローバル** に必要な場面で `Pinia` を使用します。

#### **使用例**
```vue
<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
```

---

### **2. コンポーネント固有のロジック**
- **Composables** は、コンポーネント固有の状態やロジックを管理します。状態の管理がグローバルに必要ない場合、または特定のコンポーネント内でのみ必要なロジックをカプセル化する際に使用します。例えば、フォームのバリデーションや、特定の API 呼び出しのロジックなどが該当します。

#### **例: Composables の使用例**
```javascript
// composables/useFormValidation.js
export const useFormValidation = () => {
  const isValid = ref(false);

  const validate = (formData) => {
    // バリデーションロジック
    isValid.value = formData.name && formData.email;
  };

  return {
    isValid,
    validate,
  };
};
```

このように、コンポーネントに依存するロジック（フォームの入力検証など）を `composables` にまとめることで、再利用性が高くなります。

#### **使用例**
```vue
<script setup>
import { useFormValidation } from '@/composables/useFormValidation';

const { isValid, validate } = useFormValidation();

const formData = ref({
  name: '',
  email: '',
});
</script>
```

---

### **3. 状態とロジックがどちらも必要な場合**
状態管理とロジックの両方が必要な場合、`Pinia` と `composables` を組み合わせて使用することがよくあります。`Pinia` でグローバルな状態を管理し、`composables` でロジックや非同期処理をまとめるという方法です。

#### **例: Pinia と composables の組み合わせ**
```javascript
// stores/user.js (Pinia)
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
  }),
  actions: {
    setUserInfo(user) {
      this.name = user.name;
      this.email = user.email;
    },
  },
});
```

```javascript
// composables/useUserFetch.js (Composables)
import { useUserStore } from '@/stores/user';

export const useUserFetch = () => {
  const userStore = useUserStore();
  
  const fetchUser = async (id) => {
    const response = await fetch(`/api/user/${id}`);
    const user = await response.json();
    userStore.setUserInfo(user);
  };

  return {
    fetchUser,
  };
};
```

このように、**状態管理は Pinia に任せ**、**ロジックや非同期処理は composables にまとめる**ことができます。

#### **使用例**
```vue
<script setup>
import { useUserFetch } from '@/composables/useUserFetch';

const { fetchUser } = useUserFetch();
</script>
```

---

## **使い分けのポイント**

| **用途**                            | **Pinia**                                        | **Composables**                                        |
|-------------------------------------|-------------------------------------------------|------------------------------------------------------|
| **状態管理（グローバルな状態）**    | アプリ全体で共有する状態を管理                   | 個別のコンポーネント内での状態管理には使用しない    |
| **ロジックのカプセル化（特定の機能）**| 状態を変更するためのアクションを含むロジック      | コンポーネント固有のロジックや非同期処理を管理      |
| **非同期処理**                      | 非同期処理が必要な場合、アクションで実行          | 特定の API 呼び出しや処理を再利用可能にする         |
| **状態の依存性**                    | 状態の共有や変更が必要な場合に使用                | 状態とロジックの組み合わせが不要な場合に使用         |

---

## **まとめ**

- **Pinia**: アプリケーション全体で状態を共有し、管理するために使用。グローバルな状態管理が必要な場合に適しています。
- **Composables**: コンポーネント固有のロジックや非同期処理、状態管理を行うために使用。状態を持たない、あるいは局所的なロジックが必要な場合に適しています。

両者は、用途に応じて使い分けることで、コードの可読性や再利用性を高め、アプリケーションをより効率的に開発できます。