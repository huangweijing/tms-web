
<template>
  <div class="row">
    <input v-model.trim="keyword" placeholder="氏名・所属会社で検索..." style="min-width: 240px;" @keyup.enter="onSearch" />
    <label class="label">BP</label>
    <select v-model.number="bpFlag" style="width:100px">
      <option :value="undefined">指定なし</option>
      <option :value="0">0</option>
      <option :value="1">1</option>
    </select>
    <button class="btn primary" @click="onSearch">検索</button>
    <button class="btn ghost" @click="onReset"><span class="kbd">Esc</span> クリア</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const emit = defineEmits<{
  (e: 'search', q: { keyword?: string; bp?: number | undefined }): void
}>()

const keyword = ref<string>('')
const bpFlag = ref<number | undefined>(undefined)

function onSearch() {
  emit('search', { keyword: keyword.value || undefined, bp: bpFlag.value })
}
function onReset() {
  keyword.value = ''
  bpFlag.value = undefined
  emit('search', { keyword: undefined, bp: undefined })
}
</script>
