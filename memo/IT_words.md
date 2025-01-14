# IT用語

### ミドルウェアとは
**ミドルウェア**とは、アプリケーションにおいて、**リクエスト（ユーザーからの要求）とレスポンス（サーバーの応答）**の間で特定の処理を行う仕組みやコードのことを指します。

Nuxt.jsでは、ミドルウェアを使って特定のページやルートにアクセスする前に実行する処理を定義できます。これにより、例えば認証チェックやリダイレクトなどを簡単に実装することが可能です。

---

### ミドルウェアの役割
1. **リクエストを検査・処理**:
   - ユーザーがログインしているか確認する。
   - 必要なデータをプリロードする。
   
2. **条件に応じたリダイレクト**:
   - ユーザーが未認証の場合、ログインページにリダイレクトする。
   - 特定の条件を満たさない場合に別のページへ誘導する。
   
3. **共通処理を集約**:
   - 複数のルートで必要な共通の処理（例: APIトークンの検証）を1箇所にまとめられる。

---

### Nuxt.jsでのミドルウェアの使い方

#### 1. ミドルウェアの作成
`middleware`ディレクトリ内にミドルウェアを作成します。

例: `middleware/auth.js`
```javascript
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useAuthStore().isLoggedIn;
  if (!isAuthenticated) {
    return navigateTo('/login'); // 未認証ならログインページにリダイレクト
  }
});
```

#### 2. ミドルウェアの適用
ミドルウェアを適用するには、以下のいずれかの方法を使います。

##### ページに適用
`pages`内の特定のページにのみ適用する場合：
```javascript
<script setup>
definePageMeta({
  middleware: 'auth'
});
</script>
```

##### グローバルに適用
すべてのページに適用する場合、`nuxt.config.js`に設定します：
```javascript
export default defineNuxtConfig({
  router: {
    middleware: ['auth']
  }
});
```

---

### 具体例
#### ログイン状態をチェックするミドルウェア
1. **`middleware/auth.js`**
   ```javascript
   export default defineNuxtRouteMiddleware((to, from) => {
     const isAuthenticated = useAuthStore().isLoggedIn;
     if (!isAuthenticated && to.path !== '/login') {
       return navigateTo('/login'); // 未ログイン時はログインページへ
     }
   });
   ```

2. **適用するページ**
   `pages/profile.vue`
   ```javascript
   <script setup>
   definePageMeta({
     middleware: 'auth'
   });
   </script>

   <template>
     <div>プロフィールページ</div>
   </template>
   ```

---

### 「ミドルウェア」とはの簡単な答え
Nuxt.jsにおけるミドルウェアとは、**ページにアクセスする前に実行する処理を記述する仕組み**です。これを使うことで、認証やリダイレクトなどの共通処理を簡単に管理できます。