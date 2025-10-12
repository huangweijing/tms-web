
<template>
  <div class="row">
    <button class="btn" :disabled="page<=1" @click="toPage(1)">« 最初</button>
    <button class="btn" :disabled="page<=1" @click="toPage(page-1)">‹ 前へ</button>
    <span class="label">ページ {{ page }} / {{ totalPages }}（全 {{ total }} 件）</span>
    <button class="btn" :disabled="page>=totalPages" @click="toPage(page+1)">次へ ›</button>
    <button class="btn" :disabled="page>=totalPages" @click="toPage(totalPages)">最後 »</button>

    <div style="margin-left:auto"></div>
    <span class="label">ページサイズ</span>
    <select v-model.number="localSize" @change="emit('update:size', localSize)" >
      <option v-for="s in sizes" :key="s" :value="s">{{ s }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  page: number
  size: number
  total: number
  sizes?: number[]
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:size', value: number): void
}>()

const sizes = computed(() => props.sizes ?? [10, 20, 50, 100])
const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.size)))
const localSize = ref(props.size)

watch(() => props.size, (v) => localSize.value = v)

function toPage(p: number) {
  const next = Math.min(Math.max(1, p), totalPages.value)
  emit('update:page', next)
}
</script>
