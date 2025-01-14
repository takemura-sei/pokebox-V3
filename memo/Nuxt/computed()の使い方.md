`computed()` は Vue 3 の機能で、リアクティブな値を **計算プロパティ (computed property)** として定義する際に使用されます。  
これは、他のデータを基に計算され、リアクティブに更新される値を定義するのに役立ちます。

---

### **基本構文**
```javascript
import { computed } from 'vue';

const myComputedValue = computed(() => {
  // 何らかの計算や処理
  return result;
});
```

- **`computed`**: 計算プロパティを作成するための関数。
- **`()=> {}`**: 計算ロジックを定義する関数。

---

### **特徴**
1. **キャッシュ機能**  
   - `computed` の値はキャッシュされ、依存しているデータが変更された場合のみ再計算されます。
   - 同じ値を複数回参照しても不要な再計算は行われません。
   
2. **リアクティブ**  
   - 依存しているデータが更新されると、自動的に更新されます。

---

### **基本的な使い方**

#### 例: 簡単な計算プロパティ
以下は、数値 `count` を2倍にする計算プロパティを作成する例です。

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(10);

// count を基に計算する computed プロパティ
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <p>Count: {{ count }}</p>
  <p>Double Count: {{ doubleCount }}</p>
</template>
```

- **結果**: `count` を変更すると、`doubleCount` が自動的に更新されます。


### **まとめ**
- **基本構文**: `computed(() => {...})` で定義。
- **用途**: 他の値を基に計算され、キャッシュされるリアクティブな値を作成。
- **特徴**: キャッシュ付きで効率的、依存する値が変更されたときだけ再計算される。
- **応用**: getter/setter を利用して双方向データバインディングも可能。

`computed` は、ビューのロジックを明確にし、効率的なデータ更新をサポートする重要なツールです！