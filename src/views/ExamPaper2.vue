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
  試験用紙ID: '63ba8789-864e-4524-bf0d-327519023eed',
  問題一覧: [
    {
      問題: {
        問題ID: 'c279cad8-c2d9-40d5-b9a8-b3b6fbea62f0',
        問題文章: 'フロントエンド開発において、バンドラー（WebpackやViteなど）を利用する主な目的は何でしょうか？バンドラーは複数のモジュールや依存関係を解析してまとめることで、パフォーマンスの向上や開発効率の改善に役立ちます。以下の選択肢から正しいものを選んでください.',
        スキル分類: 'フロントエンド技術',
        難易度: '5',
        問題タイプ: '01:選択問題'
      },
      選択肢: [
        { 選択肢ID: 'ef940494-5397-407d-a59f-1bf9ee8927e0', 選択肢文章: 'バンドラーは依存関係を解決し、複数のモジュールをまとめて効率的にブラウザへ提供するために利用される。' },
        { 選択肢ID: '4a7f2086-1e64-4a21-a6e7-d61e08e49ae7', 選択肢文章: 'バンドラーはデータベースクエリを自動的に最適化し、サーバー側の性能を改善するために利用される。' },
        { 選択肢ID: '6ae17b20-93ab-4274-9f2c-ae59e24b3eee', 選択肢文章: 'バンドラーはオペレーティングシステムのメモリを直接管理し、アプリケーション全体の動作速度を向上させる。' },
        { 選択肢ID: '1f1696f6-6a19-4cc0-a8de-99ccd40ddc9b', 選択肢文章: 'バンドラーはウェブブラウザを自動的に最新バージョンに更新するために利用される。' }
      ]
    },
    {
      問題: {
        問題ID: '9d98ec08-47f4-42b7-a9bb-e61dcb97010c',
        問題文章: 'Reactにおいて、仮想DOM（Virtual DOM）が導入されている主な理由は何でしょうか？仮想DOMはブラウザの実際のDOM操作を効率化するために利用され、更新の際に差分のみを反映することでパフォーマンスを向上させます。以下の選択肢から正しいものを選んでください.',
        スキル分類: 'フロントエンド技術',
        難易度: '6',
        問題タイプ: '01:選択問題'
      },
      選択肢: [
        { 選択肢ID: '69a133f2-1b01-4b5b-b2ae-6f06475fc623', 選択肢文章: '仮想DOMはブラウザのメモリ使用量を監視し、システムリソースを最適化する役割を持つ。' },
        { 選択肢ID: '3da59fbf-0548-449e-9e1c-abc396c1cfdd', 選択肢文章: '仮想DOMはWebアプリのデザインテーマを自動的に変更し、ユーザー体験を向上させる。' },
        { 選択肢ID: '49c2c406-5616-4b9c-b0c8-64095f30890a', 選択肢文章: '仮想DOMは実際のDOMの差分を検出して必要な部分だけを更新することで、パフォーマンスを改善する。' },
        { 選択肢ID: '9e113ed4-49e7-4ff2-95b1-d5ad49c64683', 選択肢文章: '仮想DOMはバックエンドのデータベース更新を最適化するために利用される仕組みである。' }
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
