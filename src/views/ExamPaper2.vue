<template>
  <div class="min-h-screen bg-gray-50 p-6 font-sans">
    <div class="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-2">フロントエンド技術 試験</h1>
      <p class="text-sm text-gray-600 mb-4">オンライン受検ページ — 全問に回答後に提出すると、サーバーで採点され、結果と解説が返却されます。</p>

      <div v-if="submitted" class="mb-4 p-4 bg-green-50 border border-green-100 rounded">
        <p class="font-semibold">採点結果: <span class="text-lg">{{score}} / {{questions.length}}</span></p>
      </div>

      <form @submit.prevent="onSubmit">
        <div v-for="(q, idx) in questions" :key="q.問題.問題ID" class="mb-6">
          <div class="p-4 border rounded">
            <div class="flex items-start justify-between">
              <div>
                <div class="text-sm text-gray-500">問題 {{ idx + 1 }} / {{ questions.length }}</div>
                <h2 class="mt-2 font-medium" v-html="q.問題.問題文章"></h2>
              </div>
              <div class="text-xs text-gray-400">難易度: {{ q.問題.難易度 }}</div>
            </div>

            <div class="mt-4 space-y-2">
              <label v-for="choice in q.選択肢" :key="choice.選択肢ID" class="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  :name="q.問題.問題ID"
                  :value="choice.選択肢ID"
                  v-model="answers[q.問題.問題ID]"
                  class="mr-3"
                />
                <span v-html="choice.選択肢文章"></span>
              </label>
            </div>

            <div v-if="submitted" class="mt-3 p-3 bg-white border rounded">
              <div v-if="q.result?.correct" class="text-green-700 font-semibold">正解</div>
              <div v-else class="text-red-700 font-semibold">不正解</div>
              <div class="mt-2 text-sm text-gray-700" v-html="q.result?.解説"></div>
            </div>

          </div>
        </div>

        <div class="flex items-center gap-3">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">提出して採点</button>
          <button type="button" @click="resetAnswers" class="px-4 py-2 border rounded">リセット</button>
        </div>
      </form>

      <div class="mt-6 text-sm text-gray-500">※このページはクライアント側で回答を保持しますが、正解判定はサーバーで行われます。</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// サンプル試験データ
const exam = {
  "試験用紙ID": "cc0e8400-e29b-41d4-a716-446bb5440000",
  "問題一覧": [
    {
      "問題": {
        "問題ID": "2f8c1c08-2d2d-4c3b-bc9b-34d2432bb4b1",
        "問題文章": "フロントエンド開発における仮想DOMの役割について正しい説明を選んでください。仮想DOMは実際のDOMを直接操作する代わりにメモリ上で差分を管理し、必要な部分だけ更新することで効率的なレンダリングを実現します。",
        "スキル分類": "フロントエンド技術",
        "難易度": 5,
        "問題タイプ": "01",
        "回答": "c73e03b3-2d3f-4c5f-9d88-df82e033df9a",
        "正解解説": "仮想DOMはメモリ上に保持された構造を比較して差分を検出し、必要最小限のDOM操作を行います。これによりパフォーマンスを改善できます。他の選択肢は誤りであり、仮想DOMが常にSEOを改善したり、DOM全体を直接更新するものではありません。"
      },
      "選択肢": [
        {
          "選択肢ID": "dbfa3d02-d94c-4cf7-8f2e-f1adfca34b1f",
          "所属問題ID": "2f8c1c08-2d2d-4c3b-bc9b-34d2432bb4b1",
          "選択肢文章": "仮想DOMはレンダリングのたびに実際のDOMを完全に置き換える仕組みであり、効率を下げる場合があります。"
        },
        {
          "選択肢ID": "8d8f228e-84de-41da-96a7-8a3a5bb8d392",
          "所属問題ID": "2f8c1c08-2d2d-4c3b-bc9b-34d2432bb4b1",
          "選択肢文章": "仮想DOMはSEOを自動的に改善する仕組みを備えており、検索順位の最適化を保証します。"
        },
        {
          "選択肢ID": "c73e03b3-2d3f-4c5f-9d88-df82e033df9a",
          "所属問題ID": "2f8c1c08-2d2d-4c3b-bc9b-34d2432bb4b1",
          "選択肢文章": "仮想DOMはメモリ上に保持された構造を比較し、差分のみを実際のDOMに適用することで効率を高めます。"
        },
        {
          "選択肢ID": "a60ff97a-d444-4862-89a1-59b89b02b9d7",
          "所属問題ID": "2f8c1c08-2d2d-4c3b-bc9b-34d2432bb4b1",
          "選択肢文章": "仮想DOMはDOMのイベントバインディングを自動化するだけの仕組みであり、描画最適化は行いません。"
        }
      ]
    },
    {
      "問題": {
        "問題ID": "73c4bc60-3c85-4f5f-a8b8-d884d0dcbb4a",
        "問題文章": "SPA（Single Page Application）の特徴について正しいものを選んでください。SPAはページ全体をリロードせずにコンテンツを切り替えるため、ユーザー体験を向上させることができますが、初回読み込みやSEOへの影響についても注意が必要です。",
        "スキル分類": "フロントエンド技術",
        "難易度": 6,
        "問題タイプ": "01",
        "回答": "3bb289c2-36b8-4d18-94d3-29ff1a6a6e57",
        "正解解説": "SPAは初回ロードで必要なリソースを取得し、その後はクライアントサイドのルーティングでページ遷移を行います。そのため高速な切り替えが可能ですが、SEO対応が課題になる場合があります。"
      },
      "選択肢": [
        {
          "選択肢ID": "cbb25cb2-1f84-4ee5-bdab-6f99374c05b1",
          "所属問題ID": "73c4bc60-3c85-4f5f-a8b8-d884d0dcbb4a",
          "選択肢文章": "SPAではページを切り替えるたびにサーバーから完全なHTMLを再取得するため、ユーザー体験は向上しません。"
        },
        {
          "選択肢ID": "7ac83963-f19f-47d4-a3e6-7c37a7c92ec3",
          "所属問題ID": "73c4bc60-3c85-4f5f-a8b8-d884d0dcbb4a",
          "選択肢文章": "SPAは常にSEOに最適化されているため、検索エンジンに不利になることはありません。"
        },
        {
          "選択肢ID": "3bb289c2-36b8-4d18-94d3-29ff1a6a6e57",
          "所属問題ID": "73c4bc60-3c85-4f5f-a8b8-d884d0dcbb4a",
          "選択肢文章": "SPAは初回読み込み後、クライアントサイドでルーティングを行うため、遷移が高速でスムーズになります。"
        },
        {
          "選択肢ID": "12b1b4b2-4e84-4d10-89e4-bc43107d9a38",
          "所属問題ID": "73c4bc60-3c85-4f5f-a8b8-d884d0dcbb4a",
          "選択肢文章": "SPAではクライアントサイドのルーティングは使わず、全てサーバー側でページ遷移を処理します。"
        }
      ]
    },
    {
      "問題": {
        "問題ID": "4a0cb91e-81bb-44df-bfb4-c244e4fbb7a7",
        "問題文章": "WebpackやViteなどのビルドツールを利用する主な目的について正しいものを選んでください。これらのツールはモジュールバンドルや最適化を行い、開発効率やパフォーマンスを向上させる役割を担っています。",
        "スキル分類": "ビルドツール",
        "難易度": 4,
        "問題タイプ": "01",
        "回答": "d89c8f5d-04f1-4a67-bf77-80316c416e6e",
        "正解解説": "ビルドツールは依存関係を解決し、コードの最適化やバンドルを行います。単にCSSだけを生成したり、SEOを保証するものではありません。"
      },
      "選択肢": [
        {
          "選択肢ID": "e290ee0e-3a42-40c2-89d0-69d195d9fda4",
          "所属問題ID": "4a0cb91e-81bb-44df-bfb4-c244e4fbb7a7",
          "選択肢文章": "ビルドツールはSEOを自動的に最適化する仕組みであり、検索結果を保証します。"
        },
        {
          "選択肢ID": "16c81dc6-9e93-4194-8765-c39c13f1bc07",
          "所属問題ID": "4a0cb91e-81bb-44df-bfb4-c244e4fbb7a7",
          "選択肢文章": "ビルドツールは主にスタイルシートを生成するだけの仕組みであり、JSや依存関係は扱いません。"
        },
        {
          "選択肢ID": "d89c8f5d-04f1-4a67-bf77-80316c416e6e",
          "所属問題ID": "4a0cb91e-81bb-44df-bfb4-c244e4fbb7a7",
          "選択肢文章": "ビルドツールはモジュールバンドルや依存関係の解決を行い、最適化や高速化に貢献します。"
        },
        {
          "選択肢ID": "52772833-9f04-4c6a-9a69-18db56c2f1d7",
          "所属問題ID": "4a0cb91e-81bb-44df-bfb4-c244e4fbb7a7",
          "選択肢文章": "ビルドツールは本番環境では不要であり、開発中にだけ使うユーティリティです。"
        }
      ]
    },
    {
      "問題": {
        "問題ID": "22c85e14-40fb-44bb-8e69-6f1db6ab8af6",
        "問題文章": "CSSにおけるFlexboxの特徴について正しい説明を選んでください。Flexboxは要素の整列やスペース分配を効率的に行う仕組みを提供し、レスポンシブデザインにおいて頻繁に利用されます。",
        "スキル分類": "CSS",
        "難易度": 3,
        "問題タイプ": "01",
        "回答": "a1ed6b83-5b8e-4f4a-9a19-33f4ee015d71",
        "正解解説": "Flexboxは親要素にdisplay:flexを指定し、子要素の配置やサイズ調整を柔軟に制御できます。表形式のレイアウトやSEOは直接関係しません。"
      },
      "選択肢": [
        {
          "選択肢ID": "d21e5eaf-2a1f-474f-9517-7f2c0a2f87ab",
          "所属問題ID": "22c85e14-40fb-44bb-8e69-6f1db6ab8af6",
          "選択肢文章": "FlexboxはSEO最適化を目的とした仕組みであり、検索エンジンの評価を改善します。"
        },
        {
          "選択肢ID": "a1ed6b83-5b8e-4f4a-9a19-33f4ee015d71",
          "所属問題ID": "22c85e14-40fb-44bb-8e69-6f1db6ab8af6",
          "選択肢文章": "Flexboxは要素の配置やスペース分配を柔軟に制御し、レスポンシブ対応に適しています。"
        },
        {
          "選択肢ID": "7a42c270-7c71-4f34-b3e0-0c3b45d72a4f",
          "所属問題ID": "22c85e14-40fb-44bb-8e69-6f1db6ab8af6",
          "選択肢文章": "Flexboxはテーブルレイアウトの代替としては利用できず、常にグリッドと組み合わせる必要があります。"
        },
        {
          "選択肢ID": "5f5b41e6-5cda-4cfa-bd7f-b8b08f02d50e",
          "所属問題ID": "22c85e14-40fb-44bb-8e69-6f1db6ab8af6",
          "選択肢文章": "Flexboxは親要素ではなく子要素に指定するプロパティであり、レイアウト制御には向きません。"
        }
      ]
    },
    {
      "問題": {
        "問題ID": "c5dd6b5a-4c78-4688-84e0-4bcf4954c3b7",
        "問題文章": "REST APIとGraphQLの違いについて正しい説明を選んでください。RESTはエンドポイントごとに固定のデータを返しますが、GraphQLはクライアントが必要なデータを柔軟に指定できるという特徴があります。",
        "スキル分類": "API設計",
        "難易度": 7,
        "問題タイプ": "01",
        "回答": "34d8764c-f77d-4b4e-84c3-25fefbe8e65a",
        "正解解説": "GraphQLは必要なフィールドだけを取得できるため、過剰なデータ取得を防げます。RESTはシンプルですが、複数エンドポイントを叩く必要がある場合があります。"
      },
      "選択肢": [
        {
          "選択肢ID": "34d8764c-f77d-4b4e-84c3-25fefbe8e65a",
          "所属問題ID": "c5dd6b5a-4c78-4688-84e0-4bcf4954c3b7",
          "選択肢文章": "GraphQLはクライアントが必要なフィールドだけを指定でき、過剰なデータ取得を防ぎます。"
        },
        {
          "選択肢ID": "e2b6ad86-74e0-4568-a528-8f20e24682c3",
          "所属問題ID": "c5dd6b5a-4c78-4688-84e0-4bcf4954c3b7",
          "選択肢文章": "REST APIは常に最小限のデータだけを返すため、不要なデータ取得は発生しません。"
        },
        {
          "選択肢ID": "bbf19e43-7268-4d15-85cb-0132646edb78",
          "所属問題ID": "c5dd6b5a-4c78-4688-84e0-4bcf4954c3b7",
          "選択肢文章": "GraphQLはサーバーが返すレスポンス形式を固定するため、クライアントは柔軟にデータを取得できません。"
        },
        {
          "選択肢ID": "fc3ccaa9-6900-4c90-bb1e-ff6249d207d3",
          "所属問題ID": "c5dd6b5a-4c78-4688-84e0-4bcf4954c3b7",
          "選択肢文章": "RESTとGraphQLは同一の仕組みであり、違いは存在しません。"
        }
      ]
    }
  ]
}


const questions = exam.問題一覧
const answers = reactive({})
const submitted = ref(false)
const score = ref(0)

function resetAnswers() {
  for (const k in answers) delete answers[k]
  submitted.value = false
  score.value = 0
}

async function onSubmit() {
  const payload = {
    examId: exam.試験用紙ID,
    answers: answers
  }

  try {
    const res = await fetch('/api/exam/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()

    score.value = data.score
    for (const q of questions) {
      const qid = q.問題.問題ID
      q.result = data.results[qid]
    }
    submitted.value = true
  } catch (err) {
    console.error(err)
    alert('送信に失敗しました。')
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
</style>
