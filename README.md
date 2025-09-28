# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


■問題一覧画面
問題に対してCRUD操作可能
問題属性をフィルターして表示対象の問題一覧を絞る

■問題編集画面
問題の本文、選択肢など各属性を修正できる
問題をワンクリックで生成する

■試験一覧画面
生成した試験を管理する。試験のステータス：未回答、回答中、回答完了、人材DB反映済み
誰にやってもらう試験かも試験生成の段階で決める
試験の追加、編集、削除などが可能
試験の編集について、未回答のもののみ

■試験編集画面
試験リンク生成。試験リンクは１回のみクリック可能。
QRコードも生成する試験用紙を閉じた場合はもう一度生成する必要がある
誰が試験解答するかを項目として試験に登録しておく
試験生成を生成AIに任せて、ワンクリックで生成する。
試験問題を問題データベースに登録するかしないかをチェックできる
試験内容をテンプレートにできる

■人材一覧画面
人材のスキルは手動追加可能
人材情報のCRUD編集可能。
