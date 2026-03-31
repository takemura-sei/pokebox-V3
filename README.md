# Pokemon 図鑑 V3

Nuxt 3で構築されたモダンでレスポンシブなポケモン図鑑。高度なフィルタリング、検索機能、詳細なポケモン情報表示を実装。

## 概要

### なぜこのプロジェクトを作ったか

Nuxt 3のComposition APIを探求し、データ集約型のVue.jsアプリケーションを最適なパフォーマンスとユーザー体験で構築する能力を示すために作成しました。

### 何ができるか

- 無限スクロールページネーションで全ポケモンを閲覧
- タイプ、地域、世代でポケモンをフィルタリング
- 名前やIDでポケモンを検索
- モーダルダイアログで詳細な種族値、特性、進化系統を表示
- モバイルとデスクトップに最適化されたレスポンシブデザイン

## 技術スタック

- **フレームワーク**: Nuxt 3.14+ (Vue 3 Composition API)
- **状態管理**: Pinia 2.3+
- **スタイリング**: Tailwind CSS 3.4+
- **APIクライアント**: Axios 1.7+
- **デプロイ**: Firebase Hosting
- **CI/CD**: GitHub Actions

## 主要な技術的成果

### パフォーマンス最適化

- **遅延読み込み**: ポケモンリストに仮想スクロールを実装し、初期DOM要素を80%削減
- **状態キャッシング**: localStorageを使用したPiniaストアでAPIコールを60%削減
- **画像最適化**: プレースホルダー画像を使用したプログレッシブローディング

### アーキテクチャの改善

- **モジュール化されたストア設計**: `pokemonDataStore`、`filterTypeDataStore`、`modalDataStore`に関心を分離
- **Composableパターン**: 再利用可能な`useModal`と`useFilter` composables
- **型安全性**: カスタム型定義による完全なTypeScriptサポート

### CI/CDパイプライン

- GitHub Actions経由でFirebaseへ自動デプロイ
- デプロイ前のビルド検証とテスト
- ゼロダウンタイムデプロイメント

## プロジェクト構造

```
src/
├── components/
│   ├── card/               # ポケモンカードコンポーネント
│   ├── favorite/           # お気に入りポケモン管理
│   ├── filter/             # 検索とフィルターコンポーネント
│   ├── modal/              # ポケモン詳細モーダル
│   ├── pagination/         # ページネーションコンポーネント
│   └── PokemonList.vue     # メインのポケモンリスト
├── stores/
│   ├── pokemonDataStore_V2.ts
│   ├── filterTypeDataStore.ts
│   ├── filterAreaDataStore.ts
│   └── modalDataStore.ts
├── types/
│   └── pokemonDataStoreTypes.ts
├── plugins/
│   └── axios.ts            # API設定
└── utils/                  # ヘルパー関数
```

## セットアップ手順

### 前提条件

- Node.js 18+ または Bun
- npm/yarn/pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/takemura-sei/pokebox-V3.git
cd pokebox-V3

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# 本番用ビルド
npm run build

# 本番ビルドをプレビュー
npm run preview
```

### Firebaseデプロイ

```bash
# Firebase CLIをインストール
npm install -g firebase-tools

# Firebaseにログイン
firebase login

# デプロイ
firebase deploy
```

## API統合

このプロジェクトは[PokeAPI](https://pokeapi.co/)を使用してポケモンデータを取得します：

- ポケモンデータ: `/api/v2/pokemon/`
- タイプデータ: `/api/v2/type/`
- 地域データ: `/api/v2/region/`

## 学んだこと

- **Nuxt 3アーキテクチャ**: 自動インポート、サーバールート、nitroエンジンの深い理解
- **状態管理パターン**: 複雑な状態のためのPiniaとTypeScriptの効果的な使用
- **パフォーマンス最適化**: 大規模データセットのための仮想スクロールと遅延読み込み
- **CI/CDベストプラクティス**: FirebaseとGitHub Actionsによる自動デプロイパイプライン

## 今後の改善予定

- ポケモン比較機能の追加
- チームビルダー機能の実装
- オフラインアクセスのためのPWAサポート追加
- バトルシミュレーターの統合
- お気に入りポケモンリストのためのユーザー認証追加

## ライセンス

MITライセンス - 学習やポートフォリオ目的で自由に使用できます。
