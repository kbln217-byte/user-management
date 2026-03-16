# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).



## storeに入れる/入れない判断を文章化（5個）
### storeに入れる

複数画面/複数コンポーネントで共有する状態
ログインユーザー、権限、トークン
共通の検索条件、選択中のID（ただしURLで表現できるならURL優先）

### storeに入れない

そのコンポーネントだけの入力中テキスト
開閉状態（モーダル開いてる、など）
一時的なUI状態（hover等）

