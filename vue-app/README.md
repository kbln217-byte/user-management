# Vue 3 + TypeScript + Vite

### 起動手順（install/dev/build/preview）
<npm install >
main.tsに情報を入れ込む
->　初めてプロジェクトを起動する際に実行する
<npm run dev>
App.vueで保存したそばから吐き出される
-> ファイルの自動反映
<nmp run build>
App.vueをこの状態で保存しても次のbuildまで吐き出されない
-> ソースコードを本番用のコードに変換する
<nmp run preview>
App.vueでbuldしたものを確認する際に使用
-> ローカルサーバーで確認

### main.ts と App.vue の役割
main.ts-> 
アプリケーションを起動するための入り口（エントリーポイント）
Vueアプリを作成しどのコンポーネントを画面に表示するかを設定する

App.vue-> 
Vueアプリケーションの中で一番上のコンポーネント
アプリの土台になる画面を作る
ここにすべて情報があつまる



### ref の役割
値が変わった時に計算してくれる



### v-model が何をしているか
双方向バインディングを実装できる



### v-for の NULL が必要な理由（1行でOK）
「まだデータがない」状態を明示できる


### computed は「何を避けるため」に使う？（1行）
computed 派生状態
➡値が変わるのに再計算（代入）


### watch は「どんな場面」で使う？（例を1つ）
watch 保存
➡見た目上でリロードしてもローカルストレージに入れているのでリロードされない
➡値が変わるのに再計算はされないので情報を残せる




This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
